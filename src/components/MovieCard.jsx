/** @format */

import React from 'react';
import { FaHeart } from 'react-icons/fa';

const MovieCard = (props) => {
	return (
		<div className='container grow flex flex-col bg-slate-500 dark:bg-slate-300 max-w-sm mx-auto rounded-md text-white'>
			<div onClick={props.onClickItem} className='cursor-pointer flex flex-col'>
				<img src={props.img ? `https://image.tmdb.org/t/p/w500${props.img}` : 'https://via.placeholder.com/500x750?text=No+Image'} alt={props.img} className='mx-auto w-full h-full' />
				<div className='text-center text-2xl p-5 font-oswald text-white dark:text-black'>{props.title}</div>
			</div>
			<button className='mt-auto bg-red-500 py-3 px-5 text-center flex justify-center items-center space-x-2 rounded-md hover:bg-red-600 font-inter'>
				<FaHeart />
				<p>Add to Favorites</p>
			</button>
		</div>
	);
};

export default MovieCard;
