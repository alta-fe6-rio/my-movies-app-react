/** @format */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';
import { MovieCardFav } from '../components/MovieCard';
import { withRouter } from '../utils/navigation';
import Swal from 'sweetalert2';

import '../styles/App.css';

const Homepage = (props) => {
	const favorites = useSelector((state) => state.favorites);
	const navigate = useNavigate();

	const RemoveFav = () => {
		Swal.fire({
			icon: 'info',
			title: 'feature on development',
			showCloseButton: true,
		});
	};

	return (
		<Layout>
			<div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-5 gap-16 md:gap-5'>
				{favorites.map((item, index) => (
					<MovieCardFav key={index} img={item.poster_path} title={item.title} onClickItem={() => navigate(`movie/${item.id}`)} onClickRemove={() => RemoveFav()} />
				))}
			</div>
		</Layout>
	);
};

export default withRouter(Homepage);
