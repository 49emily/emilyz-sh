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
