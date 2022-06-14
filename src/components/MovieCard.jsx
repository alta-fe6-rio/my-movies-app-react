/** @format */

import React, { Component } from 'react';
import { FaHeart } from 'react-icons/fa';

class MovieCard extends Component {
	render() {
		return (
			<div className='container grow p-7 flex flex-col bg-slate-500 max-w-sm mx-auto rounded-md space-y-4 text-white'>
				<img src={this.props.img} alt={this.props.img} width='350' height='450' className='mx-auto' />
				<a href='/Detail' className='text-center text-2xl font-bold'>
					{this.props.title}
				</a>
				<button className='bg-red-500 py-3 px-5 text-center flex justify-center items-center space-x-2 rounded-md hover:bg-red-600'>
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
			<div className='w-[97vw] h-[85vh] flex'>
				<p className='m-auto text-4xl text-white'>Now Loading ...</p>
			</div>
		);
	}
}

export { MovieCard, MovieLoading };
