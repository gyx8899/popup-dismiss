export function findParent(element, selector) {
	let matches = (el, selector) => {
		return (
			el.matches ||
			el.matchesSelector ||
			el.msMatchesSelector ||
			el.mozMatchesSelector ||
			el.webkitMatchesSelector ||
			el.oMatchesSelector
		).call(el, selector);
	};
	while ((element = element.parentElement) && !matches(element, selector)) {}
	return element;
}

export function hasClosest(el, parentElement) {
	if (el === parentElement) {
		return true;
	}
	if (parentElement === undefined) {
		return false;
	}

	let parents = [],
		p = el.parentNode;
	while (p !== parentElement && p.parentNode) {
		let o = p;
		parents.push(o);
		p = o.parentNode;
	}
	return p === parentElement;
}

export function getSelectorsElements(selectorString) {
	if (!selectorString || (selectorString && selectorString.trim() === '')) {
		return [document];
	}
	let selectorsElements = [],
		selectorsArray = selectorString.split(',').map((selectorStringItem) => {
			return selectorStringItem.trim();
		});
	selectorsArray = Util.uniqueArray(selectorsArray);
	for (let i = 0, l = selectorsArray.length; i < l; i++) {
		if (selectorsArray[i] === 'document') {
			selectorsElements.push(document);
		} else {
			let scopeNodeList = [].slice.call(
				document.querySelectorAll(selectorsArray[i])
			);
			selectorsElements = selectorsElements.concat(scopeNodeList);
		}
	}
	return selectorsElements;
}

//Extend on/off methods
export function extendOnOff(el) {
	if (el.length === 0) return null;
	let events = {
		on: function (event, callback, opts) {
			if (!this.namespaces)
				// save the namespaces on the DOM element itself
				this.namespaces = {};

			this.namespaces[event] = callback;
			let options = opts || false;

			this.addEventListener(event.split('.')[0], callback, options);
			return this;
		},
		off: function (event) {
			this.removeEventListener(
				event.split('.')[0],
				this.namespaces[event]
			);
			delete this.namespaces[event];
			return this;
		},
	};

	// Extend the DOM with these above custom methods
	if (!el.isExtendOnOff) {
		el.on = Element.prototype.on = events.on;
		el.off = Element.prototype.off = events.off;
		el.isExtendOnOff = true;
	}
	return el;
}

export function getElements(elements) {
	let resultElement = [];
	if (elements === undefined || elements === null) {
		resultElement = [];
	} else if (elements.jquery) {
		resultElement = elements.get();
	} else if (
		elements instanceof window.NodeList ||
		elements instanceof NodeList ||
		elements instanceof HTMLCollection
	) {
		resultElement = Array.prototype.slice.call(elements);
	} else if (Array.isArray(elements)) {
		resultElement = elements.filter(function (element) {
			return element.nodeType === 1 || element.jquery;
		});
	} else if (elements.nodeType === 1) {
		resultElement = [elements];
	} else if (typeof elements === 'string') {
		resultElement = document.querySelectorAll(elements);
	}
	return resultElement;
}
