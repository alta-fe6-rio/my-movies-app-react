/** @format */

import MovieLoading from '../components/MovieLoading';
import { MovieCard } from '../components/MovieCard';
import Genres from '../components/Genres';
import React, { useState, useEffect } from 'react';
import { withRouter } from '../utils/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { reduxAction } from '../utils/redux/action/action';
import Swal from 'sweetalert2';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

const Homepage = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [genres, setGenres] = useState([]);
	const [popular, setPopular] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		fetchData()
		getMovieGenres()
		getPopularMovies();
	}, []);

	function getPopularMovies() {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&limit=5&language=en-US`)
    .then((res) => {
      const popular = res.data.results.slice(0, 10);
      setPopular(popular)
			console.log(popular)
    })
    .catch((err) => alert(err.toString()))
  }

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

	function getMovieGenres() {
		axios
		.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
		.then((res) => {
			const genreMap = res.data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      setGenres(genreMap);
		})
		.catch((err) => alert(err.toString()))
	}
	const handleSearch = (e) => {
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

	const getGenreNames = (genreIds) => {
    return genreIds.map(id => genres[id]).join(', ');
  };

	return (
		<Layout onKeyDown={(e) => handleSearch(e)}>
			<div className="w-full">
				<Carousel autoSlide={true} autoSlideInterval={3000}>
      {popular && popular.map((slide) => (
        <div key={slide.id} className="w-full flex-shrink-0 relative">
          <img
            src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
            alt={slide.original_title}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col text-white mt-10 mx-[5vw] w-[75vw] space-y-7">
            <h2 className="text-2xl font-bold">{slide.original_title}</h2>
						<p>Release Date : {slide.release_date}</p>
            <p className="mt-2">Genres: {getGenreNames(slide.genre_ids)}</p>
						<div>
							<p className='text-2xl'>Description :</p>
							<p className="mt-2">{slide.overview}</p>
							<button className='my-10' onClick={() => navigate(`movie/${slide.id}`)}>Watch Now</button>
						</div>
          </div>
        </div>
      ))}
    </Carousel>
			</div>
			{/* <div className='w-full h-[50vh] mt-[5vh] mb-[5%] grid grid-flow-row auto-rows-max grid-cols-10 gap-6 px-[2vw]'>
				{genres &&
					genres.map((item, index) => <Genres key={index} name={item.name} />)}
			</div> */}
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
