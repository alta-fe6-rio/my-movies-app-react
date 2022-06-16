/** @format */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
	render() {
		return (
			<div className='flex h-screen w-screen bg-slate-300'>
				<div className='flex flex-col justify-center items-center w-full'>
					<h1 className='text-4xl font-sans space-x-5 flex'>
						<span className='font-bold'>404</span>
						<p>Page Not Found</p>
					</h1>
					<Link to='/' className='my-14 text-2xl font-semibold hover:underline'>
						Back to homepage
					</Link>
				</div>
			</div>
		);
	}
}
