import Markdown from '../../libs/markdown';

export default class App extends Markdown {
	document() {
		return require('../../../README.md');
	}
}
