import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    // Inject "Bulk Import" link into the sidebar after DOM loads
    const interval = setInterval(() => {
      const nav = document.querySelector('nav');
      if (!nav) return;

      const existingLink = document.getElementById('bulk-import-link');
      if (existingLink) {
        clearInterval(interval);
        return;
      }

      const link = document.createElement('a');
      link.id = 'bulk-import-link';
      link.href = '/import.html';
      link.target = '_blank';
      link.textContent = '📦 Bulk Import';
      link.style.cssText = 'display:block;padding:12px 16px;color:#666;text-decoration:none;font-size:14px;font-weight:500;border-top:1px solid #eee;margin-top:8px;';
      link.addEventListener('mouseenter', () => { link.style.color = '#4f46e5'; });
      link.addEventListener('mouseleave', () => { link.style.color = '#666'; });

      nav.appendChild(link);
      clearInterval(interval);
    }, 500);
  },
};
