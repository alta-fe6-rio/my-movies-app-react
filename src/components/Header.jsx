/** @format */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsSun, BsFillMoonStarsFill, BsSearch } from 'react-icons/bs';
import { ThemeContext } from '../utils/context';
import { withRouter } from '../utils/navigation';

const Header = (props) => {
	const { theme, setTheme } = useContext(ThemeContext);

	const handleThemeChange = (mode) => {
		setTheme(mode);
		localStorage.setItem('theme', mode);
	};
	return (
		<nav className='w-full h-14 bg-slate-700 text-slate-300 flex justify-center items-center shadow-lg overflow-auto sticky font-oswald font-bold text-xl tracking-[.10em] dark:bg-slate-100 transition duration-500'>
			<div className='pl-5 dark:text-white'>
				<Link to='/' className='dark:text-black'>
					Moviely
				</Link>
			</div>
			<input
				type='text'
				name='search'
				placeholder='Search...'
				onKeyDown={props.onKeyDown}
				className='text-black focus:outline-none focus:absolute focus:w-full focus:h-full pl-2 py-1 mx-2 sm:mx-8 sm:focus:pl-8 rounded-full focus:rounded-none focus:ml-0 focus:sm:mx-0 w-full text-base italic placeholder:italic dark:bg-slate-500 dark:text-white dark:placeholder:text-white focus:shadow-2xl'
			/>
			<ul className='flex space-x-5 ml-auto pr-5'>
				<li>
					<Link to='/favorites' className='dark:text-black'>
						Favorites
					</Link>
				</li>
			</ul>
			<div className='pr-5 flex justify-center items-center'>
				<button>{theme === 'dark' ? <BsSun onClick={() => handleThemeChange('light')} className='text-black' /> : <BsFillMoonStarsFill onClick={() => handleThemeChange('dark')} />}</button>
			</div>
		</nav>
	);
};

export default withRouter(Header);
