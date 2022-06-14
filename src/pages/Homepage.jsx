/** @format */

import Layout from '../components/Layout';
import { MovieCard, MovieLoading } from '../components/MovieCard';

import React, { Component } from 'react';

class Homepage extends Component {
	state = {
		dataMovies: [],
		loading: true,
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		setTimeout(() => {
			const dummyData = [
				{
					id: 1,
					img: 'https://s7.indexmovies.xyz/wp-content/uploads/2022/06/film-as-its-remembered-2022-lk21-d21.jpg',
					title: "As it's Remembered",
				},
				{
					id: 2,
					img: 'https://s4.indexmovies.xyz/wp-content/uploads/2022/06/film-crossbreed-2019-lk21-d21.jpg',
					title: 'Crossbreed',
				},
				{
					id: 3,
					img: 'https://s1.indexmovies.xyz/wp-content/uploads/2022/04/film-9-bullets-2022-lk21-d21.jpg',
					title: '9 Bullets',
				},
				{
					id: 4,
					img: 'https://s6.indexmovies.xyz/wp-content/uploads/2022/06/film-moneyboys-2021-lk21-d21.jpg',
					title: 'Moneyboys',
				},
				{
					id: 5,
					img: 'https://s3.indexmovies.xyz/wp-content/uploads/2022/06/film-rajawali-2022-lk21-d21.jpg',
					title: 'Rajawali',
				},
				{
					id: 6,
					img: 'https://s0.indexmovies.xyz/wp-content/uploads/2022/06/film-baumbacher-syndrome-2019-lk21-d21.jpg',
					title: 'Baumbacher Syndrome',
				},
				{
					id: 7,
					img: 'https://s2.indexmovies.xyz/wp-content/uploads/2022/06/film-anne-2021-lk21-d21.jpg',
					title: 'Anne+',
				},
				{
					id: 8,
					img: 'https://s4.indexmovies.xyz/wp-content/uploads/2022/06/film-night-blooms-2022-lk21-d21.jpg',
					title: 'Night Blooms',
				},
				{
					id: 9,
					img: 'https://s5.indexmovies.xyz/wp-content/uploads/2022/06/film-jurassic-world-dominion-2022-lk21-d21.jpg',
					title: 'Jurassic World: Dominion',
				},
				{
					id: 10,
					img: 'https://s4.indexmovies.xyz/wp-content/uploads/2022/06/film-the-spy-who-never-dies-2022-lk21-d21.jpg',
					title: 'The Spy Who Never Died',
				},
			];
			this.setState({ dataMovies: dummyData }, this.setState({ loading: false }));
		}, 5000);
	}

	render() {
		return (
			<Layout>
				<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-5 gap-16 md:gap-5'>
					{this.state.loading ? <MovieLoading /> : this.state.dataMovies.map((item, index) => <MovieCard key={index} img={item.img} title={item.title} />)}
				</div>
			</Layout>
		);
	}
}

export default Homepage;
