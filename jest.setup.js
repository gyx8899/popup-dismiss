// polyfill
global.document.createRange = () => ({
	setStart: (f) => f,
	setEnd: (f) => f,
	commonAncestorContainer: {
		nodeName: 'BODY',
		ownerDocument: document,
	},
});

global.requestAnimationFrame = (cb) => {
	setTimeout(cb, 0);
};

// config
const Enzyme = require('enzyme');

const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });
