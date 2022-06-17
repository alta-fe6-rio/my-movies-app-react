/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className='w-full h-auto top-0 m-0 bg-slate-800 text-slate-300 flex py-5 shadow-sm overflow-auto sticky'>
			<div className='pl-5'>
				<Link to='/'>Moviely</Link>
			</div>
			<ul className='flex space-x-5 ml-auto pr-5'>
				<li>
					<Link to='/favorites'>Favorites</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Header;
