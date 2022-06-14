/** @format */

import React, { Component } from 'react';

export default class NotFound extends Component {
	render() {
		return (
			<div className='flex h-screen w-screen'>
				<div className='m-auto'>
					<h1 className='text-2xl font-sans space-x-5 flex'>
						<span className='font-bold'>404</span>
						<p>Page Not Found</p>
					</h1>
				</div>
			</div>
		);
	}
}
