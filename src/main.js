import './style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'

new Swiper('.swiper', {
    modules: [Navigation,Autoplay],
    slidesPerView: 2,
    spaceBetween: 24,
    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
    },
    breakpoints: {
        1024: {slidesPerView: 1},
        640: {slidesPerView: 1}
    },

});


// Variabel untuk melacak status saat ini dan mencegah animasi bertumpuk
let currentView = 'about'; 
let isAnimating = false;

// Pastikan fungsi switchContent dari sebelumnya sudah ada
function switchContent(target) {
  const aboutBox = document.getElementById("content-about");
  const skillBox = document.getElementById("content-skill");

  if (target === 'skill') {
    aboutBox.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
    aboutBox.classList.add("opacity-0", "-translate-y-10", "pointer-events-none");

    setTimeout(() => {
      skillBox.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
      skillBox.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
    }, 300);
  } 
  else if (target === 'about') {
    skillBox.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
    skillBox.classList.add("opacity-0", "translate-y-10", "pointer-events-none");

    setTimeout(() => {
      aboutBox.classList.remove("opacity-0", "-translate-y-10", "pointer-events-none");
      aboutBox.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
    }, 300);
  }
}

// Event Listener untuk Scroll (Wheel)
document.addEventListener("DOMContentLoaded", () => {
  const scrollWrapper = document.getElementById("about-scroll-wrapper");

  if (scrollWrapper) {
    scrollWrapper.addEventListener("wheel", (event) => {
      // Jika animasi sedang berjalan, abaikan scroll tambahan
      if (isAnimating) return;

      // event.deltaY > 0 berarti scroll ke bawah
      if (event.deltaY > 30 && currentView === 'about') {
        isAnimating = true;
        currentView = 'skill';
        switchContent('skill');
        
        // Kunci scroll selama 1 detik agar animasi selesai dengan mulus
        setTimeout(() => { isAnimating = false; }, 1000); 
      } 
      // event.deltaY < 0 berarti scroll ke atas
      else if (event.deltaY < -30 && currentView === 'skill') {
        isAnimating = true;
        currentView = 'about';
        switchContent('about');
        
        // Kunci scroll selama 1 detik
        setTimeout(() => { isAnimating = false; }, 1000);
      }
    });
  }
});