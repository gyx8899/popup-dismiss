import Event from '@daybyday/event';
import { addClass, removeClass } from './ClassName';
import {
	findParent,
	hasClosest,
	getSelectorsElements,
	extendOnOff,
	getElements,
} from './util';

class PopupDismiss extends Event {
	constructor(elements, isDelegated = false) {
		// Event constructor
		super();

		this.name = 'popupDismiss';
		this.isTap = undefined;
		this.isDelegated = isDelegated;
		this.attr = {
			dataToggle: 'data-toggle',
			dataTarget: 'data-target',
			dataTargetParent: 'data-target-parent',
			dataDismissScope: 'data-dismiss-scope',
			dataToggleClass: 'data-toggle-class',
			dataPopupHandler: 'data-popup-handler',
			dataDismissHandler: 'data-dismiss-handler',
			dataIsPopup: 'data-isPopup',
			dataPopupDismiss: 'data-popup-dismiss',
		};
		this._elements = elements;
		this.popupEvent = this.popupEvent.bind(this);

		if (elements === undefined) {
			this.isDelegated = true;
			this.elements = [document.body];
		} else {
			this.elements = getElements(elements);
		}
		[].forEach.call(this.elements, (element) => this.initElement(element));
	}

	initElement(element) {
		if (
			(this.isDelegated ||
				element.getAttribute(this.attr.dataToggle) === this.name) &&
			element.getAttribute(`data-${this.name}`) !== this.name
		) {
			element.setAttribute(`data-${this.name}`, this.name);
			element.addEventListener('click', this.popupEvent);
		}
	}

	popupTarget(dataTarget, triggerElement, dataTargetParent) {
		let targetElement = null;
		if (!!dataTargetParent) {
			let commonParent = findParent(triggerElement, dataTargetParent);
			if (commonParent) {
				targetElement = commonParent.querySelector(dataTarget);
			}
		} else if (dataTarget === 'parent') {
			targetElement = triggerElement.parentNode;
		} else {
			targetElement = document.querySelector(dataTarget);
		}
		return targetElement;
	}

	popupEvent(event) {
		let popupTrigger = event.target,
			that = this;
		if (popupTrigger.getAttribute(this.attr.dataToggle) !== this.name) {
			popupTrigger = findParent(
				popupTrigger,
				`[${this.attr.dataToggle}="${this.name}"]`
			);
		}
		if (!popupTrigger) {
			return;
		}
		let dataDismissScope = popupTrigger.getAttribute(
				this.attr.dataDismissScope
			),
			dismissScopes = getSelectorsElements(dataDismissScope),
			eventData = {
				type: event.type,
				namespace:
					popupTrigger.getAttribute(this.attr.dataTarget) +
					'-' +
					new Date().getTime(),
				popupTrigger: popupTrigger,
				popupTarget: this.popupTarget(
					popupTrigger.getAttribute(this.attr.dataTarget),
					popupTrigger,
					popupTrigger.getAttribute(this.attr.dataTargetParent)
				),
				toggledClass:
					popupTrigger.getAttribute(this.attr.dataToggleClass) ||
					null, // Recommend: 'open'
				popupHandler:
					popupTrigger.getAttribute(this.attr.dataPopupHandler) ||
					null,
				dismissHandler:
					popupTrigger.getAttribute(this.attr.dataDismissHandler) ||
					null,
				dismissScopes: dismissScopes,
			};

		if (
			eventData.popupTarget.getAttribute(this.attr.dataIsPopup) !== 'true'
		) {
			this.monitorTap();
			if (eventData.toggledClass) {
				addClass(eventData.popupTrigger, eventData.toggledClass);
				addClass(eventData.popupTarget, eventData.toggledClass);
			}
			eventData.popupTarget.setAttribute(this.attr.dataIsPopup, 'true');
			eventData.dismissScopes.forEach((scope) => {
				extendOnOff(scope).on(
					`${eventData.type}.${eventData.namespace}`,
					(newEvent) => {
						if (event === newEvent) return;
						let newEventData = {
							type: eventData.type,
							namespace: eventData.namespace,
							dismissTrigger: newEvent.target,
							popupTrigger: eventData.popupTrigger,
							popupTarget: eventData.popupTarget,
							toggledClass: eventData.toggledClass,
							dismissHandler: eventData.dismissHandler,
							dismissScopes: eventData.dismissScopes,
						};
						that.dismiss(newEventData, true);
					}
				);
			});

			this._eventHandler(eventData.popupHandler, eventData.popupTarget);

			PopupDismiss.setBodyCursorInIOS('pointer');
		} else {
			eventData.dismissTrigger = popupTrigger;
			that.dismiss(eventData);
		}
	}

	dismiss(eventData, isTrigger) {
		if (this.isTap === false) return;

		if (
			!isTrigger ||
			(!hasClosest(eventData.dismissTrigger, eventData.popupTrigger) &&
				this.isDismissTrigger(
					eventData.dismissTrigger,
					eventData.popupTarget
				) &&
				eventData.popupTarget.getAttribute(this.attr.dataIsPopup) ===
					'true')
		) {
			if (eventData.toggledClass) {
				removeClass(eventData.popupTrigger, eventData.toggledClass);
				removeClass(eventData.popupTarget, eventData.toggledClass);
			}
			eventData.popupTarget.setAttribute(this.attr.dataIsPopup, 'false');
			eventData.dismissScopes.forEach((scope) => {
				scope.off(`${eventData.type}.${eventData.namespace}`, () =>
					this.dismiss(eventData, true)
				);
			});

			this._eventHandler(eventData.dismissHandler, eventData.popupTarget);

			PopupDismiss.setBodyCursorInIOS('default');
		}
	}

	monitorTap() {
		let that = this,
			start = {},
			end = {};
		this.isTap = undefined;

		document.body.addEventListener('mousedown', mouseDown);
		document.body.addEventListener('mouseup', mouseUp);

		function mouseDown(event) {
			that.isTap = false;
			start.x = event.pageX;
			start.y = event.pageY;
		}

		function mouseUp(event) {
			end.x = event.pageX;
			end.y = event.pageY;

			if (
				Math.abs(end.x - start.x) < 5 &&
				Math.abs(end.y - start.y) < 5
			) {
				that.isTap = true;
				document.body.removeEventListener('mousedown', mouseDown);
				document.body.removeEventListener('mouseup', mouseUp);
			}
		}
	}

	// Default: all be dismiss trigger(return true);
	// Check click point ($child) has '[data-popup-dismiss="false"]'('[data-popup-dismiss="true"]') or not;
	isDismissTrigger(child, parent) {
		if (hasClosest(child, parent)) {
			let dataPopupDismiss = child.getAttribute(
					this.attr.dataPopupDismiss
				),
				parentDismissFalse;
			if (dataPopupDismiss === 'false' || dataPopupDismiss === 'true') {
				return dataPopupDismiss === 'true';
			} else if (
				(parentDismissFalse = findParent(
					child,
					`[${this.attr.dataPopupDismiss}="false"]`
				))
			) {
				let parentDismissTrue = findParent(
					child,
					`[${this.attr.dataPopupDismiss}="true"]`
				);
				return parentDismissTrue
					? hasClosest(parentDismissTrue, parentDismissFalse)
					: false;
			}
		}
		return true;
	}

	destroy() {
		[].forEach.call(this.elements, (element) => {
			delete element[`data-${this.name}`];
			element.removeEventListener('click', this.popupEvent);
		});

		super.destroy();
	}

	_eventHandler(eventName, targetElement) {
		if (eventName !== null) {
			if (eventName in window) {
				window[eventName](targetElement);
			} else {
				this.trigger(eventName, targetElement);
			}
		}
	}

	// Fix issue : In iOS device, the dismiss function could not be triggered;
	static setBodyCursorInIOS(val) {
		if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
			let body = document.querySelector('body'),
				popupCount = parseInt(
					body.getAttribute('popup-count') || '0',
					10
				);
			if (val === 'pointer') {
				++popupCount === 1 && (body.style.cursor = val);
			} else if (val === 'default') {
				--popupCount && (body.style.cursor = val);
			}
			body.setAttribute('popup-count', popupCount.toString());
		}
	}
}

export default PopupDismiss;
