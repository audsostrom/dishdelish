import './globals.css';


let title = 'DishDelish';
let description = 'Dish Delish is your go-to hub for exploring new flavors, mastering cooking techniques, and indulging in epicurean adventures.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  // change later during deployment
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
