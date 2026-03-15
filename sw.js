import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // Show update prompt
    if (confirm('New content is available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
  onRegistered(r) {
    console.log('Service worker registered');
    // Check for updates every hour
    setInterval(() => {
      r?.update();
    }, 60 * 60 * 1000);
  },
  onRegisterError(error) {
    console.error('Service worker registration error', error);
  }
});

// Register service worker
if ('serviceWorker' in navigator) {
  updateSW();
}