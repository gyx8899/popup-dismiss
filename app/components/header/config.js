import { headerMenus as customMenus } from '../../../site/components/headers/config';
import { Author, NPM, Github } from '../../../site/data';

import Logo from '../../assets/images/logo.svg';
import Profile from '../../assets/images/profile.jpg';

const headerMenus = [
	{
		href: NPM.href,
		name: NPM.name,
		logoUrl: Logo,
		isOutSite: true,
		type: '',
	},
	{
		href: Github.href,
		name: Github.name,
		isOutSite: true,
		type: 'title',
	},
	{
		href: Author.github,
		name: Author.name,
		logoUrl: Profile,
		isOutSide: true,
		type: 'profile',
	},
];

export const menus =
	customMenus && customMenus.length ? customMenus : headerMenus;
