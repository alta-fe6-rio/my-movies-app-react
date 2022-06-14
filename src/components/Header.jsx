/** @format */

import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<nav className='w-full h-auto top-0 m-0 bg-slate-800 text-slate-300 flex py-5 shadow-sm overflow-auto sticky'>
				<div className='pl-5'>
					<a href='/'>Moviely</a>
				</div>
				<ul className='flex space-x-5 ml-auto pr-5'>
					<li>
						<a href='/HotMovies'>Hot Movies</a>
					</li>
					<li>
						<a href='/Favorites'>Favorites</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Header;
