/** @format */

import MovieLoading from '../components/MovieLoading';
import MovieCard from '../components/MovieCard';
import React, { useState, useEffect } from 'react';
import { withRouter } from '../utils/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';

const Homepage = (props) => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		fetchData();
	}, []);

	function fetchData() {
		const newPage = page + 1;
		axios
			.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
			.then((res) => {
				document.title = 'Moviely';
				const { results } = res.data;
				const movieClone = data.slice();
				movieClone.push(...results);
				setData(movieClone);
				setPage(newPage);
			})
			.catch((err) => alert(err.toString()))
			.finally(() => setLoading(false));
	}

	return (
		<Layout>
			<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-5 gap-16 md:gap-5'>
				{loading ? <MovieLoading /> : data.map((item, index) => <MovieCard key={index} img={item.poster_path} title={item.title} onClickItem={() => navigate(`movie/${item.id}`)} />)}
			</div>
			<div className='flex py-4 w-full'>
				<button onClick={() => fetchData()} className='mx-auto text-2xl dark:text-white'>
					<IoIosArrowDown className='mx-auto text-5xl animate-bounce' />
				</button>
			</div>
		</Layout>
	);
};

export default withRouter(Homepage);
