document.querySelectorAll('.social-icons a').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

/* -------------------------------------------------------------------------- */
/*                                   Skills                                   */
/* -------------------------------------------------------------------------- */
const progressBars = document.querySelectorAll('.progress-fill');

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      progressBars.forEach((bar) => {
        bar.style.width = bar.dataset.value + '%';
      });
      observer.disconnect();
    }
  },
  { threshold: 0.3 }
);

observer.observe(document.querySelector('#skills'));
