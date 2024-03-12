import './globals.css';
import Navbar from '@/components/navbar/navbar';

const title = 'DishDelish';
// eslint-disable-next-line max-len
const description = 'Dish Delish is your go-to hub for exploring new flavors, mastering cooking techniques, and indulging in epicurean adventures.';

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

/**
 * The `RootLayout` function is a Next component that serves as
 * the root layout for a web page, including a navbar and children components.
 * @return {*} The `RootLayout` function is returning a
 * JSX structure that represents the layout of a web
 * page.
 */
export default function RootLayout({children}) {
	return (
		<html lang="en">
			<body>
				<Navbar/>
				{children}
			</body>
		</html>
	);
}
