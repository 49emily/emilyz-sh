"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../providers/ThemeProvider";

const vertexSource = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentSource = `
  precision highp float;
  uniform vec2 resolution;
  uniform vec2 pointer;
  uniform float time;
  uniform float dark;
  uniform sampler2D cloudShape;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.13, 0.27, 0.41));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  float density(vec3 p) {
    float aspect = resolution.x / resolution.y;
    vec2 uv = p.xy / vec2(aspect * 3.6, 3.6) + 0.5;
    // The original GIF's first-frame silhouette supplies the composition.
    // Slow domain warping animates the shape in the shader, not as GIF playback.
    vec2 drift = vec2(
      sin(time * 0.12 + uv.y * 1.4) - sin(uv.y * 1.4),
      sin(time * 0.10 + uv.x * 2.0) - sin(uv.x * 2.0)
    ) * vec2(0.027, 0.009);
    vec2 warp = vec2(noise(vec3(uv * 6.0, time * 0.12)),
                     noise(vec3(uv * 6.0 + 8.0, time * 0.10))) - 0.5;
    uv += drift + warp * 0.009;
    // Average the source dithering into density before applying fresh lighting.
    vec2 texel = vec2(2.0 / 1920.0, 2.0 / 1038.0);
    float source = texture2D(cloudShape, uv + texel).r
      + texture2D(cloudShape, uv - texel).r
      + texture2D(cloudShape, uv + vec2(texel.x, -texel.y)).r
      + texture2D(cloudShape, uv + vec2(-texel.x, texel.y)).r;
    float silhouette = clamp((1.0 - source * 0.25) * 5.0, 0.0, 1.0);
    float envelope = smoothstep(0.0, 0.35, p.z)
      * (1.0 - smoothstep(1.0, 2.4, p.z));
    float detail = mix(0.65, 1.2, noise(p * vec3(2.0, 3.0, 1.5)));
    return silhouette * envelope * detail * 1.3;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float aspect = resolution.x / resolution.y;
    vec2 plane = (uv - 0.5) * vec2(aspect, 1.0) * 3.6;
    vec2 lightXY = (pointer - 0.5) * vec2(aspect, 1.0) * 3.6;
    float sky = mix(1.0, 0.05, dark);
    float color = 0.0, transmission = 1.0;
    // Light the actual volume first. Samples toward the cursor light account
    // for occlusion, while distance controls how strongly each cloud is lit.
    for (int i = 0; i < 28; i++) {
      vec3 p = vec3(plane, float(i) * (2.4 / 28.0));
      float d = density(p);
      if (d > 0.005) {
        vec3 toLight = vec3(lightXY, -0.7) - p;
        vec3 lightDirection = normalize(toLight);
        float shadow = 0.0;
        for (int j = 0; j < 3; j++) {
          float distanceToSample = 0.16 + float(j) * 0.24;
          shadow += density(p + lightDirection * distanceToSample) * 0.65;
        }
        float illumination = exp(-shadow * 1.1);
        float falloff = 1.0 / (1.0 + dot(toLight.xy, toLight.xy) * 0.16);
        float direct = illumination * falloff;
        float cloud = mix(0.76 + direct * 0.22, 0.14 + direct * 0.36, dark);
        float alpha = 1.0 - exp(-d * 0.55);
        color += transmission * alpha * cloud;
        transmission *= 1.0 - alpha;
      }
    }
    color += sky * transmission;
    // Broad scattering lifts the cloud highlights around the light source.
    // Weight it by cloud opacity so the open sky remains exactly white.
    vec2 lightDistance = plane - lightXY;
    float diffuseGlow = exp(-dot(lightDistance, lightDistance) * 0.24);
    color += diffuseGlow * (1.0 - transmission) * mix(0.045, 0.075, dark);
    // Quantize only the finished lighting, preserving its highlights and shadows.
    // A fixed Bayer pattern softens tone boundaries without temporal noise.
    vec2 cell = mod(floor(gl_FragCoord.xy), 2.0);
    float bayer = cell.y < 1.0
      ? (cell.x < 1.0 ? 0.0 : 2.0)
      : (cell.x < 1.0 ? 3.0 : 1.0);
    float threshold = (bayer + 0.5) / 4.0;
    color = floor(clamp(color, 0.0, 1.0) * 20.0 + threshold) / 20.0;
    gl_FragColor = vec4(vec3(color), 1.0);
  }

`;

export default function CloudBackground() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const darkRef = useRef(isDark);

  useEffect(() => { darkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
    if (!gl) return;

    const shaders = [];
    const program = gl.createProgram();
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
      }
      gl.attachShader(program, shader);
    };
    const disposeProgram = () => {
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
    };
    try {
      compile(gl.VERTEX_SHADER, vertexSource);
      compile(gl.FRAGMENT_SHADER, fragmentSource);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
      }
    } catch (error) {
      console.warn("Cloud background unavailable:", error);
      disposeProgram();
      return;
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = Object.fromEntries(
      ["resolution", "pointer", "time", "dark"].map((key) => [key, gl.getUniformLocation(program, key)])
    );
    const shapeTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, shapeTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA,
      gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
    gl.uniform1i(gl.getUniformLocation(program, "cloudShape"), 0);
    const shapeImage = new Image();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = { x: 0.72, y: 0.75 };
    const pointer = { ...target };
    let frame = 0, lastTime = 0, elapsed = 0;
    let theme = darkRef.current ? 1 : 0;
    let lost = false;

    const resize = () => {
      // Render real three-pixel blocks; CSS preserves their crisp edges.
      const scale = 1 / 3;
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      requestDraw();
    };
    const draw = (now) => {
      frame = 0;
      if (lost || document.hidden) return;
      const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;
      const smoothing = motion.matches ? 1 : 1 - Math.exp(-delta * 5);
      pointer.x += (target.x - pointer.x) * smoothing;
      pointer.y += (target.y - pointer.y) * smoothing;
      theme += ((darkRef.current ? 1 : 0) - theme) * smoothing;
      if (!motion.matches) elapsed += delta;
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform1f(uniforms.dark, theme);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.opacity = "1";
      if (!motion.matches) requestDraw();
    };
    function requestDraw() {
      if (!frame && !lost && !document.hidden) frame = requestAnimationFrame(draw);
    }
    const move = (event) => {
      target.x = event.clientX / window.innerWidth;
      target.y = 1 - event.clientY / window.innerHeight;
      requestDraw();
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      requestDraw();
    };
    const contextLost = () => {
      lost = true;
      cancelAnimationFrame(frame);
      canvas.style.opacity = "0";
    };
    const themeObserver = new MutationObserver(requestDraw);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    shapeImage.onload = () => {
      if (lost) return;
      gl.bindTexture(gl.TEXTURE_2D, shapeTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, shapeImage);
      requestDraw();
    };
    shapeImage.src = "/cloud-shape.png";
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    canvas.addEventListener("webglcontextlost", contextLost);
    motion.addEventListener("change", visibility);
    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("webglcontextlost", contextLost);
      motion.removeEventListener("change", visibility);
      shapeImage.onload = null;
      gl.deleteTexture(shapeTexture);
      gl.deleteBuffer(buffer);
      disposeProgram();
    };
  }, []);

  return <div className="cloud-background" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
