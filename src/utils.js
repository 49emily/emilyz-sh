// Helper functions to trigger global image overlay
const showImage = (imageType) => {
  window.dispatchEvent(new CustomEvent("showImage", { detail: { imageType, show: true } }));
};

const hideImage = (imageType) => {
  window.dispatchEvent(new CustomEvent("showImage", { detail: { imageType, show: false } }));
};

export { showImage, hideImage };
