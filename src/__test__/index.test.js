import NPM from '../index';

let npm = null;

describe('NPM test', () => {
	beforeAll(() => {
		npm = new NPM();
	});

	it('NPM: toString', () => {
		expect(npm.toString()).toEqual(npm.name);
	});
});
