/** @format */

import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Favorites from '../pages/Favorites';
import HotMovies from '../pages/HotMovies';
import Detail from '../pages/Detail';
import NotFound from '../pages/404';

export default class RoutesApp extends Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/movie/:movie_id' element={<Detail />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/hot-movies' element={<HotMovies />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		);
	}
}
