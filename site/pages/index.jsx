import React from 'react';

export default [
	{
		path: '/samples',
		exact: true,
		name: 'Samples',
		component: React.lazy(() => import('./samples')),
	},
];
