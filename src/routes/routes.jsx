/** @format */

import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Favorites from '../pages/Favorites';
import HotMovies from '../pages/HotMovies';
import Detail from '../pages/Detail';
import NotFound from '../pages/404';
import { ThemeContext } from '../utils/context';
import { useDispatch } from 'react-redux';
import { reduxAction } from '../utils/redux/action/action';

const RoutesApp = () => {
	const dispatch = useDispatch();
	const [theme, setTheme] = useState('light');
	const background = useMemo(() => ({ theme, setTheme }), [theme]);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});

	useEffect(() => {
		const tempLocal = localStorage.getItem('favMovie');
		if (tempLocal) {
			dispatch(reduxAction('SET_FAVORITES', JSON.parse(tempLocal)));
		}
	}, []);

	return (
		<ThemeContext.Provider value={background}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/movie/:movie_id' element={<Detail />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/hot-movies' element={<HotMovies />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ThemeContext.Provider>
	);
};

export default RoutesApp;
