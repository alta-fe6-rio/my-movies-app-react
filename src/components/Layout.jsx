/** @format */

import React from 'react';
import Header from './Header';
import { withRouter } from '../utils/navigation';

const Layout = (props) => {
	return (
		<div className='w-full h-screen bg-slate-100 dark:bg-slate-700 flex flex-col transition duration-500'>
			<Header onKeyDown={props.onKeyDown} />
			<div className='h-full overflow-auto'>{props.children}</div>
		</div>
	);
};

export default withRouter(Layout);
