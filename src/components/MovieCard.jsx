/** @format */

import React, { Component } from 'react';
import { FaHeart } from 'react-icons/fa';

class MovieCard extends Component {
	render() {
		return (
			<div className='container grow flex flex-col bg-slate-500 max-w-sm mx-auto rounded-md text-white'>
				<img
					src={
						this.props.img
							? `https://image.tmdb.org/t/p/w500
${this.props.img}`
							: 'https://via.placeholder.com/500x750?text=No+Image'
					}
					alt={this.props.img}
					width='350'
					height='450'
					className='mx-auto'
				/>
				<a href='/detail' className='text-center text-2xl font-bold p-5'>
					{this.props.title}
				</a>
				<button className='mt-auto bg-red-500 py-3 px-5 text-center flex justify-center items-center space-x-2 rounded-md hover:bg-red-600'>
					<FaHeart />
					<p>Add to Favorites</p>
				</button>
			</div>
		);
	}
}

class MovieLoading extends Component {
	render() {
		return (
			<div className='w-[90vw] h-[85vh] flex'>
				<p className='m-auto text-4xl text-white'>Now Loading ...</p>
			</div>
		);
	}
}

export { MovieCard, MovieLoading };
