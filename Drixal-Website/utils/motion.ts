/**
 * Scroll-reveal preset for @vueuse/motion: fade in + slide up, once.
 * Usage: <div v-motion="reveal(120)">
 * Respects prefers-reduced-motion (content appears without movement).
 */
export function reveal(delay = 0, distance = 28) {
  const reduced = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return {
    initial: { opacity: 0, y: reduced ? 0 : distance },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { duration: 700, delay, ease: [0.2, 0.7, 0.2, 1] },
    },
  }
}
