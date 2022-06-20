/** @format */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import MovieLoading from '../components/MovieLoading';
import { withRouter } from '../utils/navigation';

const Detail = (props) => {
	const [data, setData] = useState({});
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [similar, setSimilar] = useState([]);
	const [credits, setCredits] = useState([]);

	useEffect(() => {
		getDetail();
		getSimiliar();
	}, []);

	function getDetail() {
		const { movie_id } = props.params;
		axios
			.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,credits`)
			.then((res) => {
				document.title = `Moviely - ${res.data.title}`;
				const credit = res.data.credits.cast.slice(0, 6);
				const video = res.data.videos.results;
				setCredits(credit);
				setVideos(video);
				setData(res.data);
			})
			.catch((err) => {
				alert(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function getSimiliar() {
		const { movie_id } = props.params;
		axios
			.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
			.then((res) => {
				const similiars = res.data.results.slice(0, 6);
				setSimilar(similiars);
			})
			.catch((err) => {
				alert(err.toString());
			})
			.finally(() => setLoading(false));
	}

	return (
		<Layout>
			{loading ? (
				<MovieLoading />
			) : (
				<div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path}`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
					<div className='w-full md:h-screen flex justify-center items-center'>
						<div className='w-3/4 grid md:grid-cols-2 gap-4 bg-white/60 border-2 border-slate-800 rounded-lg p-3 shadow-lg shadow-black mt-20'>
							<div className='flex flex-col justify-center items-center'>
								<img className='w-[80%] place-self-center' src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} alt={data.poster_path} />
								<a
									href={data.homepage}
									target='blank'
									className='bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 py-3 rounded-md hover:bg-slate-500 hover:bg-opacity-50 flex justify-center items-center text-center text-sm sm:text-base font-inter  mt-5 bg-opacity-30 border-2 border-slate-800 dark:border-slate-100 dark:text-white w-[80%]'>
									<p>Watch Now</p>
								</a>
							</div>
							<div className='flex flex-col justify-between'>
								<div className='font-inter'>
									<h1 className='text-xl sm:text-3xl font-bold text-center mb-7 font-rubik'>{data.title}</h1>
									<div className='space-y-1'>
										<h1 className='font-bold text-base sm:text-lg font-sans'>
											<span className='font-semibold'>Runtime :</span> {data.runtime + ' mins'}
										</h1>
										<h1 className='font-semibold text-base sm:text-lg font-sans'>
											<span className='font-bold'>Genres :</span>{' '}
											{data.genres &&
												data.genres
													.map((genre) => {
														return genre.name;
													})
													.join(', ')}
										</h1>
										<h1 className='font-semibold text-base sm:text-lg font-sans'>
											<span className='font-bold'>Release Date :</span> {data.release_date}
										</h1>
										<h1 className='font-semibold text-base sm:text-lg font-sans'>
											<span className='font-bold'>Status :</span> {data.status}
										</h1>
										<h1 className='font-semibold text-base sm:text-lg font-sans'>
											<span className='font-bold'>Language :</span> {data.original_language}
										</h1>
										<h1 className='font-semibold text-base sm:text-lg font-sans'>
											<span className='font-bold'>Overview : </span>
											<br />
											{data.overview}
										</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='py-24 flex justify-center items-center'>
						<div className='w-full sm:w-3/4 flex flex-col justify-center items-center space-y-8 p-8'>
							{videos.length === 0 ? (
								<div className='w-full h-[25vh] sm:h-[70vh] flex justify-center items-center bg-slate-100 dark:bg-slate-600 transition duration-500'>
									<h1 className='text-lg sm:text-2xl font-bold text-black dark:text-white'>No Videos Available</h1>
								</div>
							) : (
								<iframe
									key={data.videos.results[0].key}
									className='w-full h-[25vh] sm:h-[70vh]'
									src={`https://www.youtube.com/embed/${videos[0].key}`}
									title={data.title}
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullscreen='true'
								/>
							)}
						</div>
					</div>
				</div>
			)}
			<div className='h-auto w-full flex flex-col justify-center items-center'>
				<h1 className='font-bold font-rubik text-3xl sm:text-4xl my-12 text-black dark:text-white'>Credits Cast</h1>
				<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-5 p-0 sm:p-8'>
					{credits.map((item, index) => {
						return (
							<div key={index} className='flex flex-col justify-center items-center cursor-pointer bg-slate-500 dark:bg-slate-300 w-64 sm:w-80 transition duration-500' onClick={() => alert('on development')}>
								<img src={item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} alt={item.character} className='h-full w-full' />
								<h1 className='text-center font-oswald font-medium tracking-widest text-lg text-white dark:text-black py-5'>
									{item.name}
									<br /> as <br /> {item.character}
								</h1>
							</div>
						);
					})}
				</div>
			</div>
			<div className='h-auto flex flex-col justify-center items-center m-12'>
				<h1 className='font-bold font-rubik text-3xl sm:text-4xl my-12 text-black dark:text-white'>Similar Movies</h1>
				<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-5 w-full'>
					{similar.map((item, index) => {
						return (
							<div key={index} className='flex flex-col h-max cursor-pointer'>
								<a href={`/movie/${item.id}`} className='flex justify-center'>
									<img src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} alt={item.title} className='h-full relative' />
								</a>
							</div>
						);
					})}
				</div>
			</div>
			<div className='flex justify-center items-center py-12'>
				<Link to='/' className='text-2xl text-black font-inter font-bold dark:text-white'>
					Back to Home
				</Link>
			</div>
		</Layout>
	);
};

export default withRouter(Detail);
