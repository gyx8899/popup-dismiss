import React from 'react';
import { render } from 'react-dom';
import App from './App';

import './styles/index.scss';

const createRoot = () => {
	const root = document.createElement('div');
	root.setAttribute('id', 'root');
	document.body.append(root);
	return root;
};

window.onload = () => {
	const root = createRoot();
	render(<App />, root);
};
