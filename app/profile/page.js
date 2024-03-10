import './profile.css';

import Image from 'next/image';
import DefaultIcon from '../../assets/default-profile-icon.svg';
import {Settings} from './settings/settings';


export default async function Profile() {
	return (
		<div className='profile-container'>
			<div className="banner">
			</div>
			<div className='profile-header'>
				<Image alt='profile icon' height='200' width='200' src={DefaultIcon}/>
				{/* <Image className='pencil' height='50' width='50' src={PencilIcon}/> */}
			</div>
			<div>

			</div>
			<div className='title'>Your Profile</div>
			<hr></hr>
			<Settings/>
		</div>
	);
}
