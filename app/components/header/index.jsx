import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { menus } from './config';

import './index.scss';

const renderHeaderItem = () =>
	useMemo(
		() =>
			menus.map(({ name, href, logoUrl, isOutSite, type }) => (
				<div key={name} className="nav-item">
					<a
						className={`type ? 'menu-' + type : ''`}
						title={name}
						href={href}
						target={isOutSite ? '_blank' : ''}
					>
						{logoUrl && (
							<img
								className="img-logo"
								src={logoUrl}
								alt={`${name} logo`}
							/>
						)}
						{!logoUrl && name}
					</a>
				</div>
			)),
		[menus]
	);

const Header = () => (
	<header>
		<nav>{renderHeaderItem()}</nav>
	</header>
);
export default Header;
