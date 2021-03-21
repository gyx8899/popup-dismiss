import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../pages';

import './index.scss';

const SideBar = () => {
	const { pathname } = useLocation();
	const renderRoutesList = () =>
		useMemo(
			() =>
				routes.map(({ name, path }) => (
					<li
						className={`nav-item ${
							pathname === path ? 'active' : ''
						}`}
						key={`${name.replace(/\s/g, '')}}`}
					>
						<Link to={path}>{name}</Link>
					</li>
				)),
			[routes, pathname]
		);

	return (
		<nav className="side-nav">
			<ul>{renderRoutesList()}</ul>
		</nav>
	);
};
export default SideBar;
