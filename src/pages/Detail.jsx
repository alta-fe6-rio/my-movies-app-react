/** @format */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import Layout from '../components/Layout';
import MovieLoading from '../components/MovieLoading';
import { withRouter } from '../utils/navigation';

const Detail = (props) => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [similar, setSimilar] = useState([]);

	useEffect(() => {
		getDetail();
		getSimilar();
	}, []);

	function getDetail() {
		const { movie_id } = props.params;
		axios
			.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`)
			.then((res) => {
				document.title = `Moviely - ${res.data.title}`;
				setData(res.data);
			})
			.catch((err) => {
				alert(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	}

	function getSimilar() {
		const { movie_id } = props.params;
		axios
			.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=2e673a88713b1653d927c079cc89f903&language=en-US&page=1`)
			.then((res) => {
				const similars = res.data.results.slice(0, 10);
				setSimilar(similars);
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
					<div className='w-full sm:h-screen flex justify-center items-center p-6'>
						<div className='w-3/4 grid sm:grid-cols-2 gap-4 bg-white/60 border-2 border-slate-800 rounded-lg p-3 shadow-lg shadow-black mt-20'>
							<div className='flex flex-col justify-center items-center'>
								<img className='w-3/5 sm:w-4/5 place-self-center' src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'} alt={data.poster_path} />
								<a href={data.homepage} target='blank' className='bg-slate-300 px-12 py-3 rounded-md hover:bg-slate-500 hover:bg-opacity-50 flex justify-center items-center mt-5 space-x-8 bg-opacity-30 border-2 border-slate-300 w-[80%]'>
									<FaPlayCircle />
									<p>Watch Now</p>
								</a>
							</div>
							<div className='flex flex-col justify-between'>
								<div>
									<h1 className='text-3xl font-bold text-center mb-7'>{data.title}</h1>
									<div className='space-y-4'>
										<h1 className='font-semibold text-lg font-sans'>
											<span className='font-bold'>Runtime :</span> {data.runtime} mins
										</h1>
										<h1 className='font-semibold text-lg font-sans'>
											<span className='font-bold'>Genres :</span> {data.genres.map((genre) => genre.name).join(', ')}
										</h1>
										<h1 className='font-semibold text-lg font-sans'>
											<span className='font-bold'>Release Date :</span> {data.release_date}
										</h1>
										<h1 className='font-semibold text-lg font-sans'>
											<span className='font-bold'>Status :</span> {data.status}
										</h1>
										<h1 className='font-semibold text-lg font-sans'>
											<span className='font-bold'>Language :</span> {data.original_language}
										</h1>
										<h1 className='font-semibold text-lg font-sans'>
											<span className='font-bold'>Overview : </span>
											<br />
											{data.overview}
										</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='pt-32 pb-16 flex justify-center items-center'>
						<div className='bg-white/60 border-2 border-slate-800 w-3/4 flex flex-col justify-center items-center space-y-8 p-8 rounded-md'>
							<div className='text-4xl font-sans font-bold text-black'>Trailer</div>
							<iframe
								key={data.videos.results[0].key}
								className='w-full h-[25vh] sm:h-[70vh]'
								src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
								title={data.title}
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullscreen='true'
							/>
						</div>
					</div>
				</div>
			)}
			<div className='h-auto flex flex-col justify-center items-center'>
				<h1 className='font-bold font-sans text-4xl my-12 text-white'>Similar Movies</h1>
				<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-5 gap-16 md:gap-5'>
					{similar.map((item, index) => {
						return (
							<div key={index} className='bg-slate-300 flex flex-col justify-center items-center'>
								<img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className='w-full h-full' />
								<h1 className='text-center m-5 text-xl font-bold font-sans cursor-pointer' onClick={() => alert('on development')}>
									{item.title}
								</h1>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export default withRouter(Detail);
