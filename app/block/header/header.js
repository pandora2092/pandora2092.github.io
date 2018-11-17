var slideIndex = null;
var timerId = null;
var slidesCount = document.getElementsByClassName("header__slide").length;

function showSlide(i) {
  var slides = document.getElementsByClassName("header__slide");
  var dots = document.getElementsByClassName("header__dot");
  slides[i].style.opacity = "1"; 
  dots[i].className += " active";
}

function hideSlide(i) {
  var slides = document.getElementsByClassName("header__slide");
  var dots = document.getElementsByClassName("header__dot");
  slides[i].style.opacity = "0"; 
  dots[i].className = dots[i].className.replace(" active", "");
}

function setSlide(i) {
  if(slideIndex != null) hideSlide(slideIndex);
  slideIndex = i;
  showSlide(slideIndex);
}

function prevSlide() {
  if (slideIndex == 0) {
    setSlide(slidesCount-1);
  } else {
    setSlide(slideIndex-1);
  }
}

function nextSlide() {
  if (slideIndex == slidesCount-1) {
    setSlide(0);
  } else {
    setSlide(slideIndex+1);
  }
}

function autoNextSlide() {
  if(timerId != null) { 
    clearInterval(timerId);
  }
  timerId = setInterval(nextSlide, 5000);
}

function clickSlide (i) {
    autoNextSlide();
    setSlide(i);
}

function clickNextSlide () {
    autoNextSlide();
    prevSlide();
}

function clickPrevSlide () {
    autoNextSlide();
    nextSlide();
}

clickSlide(0);

