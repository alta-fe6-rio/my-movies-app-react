/** @format */

import Layout from '../components/Layout';
import { MovieCard, MovieLoading } from '../components/MovieCard';
import axios from 'axios';
import React, { Component } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { withRouter } from '../utils/navigation';

class Homepage extends Component {
	state = {
		data: [],
		page: 1,
		loading: true,
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const newPage = this.state.page + 1;
		axios
			.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.page}`)
			.then((res) => {
				const { results } = res.data;
				const movieClone = this.state.data.slice();
				movieClone.push(...results);
				this.setState({ data: movieClone, page: newPage });
			})
			.catch((err) => console.log(err))
			.finally(() => this.setState({ loading: false }));
	}

	render() {
		return (
			<Layout>
				<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-5 gap-16 md:gap-5'>
					{this.state.loading ? <MovieLoading /> : this.state.data.map((item, index) => <MovieCard key={index} img={item.poster_path} title={item.title} onClickItem={() => this.props.navigate(`movie/${item.id}`)} />)}
				</div>
				<div className='flex py-4 w-full'>
					<button onClick={() => this.fetchData()} className='mx-auto text-2xl text-white'>
						<IoIosArrowDown className='mx-auto text-5xl animate-bounce' />
					</button>
				</div>
			</Layout>
		);
	}
}

export default withRouter(Homepage);
