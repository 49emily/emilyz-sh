# Image Optimization Solutions

## Current Issues

1. Images disappear/reappear on scroll (likely due to lazy loading or memory issues)
2. Slow initial load times

## Solutions Implemented

### ✅ Solution 1: Added Loading Attributes (DONE)

- Added `loading="eager"` for gallery thumbnails (loads immediately)
- Added `loading="lazy"` for additional images on detail pages
- Added `decoding="async"` to prevent blocking the main thread

## Additional Solutions to Try

### Solution 2: Convert HEIC Files to JPG/WebP

HEIC files have poor browser support. Convert them:

```bash
# Install ImageMagick (if not already installed)
brew install imagemagick

# Convert all HEIC files to JPG
cd public/projects
find . -name "*.heic" -o -name "*.HEIC" | while read file; do
  magick "$file" "${file%.*}.jpg"
done
```

Then update the paths in `projects.js` from `.heic` to `.jpg`.

### Solution 3: Optimize Image Sizes

Large images cause slow loads. Resize them:

```bash
# Resize images to max 2000px width (keeps quality good for displays)
cd public/projects
find . -name "*.jpg" -o -name "*.png" | while read file; do
  magick "$file" -resize "2000x2000>" "$file"
done
```

### Solution 4: Use Next.js Image Component (Best Performance)

Update the gallery view to use optimized images:

```jsx
import Image from "next/image";

// In the gallery grid:
<div className="aspect-square relative overflow-hidden">
  <Image
    src={painting.image}
    alt={painting.title}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover transition-transform duration-500"
    priority={index < 6} // Prioritize first 6 images
  />
</div>;
```

### Solution 5: Add Image Placeholders

Add blur placeholders for better UX:

```jsx
<img
  src={painting.image}
  alt={painting.title}
  className="object-cover w-full h-full"
  loading="eager"
  decoding="async"
  style={{ backgroundColor: "#f3f4f6" }} // Gray background while loading
/>
```

### Solution 6: Preload Critical Images

Add to the page head for above-the-fold images:

```jsx
// In app/visual-art/page.jsx
export default function VisualArt() {
  const sortedPaintings = [...paintings].sort(...);
  const firstSix = sortedPaintings.slice(0, 6);

  return (
    <>
      {/* Preload first 6 images */}
      {firstSix.map((painting) => (
        <link
          key={painting.slug}
          rel="preload"
          as="image"
          href={painting.image}
        />
      ))}
      {/* ... rest of page */}
    </>
  );
}
```

### Solution 7: Enable Static Image Optimization

Update `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
```

### Solution 8: Add srcset for Responsive Images

For manual `<img>` tags, add srcset:

```jsx
<img
  src={painting.image}
  srcSet={`${painting.image} 1x, ${painting.imageRetina || painting.image} 2x`}
  alt={painting.title}
  loading="eager"
  decoding="async"
/>
```

## Recommended Order of Implementation

1. ✅ **Added loading attributes** (Done)
2. **Convert HEIC to JPG** - Best browser support
3. **Optimize image sizes** - Reduce file sizes
4. **Add background colors** - Better loading experience
5. **Use Next.js Image** - Best performance (requires more work)

## Quick Wins

### Update Code Page Images Too

The `/code` page also needs the same loading attributes. Update `app/code/page.jsx`:

```jsx
<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover transition-transform duration-500"
  loading="eager"
  decoding="async"
/>
```

### Check Image File Sizes

Run this to see which images are largest:

```bash
cd public/projects
find . -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.heic" \) -exec ls -lh {} \; | sort -k5 -hr | head -20
```

Images over 500KB should be optimized.
