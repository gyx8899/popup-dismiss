import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SiteRoute from '../../site/pages/index';

export const routes = [
	{
		path: '/readme',
		exact: true,
		name: 'Readme',
		component: React.lazy(() => import('./readme')),
	},
	...SiteRoute,
	{
		path: '/changelog',
		exact: true,
		name: 'Change log',
		component: React.lazy(() => import('./changelog')),
	},
];

const AppRoute = () => (
	<Switch>
		{routes.map((route) => (
			<Route
				key={route.name}
				exact={!!route.exact}
				path={route.path}
				render={() => <route.component />}
			/>
		))}
		{<Redirect to="readme" />}
	</Switch>
);

export default AppRoute;
