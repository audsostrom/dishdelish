import Link from 'next/link';
import BannerImage from '../../assets/cuttingbanana.png';
import './home.css';
import Navbar from '@/components/navbar/navbar';

function Home() {
	return (
		<div className="home">
			<div className="headerContainer">
				<div className="beigeBox">
					<p>Discover Your Next Dish</p>
					<span className="customText">Trying to save some cash or use the food you have already? DishDelish brings the power to your pantry by fetching recipes with ONLY the ingrediants you have on-hand!</span>
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

export default Home;
