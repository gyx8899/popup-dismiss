import PopupDismiss from '../index';

let instance = null;

describe('Class test', () => {
	beforeAll(() => {
		instance = new PopupDismiss();
	});

	it('Class: toString', () => {
		expect(instance.name.toString()).toEqual(instance.name);
	});
});
