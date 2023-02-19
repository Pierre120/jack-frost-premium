import type { LayoutLoad } from './$types';
 
export const load = (() => {
  return {
    // Navigation links
    pages: [
      {title: 'HOME', href: '/app'},
      {title: 'MENU', href: '/menu'},
      {title: 'ORDER', href: '/order'},
      {title: 'CONTACT', href: '/contact'},
      {title: 'ABOUT US', href: '/about'},
      
    ]
  };
}) satisfies LayoutLoad;
