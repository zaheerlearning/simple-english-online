// WorldWatch PWA — Service Worker Registration
// Add this to your GitHub Pages repo only. Do NOT embed in the HTML file.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('WorldWatch SW ready'))
      .catch(e => console.warn('SW failed:', e));
  });
}
