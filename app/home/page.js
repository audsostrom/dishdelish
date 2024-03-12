import Link from 'next/link';
import './home.css';

/**
 * @return {*} – Renders the Landing page
 */
export default async function Home() {
	return (
		<div className="home">
			<div className="headerContainer">
				<div className="beigeBox">
					<p>Discover Your Next Dish</p>
					<span className="customText">
						Trying to save some cash or use the food you have already?
						DishDelish brings the power to your pantry by fetching recipes with
						ONLY the ingredients you have on-hand!
					</span>
					<br />
					<br />
					{/** href instead of to for next linking */}
					<Link href="/menu" className="">
						<button>GET TO COOKING</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
