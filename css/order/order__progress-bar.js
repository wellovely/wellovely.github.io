// Изменение позиции ползунка .order__progress-circle и запись значения

document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.querySelector(".order__progress-bar");
  const progressCircle = document.querySelector(".order__progress-circle");
  const progressText = document.querySelector(".order__progress-text");

  let isDragging = false;

  const startDragging = (event) => {
    isDragging = true;
    document.body.style.cursor = "grabbing";
    moveCircle(event);
  };

  const stopDragging = () => {
    isDragging = false;
    document.body.style.cursor = "default";
  };

  const moveCircle = (event) => {
    if (!isDragging) return;

    const progressBarRect = progressBar.getBoundingClientRect();
    let newLeft = event.clientX - progressBarRect.left;

    // Constrain the circle within the progress bar
    newLeft = Math.max(0, Math.min(newLeft, progressBarRect.width));

    const progressPercentage = (newLeft / progressBarRect.width) * 100;

    requestAnimationFrame(() => {
      progressCircle.style.marginLeft = `${progressPercentage}%`;
      progressText.textContent = `${Math.round(progressPercentage)}%`;
    });
  };

  progressCircle.addEventListener("mousedown", startDragging);
  document.addEventListener("mousemove", moveCircle);
  document.addEventListener("mouseup", stopDragging);
});
