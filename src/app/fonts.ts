import localFont from 'next/font/local';

export const ppMuseum = localFont({
  src: [
    {
      path: '../../public/Fonts/ppmuseum-light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/Fonts/ppmuseum-lightitalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/Fonts/ppmuseum-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/Fonts/ppmuseum-regularitalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/Fonts/ppmuseum-ultrabold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/Fonts/ppmuseum-ultrabolditalic.otf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-pp-museum',
  display: 'swap',
});
