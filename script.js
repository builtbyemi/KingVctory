'use strict';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const motionToggle = document.querySelector('#motion-toggle');
let motionOff = reducedMotion.matches;
let explicitPreference = false;

function updateMotion() {
  if (reducedMotion.matches) motionOff = true;
  motionToggle.hidden = false;
  motionToggle.disabled = reducedMotion.matches;
  document.documentElement.classList.toggle('motion-off', motionOff);
  motionToggle.textContent = reducedMotion.matches ? 'Motion: reduced' : `Motion: ${motionOff ? 'off' : 'on'}`;
  motionToggle.setAttribute('aria-pressed', String(motionOff));
  motionToggle.setAttribute('aria-label', motionOff ? 'Enable motion effects' : 'Pause motion effects');
  if (motionOff) document.querySelectorAll('.magnetic, .portrait').forEach(e => e.style.removeProperty('transform'));
}
motionToggle.addEventListener('click', () => {
  explicitPreference = true;
  motionOff = !motionOff;
  updateMotion();
});
reducedMotion.addEventListener('change', e => {
  if (!explicitPreference) motionOff = e.matches;
  updateMotion();
});
updateMotion();

// Progressive enhancement: all content is visible without JavaScript.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('pending');
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(e => {
    if (e.getBoundingClientRect().top > innerHeight) {
      e.classList.add('pending');
      observer.observe(e);
    }
  });
}

// Pointer effects run only on interaction, rather than in a perpetual loop.
function pointerEffect(element, target, transform) {
  let frame = 0;
  element.addEventListener('pointermove', event => {
    if (motionOff || reducedMotion.matches || !finePointer.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = element.getBoundingClientRect();
      target.style.transform = transform((event.clientX-r.left)/r.width-.5, (event.clientY-r.top)/r.height-.5);
    });
  });
  element.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    target.style.removeProperty('transform');
  });
}
pointerEffect(document.querySelector('.hero-art'), document.querySelector('.portrait'),
  (x,y) => `rotate(7deg) rotateY(${x*12}deg) rotateX(${-y*10}deg)`);
document.querySelectorAll('.magnetic').forEach(e =>
  pointerEffect(e,e,(x,y) => `translate(${x*9}px, ${y*7}px)`));

// Native dialog provides focus containment, Escape and focus restoration.
const viewer = document.querySelector('#image-viewer');
const viewerImage = viewer.querySelector('img');
const caption = document.querySelector('#viewer-caption');
if (typeof viewer.showModal === 'function') {
  document.querySelectorAll('[data-viewer]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const description = link.querySelector('img')?.alt || link.textContent.replace(' ↗','').trim();
    viewerImage.src = link.href;
    viewerImage.alt = description;
    caption.textContent = description;
    viewer.showModal();
    document.body.classList.add('modal-open');
  }));
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const r = viewer.getBoundingClientRect();
    if (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    viewerImage.removeAttribute('src');
  });
  viewerImage.addEventListener('error', () => {
    caption.textContent = 'This image could not load. Close the viewer and try the evidence link again.';
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
