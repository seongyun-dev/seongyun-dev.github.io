// Progressive enhancement: the page reads fully without JS.

// Screen sliders: previous/next buttons and a "n / total" counter over a scroll-snap track.
for (const slider of document.querySelectorAll('[data-slider]')) {
  const track = slider.querySelector('.slider-track');
  const slides = [...track.children];
  const prev = slider.querySelector('[data-dir="-1"]');
  const next = slider.querySelector('[data-dir="1"]');
  const count = slider.querySelector('.slider-count');
  const step = () => slides[0].getBoundingClientRect().width + (Number.parseFloat(getComputedStyle(track).columnGap) || 0);
  const refresh = () => {
    const index = Math.min(slides.length - 1, Math.round(track.scrollLeft / step()));
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    count.textContent = `${atEnd ? slides.length : index + 1} / ${slides.length}`;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = atEnd;
    slider.classList.toggle('fits', track.scrollWidth <= track.clientWidth + 4);
  };
  prev.addEventListener('click', () => track.scrollBy({left: -step()}));
  next.addEventListener('click', () => track.scrollBy({left: step()}));
  track.addEventListener('scroll', refresh, {passive: true});
  addEventListener('resize', refresh);
  refresh();
}

// Print / save as PDF.
document.querySelector('[data-print]')?.addEventListener('click', () => print());
