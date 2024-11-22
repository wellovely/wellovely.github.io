document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.querySelector(".container").appendChild(overlay);

  let isResizing = false;
  let resizeTimeout;

  const updateMask = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const masks = Array.from(document.querySelectorAll(".mask"));
    const validMasks = masks.filter((mask) => {
      const rect = mask.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

    if (!validMasks.length) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-out";

    validMasks.forEach((mask) => {
      const rect = mask.getBoundingClientRect();
      const gradient = ctx.createLinearGradient(rect.left, 0, rect.right, 0);
      gradient.addColorStop(0, "white");
      gradient.addColorStop(1, "white");

      ctx.fillStyle = gradient;
      ctx.fillRect(rect.left, rect.top, rect.width, rect.height);
    });

    requestAnimationFrame(() => {
      overlay.style.setProperty(
        "--mask-image",
        `url(${canvas.toDataURL("image/png", 1)})`
      );
    });
  };

  const handleResizeStart = () => {
    if (!isResizing) {
      isResizing = true;
      overlay.classList.remove("ready");
      document.body.style.pointerEvents = "none";
    }
  };

  const handleResizeEnd = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      isResizing = false;
      setTimeout(() => {
        updateMask();
        setTimeout(() => {
          overlay.classList.add("ready");
          document.body.style.pointerEvents = "";
        }, 50);
      }, 300);
    }, 200);
  };

  const resizeObserver = new ResizeObserver((entries) => {
    handleResizeStart();
    handleResizeEnd();
  });

  resizeObserver.observe(document.querySelector(".container"));

  updateMask();
  setTimeout(() => {
    overlay.classList.add("ready");
  }, 300);
});
