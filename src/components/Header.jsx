/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
// import { BsSun, BsFillMoonStarsFill } from 'react-icons/bs';

const Header = () => {
	// const checkbox = document.querySelector('#toggle');
	// const html = document.querySelector('html');

	// checkbox.addEventListener('click', () => {
	// 	checkbox.checked ? html.classList.add('dark') : html.classList.remove('dark');
	// });
	return (
		<nav className='w-full h-auto top-0 m-0 bg-slate-700 text-slate-300 flex py-5 shadow-sm overflow-auto sticky font-oswald font-bold text-xl tracking-[.10em] dark:bg-slate-100'>
			<div className='pl-5 dark:text-white'>
				<Link to='/' className='dark:text-black'>
					Moviely
				</Link>
			</div>
			<ul className='flex space-x-5 ml-auto pr-5'>
				<li>
					<Link to='/favorites' className='dark:text-black'>
						Favorites
					</Link>
				</li>
			</ul>
			{/* <div className='pr-5 flex justify-center items-center'>
				<input type='checkbox' id='toggle' className='hidden' />
				<label for='toggle' className='cursor-pointer'>
					<BsSun className='text-white dark:hidden' />
					<BsFillMoonStarsFill className='text-white hidden dark:flex dark:text-black' />
				</label>
			</div> */}
		</nav>
	);
};

export default Header;
