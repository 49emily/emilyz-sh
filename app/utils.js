// Utility functions for showing/hiding images

export const showImage = (imageType) => {
  window.dispatchEvent(
    new CustomEvent("showImage", {
      detail: { imageType, show: true },
    })
  );
};

export const hideImage = (imageType) => {
  window.dispatchEvent(
    new CustomEvent("showImage", {
      detail: { imageType, show: false },
    })
  );
};

// Bunny CDN helper function
// Converts local paths (e.g., "/projects/...") to Bunny CDN URLs
// Set NEXT_PUBLIC_BUNNY_CDN_URL environment variable, or it will use the default
export const getBunnyCDNUrl = (path) => {
  if (!path) return path;

  // If already a full URL, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Get Bunny CDN base URL from environment variable or use default
  const baseUrl = process.env.NEXT_PUBLIC_BUNNY_CDN_URL || "https://[your-zone].b-cdn.net";

  // Remove leading slash if present and add to base URL
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${baseUrl}/${cleanPath}`;
};
