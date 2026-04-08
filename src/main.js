import './style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'

new Swiper('.swiper', {
  modules: [Navigation, Autoplay],
  slidesPerView: 2,
  spaceBetween: 24,
  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev',
  },
  breakpoints: {
    1024: { slidesPerView: 1 },
    640: { slidesPerView: 1 }
  },

});


// Variabel untuk melacak status saat ini dan mencegah animasi bertumpuk
let currentView = 'about';
let isAnimating = false;

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

// var scrollBehavior = "smooth";
function showTab(tabId) {
  // 1. Ambil semua konten dan tombol
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');

  // 2. Reset semua: Sembunyikan konten dan hapus status aktif di tombol
  contents.forEach(content => {
    content.classList.remove('active-content');
    content.style.display = 'none';
  });

  buttons.forEach(btn => {
    btn.classList.remove('active-tab');
  });

  // 3. Tampilkan konten yang dipilih
  const target = document.getElementById(tabId);

  // Set display block dulu agar elemen ada di DOM
  target.style.display = 'block';

  // Berikan jeda 10ms agar browser sempat memproses 'display: block' 
  // sebelum animasi opacity/transform berjalan
  setTimeout(() => {
    target.classList.add('active-content');
  }, 10);

  // 4. Aktifkan tombol yang diklik
  event.currentTarget.classList.add('active-tab');
}

// Inisialisasi: Jalankan tab pertama saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  const firstBtn = document.querySelector('.tab-btn');
  if (firstBtn) firstBtn.click();
});

var typed = new Typed(".write", {
  strings: [
    "Web Developer",
    "Web Designer",
    "Front End Developer",
    "Backend Developer",
  ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

function openSection(clickedSection) {
  const hero = document.getElementById("hero");
  const sections = document.querySelectorAll(".section");

  // 1. Sembunyikan Hero Section
  const heroTexts = hero.querySelectorAll(".hero-text");
  heroTexts.forEach((txt) =>
    txt.classList.add("translate-y-10", "opacity-0"),
  );

  // Hero memudar dan menyempit
  hero.classList.remove("flex-1", "opacity-100", "p-8", "pl-16");
  hero.classList.add("w-0", "flex-[0]", "opacity-0", "px-0");

  // 2. Tutup semua section menjadi kotak kecil di samping
  sections.forEach((sec) => {
    sec.classList.remove("flex-1");
    sec.classList.add(
      "w-[70px]",
      "flex-none",
      "cursor-pointer",
      "hover:brightness-110",
    );

    const header = sec.querySelector(".section-header");
    if (header) {
      header.classList.remove("opacity-0", "pointer-events-none");
      header.classList.add("opacity-100");
    }

    const mainContent = sec.querySelector(".main-section");
    if (mainContent) {
      mainContent.classList.remove(
        "opacity-100",
        "scale-100",
        "pointer-events-auto",
      );
      mainContent.classList.add(
        "opacity-0",
        "scale-95",
        "pointer-events-none",
      );

      const title = mainContent.querySelector(".title-anim");
      if (title)
        title.classList.replace("translate-y-0", "-translate-y-10");
    }
  });

  // 3. Buka section yang diklik secara penuh (seperti Hero di awal)
  clickedSection.classList.remove(
    "w-[70px]",
    "flex-none",
    "cursor-pointer",
    "hover:brightness-110",
  );
  clickedSection.classList.add("flex-1");

  const activeHeader = clickedSection.querySelector(".section-header");
  if (activeHeader) {
    activeHeader.classList.remove("opacity-100");
    activeHeader.classList.add("opacity-0", "pointer-events-none");
  }

  const activeMain = clickedSection.querySelector(".main-section");
  if (activeMain) {
    setTimeout(() => {
      activeMain.classList.remove(
        "opacity-0",
        "scale-95",
        "pointer-events-none",
      );
      activeMain.classList.add(
        "opacity-100",
        "scale-100",
        "pointer-events-auto",
      );

      const title = activeMain.querySelector(".title-anim");
      if (title)
        title.classList.replace("-translate-y-10", "translate-y-0");
    }, 400);
  }
}

function resetLayout() {
  const hero = document.getElementById("hero");
  const sections = document.querySelectorAll(".section");

  // 1. Kembalikan ukuran Hero menjadi sangat lebar (Penuh)
  hero.classList.remove("w-0", "flex-[0]", "opacity-0", "px-0");
  hero.classList.add("flex-1", "opacity-100", "p-8", "pl-16");

  // Animasi teks Hero muncul kembali
  setTimeout(() => {
    const heroTexts = hero.querySelectorAll(".hero-text");
    heroTexts.forEach((txt) =>
      txt.classList.remove("translate-y-10", "opacity-0"),
    );
  }, 300);

  // 2. Reset semua section kembali ke kotak kecil di samping kanan
  sections.forEach((sec) => {
    sec.classList.remove("flex-1");
    sec.classList.add(
      "w-[70px]",
      "flex-none",
      "cursor-pointer",
      "hover:brightness-110",
    );

    const header = sec.querySelector(".section-header");
    if (header) {
      header.classList.remove("opacity-0", "pointer-events-none");
      header.classList.add("opacity-100");
    }

    const mainContent = sec.querySelector(".main-section");
    if (mainContent) {
      mainContent.classList.remove(
        "opacity-100",
        "scale-100",
        "pointer-events-auto",
      );
      mainContent.classList.add(
        "opacity-0",
        "scale-95",
        "pointer-events-none",
      );

      const title = mainContent.querySelector(".title-anim");
      if (title)
        title.classList.replace("translate-y-0", "-translate-y-10");
    }
  });
}

function switchContent(target) {
  const aboutBox = document.getElementById("content-about");
  const skillBox = document.getElementById("content-skill");

  if (target === "skill") {
    // 1. Fade Out About
    aboutBox.classList.remove(
      "opacity-100",
      "translate-y-0",
      "pointer-events-auto",
    );
    aboutBox.classList.add(
      "opacity-0",
      "-translate-y-10",
      "pointer-events-none",
    );

    // 2. Fade In Skill (Memberikan sedikit jeda agar terlihat bergantian)
    setTimeout(() => {
      skillBox.classList.remove(
        "opacity-0",
        "translate-y-10",
        "pointer-events-none",
      );
      skillBox.classList.add(
        "opacity-100",
        "translate-y-0",
        "pointer-events-auto",
      );
    }, 300); // Jeda 300ms
  } else if (target === "about") {
    // 1. Fade Out Skill
    skillBox.classList.remove(
      "opacity-100",
      "translate-y-0",
      "pointer-events-auto",
    );
    skillBox.classList.add(
      "opacity-0",
      "translate-y-10",
      "pointer-events-none",
    );

    // 2. Fade In About
    setTimeout(() => {
      aboutBox.classList.remove(
        "opacity-0",
        "-translate-y-10",
        "pointer-events-none",
      );
      aboutBox.classList.add(
        "opacity-100",
        "translate-y-0",
        "pointer-events-auto",
      );
    }, 300);
  }
}

const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const sidebar = document.getElementById('sidebar-menu');
const overlay = document.getElementById('mobile-sidebar');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Fungsi Membuka Menu
menuToggle.addEventListener('click', () => {
  sidebar.style.left = '0';
  overlay.classList.remove('opacity-0', 'pointer-events-none');
  overlay.classList.add('opacity-100', 'pointer-events-auto');
});

// Fungsi Menutup Menu
function hideMenu() {
  sidebar.style.left = '-100%';
  overlay.classList.add('opacity-0', 'pointer-events-none');
  overlay.classList.remove('opacity-100', 'pointer-events-auto');
}

closeMenu.addEventListener('click', hideMenu);
overlay.addEventListener('click', hideMenu);

// Klik Link: Tutup Menu + Scroll Halus
mobileLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    hideMenu(); // Tutup bar dulu

    if (targetSection) {
      // Scroll ke bagian yang dituju di dalam container scrollable
      const scrollContainer = document.querySelector('.overflow-y-auto');
      scrollContainer.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

function togglePortfolio() {
  const extraItems = document.querySelectorAll('.extra-projek');
  const btn = document.getElementById('see-more-btn');
  const project4 = document.querySelector('.projek-item.hidden.md\\:block'); // Ambil project ke-4

  extraItems.forEach(item => {
    // Toggle class hidden agar muncul
    if (item.classList.contains('hidden')) {
      item.classList.remove('hidden');
      // Pastikan saat terbuka di mobile, lebarnya tetap konsisten
      item.classList.add('block');
    } else {
      item.classList.add('hidden');
      item.classList.remove('block');
    }
  });

  // Khusus untuk project ke-4 agar muncul di SM saat klik see more
  if (window.innerWidth < 768) {
    project4.classList.toggle('hidden');
  }

  // Ubah teks tombol
  if (btn.innerText === "See More") {
    btn.innerText = "See Less";
  } else {
    btn.innerText = "See More";
  }
}

function sendWA() {
  // Nomor HP yang sudah kamu berikan
  const phoneNumber = "62881024490239";

  // Pesan otomatis yang akan muncul di kolom chat user
  const message = "Halo Attaya";

  // Membuka link WhatsApp di tab baru
  // encodeURIComponent digunakan agar spasi/karakter khusus dibaca benar oleh browser
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
}

function sendToWA() {
  // Ambil value dari input
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Cek kalau ada yang kosong
  if (!name || !email || !subject || !message) {
    alert("Waduh, isi dulu semua kolomnya ya!");
    return;
  }

  const phoneNumber = "62881024490239";

  // Susun teksnya (Pakai \n untuk baris baru di JS)
  const text = `*Halo Attaya!*%0A` +
    `Ada pesan baru nih:%0A%0A` +
    `*Nama:* ${name}%0A` +
    `*Email:* ${email}%0A` +
    `*Subject:* ${subject}%0A%0A` +
    `*Pesan:*%0A${message}`;

  // INI BAGIAN PENTINGNYA:
  // Gunakan encodeURIComponent supaya spasi & simbol aman di URL
  const url = `https://wa.me/${phoneNumber}?text=${text}`;

  window.open(url, '_blank');
}

const logoImg = document.getElementById('logo-img');
const tayaText = document.getElementById('taya-text');

function autoSwapLogo() {
  // Hanya berjalan di layar di bawah 1024px (Tablet/HP)
  if (window.innerWidth < 1024) {
    // Tampilkan Teks, Hilangkan Gambar
    logoImg.classList.replace('opacity-100', 'opacity-0');
    tayaText.classList.replace('opacity-0', 'opacity-100');

    // Kembalikan ke normal setelah 3 detik
    setTimeout(() => {
      logoImg.classList.replace('opacity-0', 'opacity-100');
      tayaText.classList.replace('opacity-100', 'opacity-0');
    }, 10000);
  }
}

// Jalankan setiap 10 detik
setInterval(autoSwapLogo, 20000);

// Expose functions to the global window object for inline HTML event handlers
window.showTab = showTab;
window.resetLayout = resetLayout;
window.openSection = openSection;
window.togglePortfolio = togglePortfolio;
window.sendWA = sendWA;
window.sendToWA = sendToWA;