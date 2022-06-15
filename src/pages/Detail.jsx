/** @format */

import React, { Component } from 'react';
import Layout from '../components/Layout';
import { FaPlayCircle } from 'react-icons/fa';

class Detail extends Component {
	render() {
		return (
			<Layout>
				<div className='w-full h-full flex'>
					<div className='h-3/4 w-3/4 m-auto grid grid-flow-col bg-slate-400'>
						<div className='col-span-1 m-auto p-7'>
							<img src='https://s7.indexmovies.xyz/wp-content/uploads/2022/06/film-as-its-remembered-2022-lk21-d21.jpg' alt='MoviePoster' />
						</div>
						<div className='col-span-3 p-7 flex flex-col'>
							<h1 className='text-2xl font-bold mb-4 text-center'>Description</h1>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusamus repellat itaque ullam similique eligendi, molestiae inventore repudiandae debitis voluptas rerum hic assumenda! Quibusdam nobis sapiente cum a.
								Dicta asperiores rerum neque quis, omnis quibusdam incidunt magni quidem eveniet voluptate perspiciatis voluptatum deleniti animi eaque. Iure vitae id animi magnam!
							</p>
							<button className='bg-slate-300 px-12 py-3 rounded-md mt-auto hover:bg-slate-500 flex justify-center items-center space-x-8'>
								<FaPlayCircle />
								<p>Watch Now</p>
							</button>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Detail;
