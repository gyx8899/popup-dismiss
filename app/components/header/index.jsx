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
	<header className="site_container">
		{/* <h1>
			<a title={Npm.name} href={Npm.href} target="_blank">
				<img className="img-logo" src={Logo} alt="NPM logo" />
			</a>
		</h1>
		<h1>
			<a
				className="title"
				title={Github.name}
				href={Github.href}
				target="_blank"
			>
				{Github.name}
			</a>
		</h1>
		<div>
			<div>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={Author.github}
					title={Author.name}
				>
					<img className="img-profile" src={Profile} alt="author" />
				</a>
			</div>
		</div> */}
		<nav>{renderHeaderItem()}</nav>
	</header>
);
export default Header;
