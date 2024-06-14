document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".reviews__slide");
  const nextButton = document.querySelector(".reviews__control--next");
  const prevButton = document.querySelector(".reviews__control--prev");
  let currentSlide = 0;

  function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  nextButton.addEventListener("click", () => showSlide(currentSlide + 1));
  prevButton.addEventListener("click", () => showSlide(currentSlide - 1));
});
