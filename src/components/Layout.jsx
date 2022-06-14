/** @format */

import React, { Component } from 'react';
import Header from './Header';

export class Layout extends Component {
	render() {
		return (
			<div className='w-full h-screen bg-slate-700 flex flex-col'>
				<Header />
				<div className='h-full overflow-auto'>{this.props.children}</div>
			</div>
		);
	}
}

export default Layout;
