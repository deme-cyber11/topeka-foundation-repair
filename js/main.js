/* ===== MOBILE NAV TOGGLE ===== */
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===== MOBILE DROPDOWN TOGGLE ===== */
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function (dd) {
    var link = dd.querySelector('.nav-dropdown-trigger');
    if (link && window.innerWidth < 992) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        dd.classList.toggle('open');
      });
    }
  });

  /* ===== FAQ ACCORDION ===== */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var wasActive = item.classList.contains('active');
        faqItems.forEach(function (i) { i.classList.remove('active'); });
        if (!wasActive) item.classList.add('active');
      });
    }
  });

  /* ===== BEFORE/AFTER SLIDER ===== */
  var sliders = document.querySelectorAll('.ba-slider');
  sliders.forEach(function (slider) {
    var handle = slider.querySelector('.ba-handle');
    var afterImg = slider.querySelector('.ba-after');
    var isDragging = false;

    function updateSlider(x) {
      var rect = slider.getBoundingClientRect();
      var pos = Math.max(0, Math.min(x - rect.left, rect.width));
      var pct = (pos / rect.width) * 100;
      handle.style.left = pct + '%';
      afterImg.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
    }

    slider.addEventListener('mousedown', function (e) { isDragging = true; updateSlider(e.clientX); });
    document.addEventListener('mousemove', function (e) { if (isDragging) updateSlider(e.clientX); });
    document.addEventListener('mouseup', function () { isDragging = false; });
    slider.addEventListener('touchstart', function (e) { isDragging = true; updateSlider(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchmove', function (e) { if (isDragging) updateSlider(e.touches[0].clientX); });
    document.addEventListener('touchend', function () { isDragging = false; });
  });

  /* ===== SCROLL FADE-IN ===== */
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  }

  /* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ===== HEADER SCROLL SHADOW ===== */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,.1)';
      } else {
        header.style.boxShadow = '0 1px 8px rgba(0,0,0,.06)';
      }
    });
  }
});
