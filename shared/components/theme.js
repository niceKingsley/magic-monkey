import themeStyles from './theme.scss?inline';

export function ensureTheme() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('magic-theme-tokens')) return;

  const styleEl = document.createElement('style');
  styleEl.id = 'magic-theme-tokens';
  styleEl.textContent = themeStyles;
  const target = document.head || document.documentElement;
  if (target) {
    target.insertBefore(styleEl, target.firstChild);
  }
}

ensureTheme();
