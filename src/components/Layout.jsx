/** @format */

import React from 'react';
import Header from './Header';

const Layout = (props) => {
	return (
		<div className='w-full h-screen bg-slate-700 flex flex-col'>
			<Header />
			<div className='h-full overflow-auto'>{props.children}</div>
		</div>
	);
};

export default Layout;
