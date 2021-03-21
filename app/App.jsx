import React, { Suspense, useMemo } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Header from './components/header';
import SideBar from './components/sidebar';
import AppRoute from './pages/index';

const App = () => {
	return (
		<div className="app">
			<BrowserRouter>
				<Header />
				<main className="main container">
					<SideBar />
					<div className="content">
						<Suspense fallback={<div>loading...</div>}>
							<AppRoute />
						</Suspense>
					</div>
				</main>
			</BrowserRouter>
		</div>
	);
};

export default hot(App);
