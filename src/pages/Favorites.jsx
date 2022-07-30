/** @format */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import Layout from '../components/Layout';
import { MovieCardFav } from '../components/MovieCard';
import { withRouter } from '../utils/navigation';
import { useDispatch } from 'react-redux';
import { reduxAction } from '../utils/redux/action/action';

import '../styles/App.css';

const Homepage = (props) => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites);
	const navigate = useNavigate();

	const RemoveFav = (index) => {
		const tempLocal = localStorage.getItem('favMovie');
		const temp = JSON.parse(tempLocal);
		temp.splice(index, 1);
		localStorage.setItem('favMovie', JSON.stringify(temp));
		dispatch(reduxAction('REMOVE_FAVORITE', temp));
		Swal.fire({
			icon: 'success',
			title: 'Success',
			html: '<p>Movies has been removed</p>' + '<p>Refresh to see the changes</p>',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	return (
		<Layout>
			<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-5 gap-16 md:gap-5'>
				{favorites.map((item, index) => (
					<MovieCardFav key={index} img={item.poster_path} title={item.title} onClickItem={() => navigate(`/movie/${item.id}`)} onClickRemove={() => RemoveFav(index)} />
				))}
			</div>
		</Layout>
	);
};

export default withRouter(Homepage);
