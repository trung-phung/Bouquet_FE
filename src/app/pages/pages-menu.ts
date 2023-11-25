import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Bouquet',
    icon: 'home-outline',
    link: '/pages/bouquet',
  },
  {
    title: 'Order',
    icon: 'shopping-cart-outline',
    link: '/pages/order',
  },
];
export const ADMIN_MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Bouquet',
    icon: 'home-outline',
    link: '/pages/bouquet',
  },
  {
    title: 'Order',
    icon: 'shopping-cart-outline',
    link: '/pages/order',
  },

  {
    title: 'Admin',
    group: true,
  },
  {
    title: 'Message',
    icon: 'layout-outline',
    link: '/pages/message',
    home: true,
  },
  {
    title: 'User',
    icon: 'home-outline',
    link: '/pages/user',
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
    ],
  },
];

