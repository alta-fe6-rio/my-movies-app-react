/** @format */

import MovieLoading from '../components/MovieLoading';
import { MovieCard } from '../components/MovieCard';
import React, { useState, useEffect } from 'react';
import { withRouter } from '../utils/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { reduxAction } from '../utils/redux/action/action';
import Swal from 'sweetalert2';

const Homepage = (props) => {
	const dispatch = useDispatch();
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

	const handleSearch = (e) => {
		console.log(e);
		if (e.keyCode === 13) {
			axios
				.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
				.then((res) => {
					const { results } = res.data;
					setData(results);
				})
				.catch((err) => alert(err.toString()));
		}
	};

	const handleFav = (item) => {
		const tempLocal = localStorage.getItem('favMovie');
		if (tempLocal) {
			const temp = JSON.parse(tempLocal);
			temp.push(item);
			localStorage.setItem('favMovie', JSON.stringify(temp));
			dispatch(reduxAction('SET_FAVORITES', temp));
		} else {
			localStorage.setItem('favMovie', JSON.stringify([item]));
			dispatch(reduxAction('SET_FAVORITES', [item]));
		}
		Swal.fire({
			icon: 'success',
			title: 'Added to favorites',
			showConfirmButton: true,
		});
	};

	return (
		<Layout onKeyDown={(e) => handleSearch(e)}>
			<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-5 gap-16 md:gap-5'>
				{loading ? <MovieLoading /> : data.map((item, index) => <MovieCard key={index} img={item.poster_path} title={item.title} onClickItem={() => navigate(`movie/${item.id}`)} onClickFav={() => handleFav(item)} item={item} />)}
			</div>
			<div className='flex py-4 w-full'>
				<button onClick={() => fetchData()} className='mx-auto text-2xl dark:text-white transition duration-500'>
					<IoIosArrowDown className='mx-auto text-5xl animate-bounce' />
				</button>
			</div>
		</Layout>
	);
};

export default withRouter(Homepage);
