/** @format */
import axios from 'axios';
import React, { Component } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import Layout from '../components/Layout';
import { MovieLoading } from '../components/MovieCard';
import { withRouter } from '../utils/navigation';

class Detail extends Component {
	state = {
		data: {},
		loading: true,
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const { movie_id } = this.props.params;
		axios
			.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
			.then((res) => {
				console.log(res.data);
				this.setState({ data: res.data });
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	}

	render() {
		const { data, loading } = this.state;
		if (loading) {
			return <MovieLoading />;
		} else {
			return (
				<Layout>
					<div className='w-full h-full flex'>
						<div className='h-full flex' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
							<div className='h-auto w-3/4 m-auto grid grid-flow-col bg-slate-400 bg-opacity-60'>
								<div className='col-span-1 m-auto p-7 flex flex-col'>
									<img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt='MoviePoster' className='h-[60vh]' />
									<a href={data.homepage} className='bg-slate-300 px-12 py-3 rounded-md hover:bg-slate-500 hover:bg-opacity-50 flex justify-center items-center mt-5 space-x-8 bg-opacity-30 border-2 border-slate-300'>
										<FaPlayCircle />
										<p>Watch Now</p>
									</a>
								</div>
								<div className='col-span-3 p-7 flex flex-col'>
									<h1 className='text-3xl font-bold mb-4 text-center'>{data.title}</h1>
									<h1 className='font-semibold text-xl font-sans'>
										<span className='font-bold'>Runtime :</span> {data.runtime}
									</h1>
									<h1 className='font-semibold text-xl font-sans'>
										<span className='font-bold'>Genres :</span> {data.genres.map((genre) => genre.name).join(', ')}
									</h1>
									<h1 className='font-semibold text-xl font-sans'>
										<span className='font-bold'>Release Date :</span> {data.release_date}
									</h1>
									<h1 className='font-semibold text-xl font-sans'>
										<span className='font-bold'>Status :</span> {data.status}
									</h1>
									<h1 className='font-semibold text-xl font-sans'>
										<span className='font-bold'>Language :</span> {data.original_language}
									</h1>
									<p>
										<span className='font-bold'>Overview : </span>
										{data.overview}
									</p>
								</div>
							</div>
						</div>
					</div>
				</Layout>
			);
		}
	}
}

export default withRouter(Detail);
