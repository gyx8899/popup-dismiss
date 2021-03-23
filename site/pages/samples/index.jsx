import React, { useEffect } from 'react';
import PopupDismiss from '../../../src/index';

import './index.scss';

function Samples() {
	useEffect(() => {
		initColor();
		window.popup = new PopupDismiss();
		window.popupHandler = function () {
			outputTextArea('Popup handler triggering...');
		};

		window.dismissHandler = function () {
			outputTextArea('Dismiss handler triggering...');
		};

		function outputTextArea(output) {
			$('#eventLog').text(
				$('#eventLog').text() +
					'\n' +
					new Date().toLocaleTimeString() +
					' -- ' +
					output
			);
			var textarea = document.getElementById('eventLog');
			textarea.scrollTop = textarea.scrollHeight;
		}

		window.popupList = function ($target) {
			//		$($target) && $($target).fadeIn();
			$($target) && $($target).css('display', 'block');
		};

		window.dismissList = function ($target) {
			//		$($target) && $($target).fadeOut();
			$($target) && $($target).css('display', 'none');
		};

		function initColor() {
			$('[data-popup-dismiss="false"]').addClass('dismiss-false');
			$('[data-popup-dismiss="true"]').addClass('dismiss-true');
		}
	}, []);

	return (
		<div className="Sample">
			<div
				data-toggle="previewCode"
				data-target="#demoWrap"
				data-collapse="on"
			>
				<section>
					<h3>
						Demo1:{' '}
						<p>
							data-toggle="<b>popupDismiss</b>" data-target="
							<b>#demo1List</b>" data-toggle-class="open"
						</p>
					</h3>
					<div
						className="trigger-parent"
						data-toggle="popupDismiss"
						data-target="#demo1List"
						data-toggle-class="open"
					>
						toggle popup
					</div>
					<ul id="demo1List" className="popup-list">
						<li>Demo1 popup list1</li>
						<li data-popup-dismiss="false">
							Demo1 popup list2, data-popup-dismiss="false"
						</li>
						<li>Demo1 popup list3</li>
						<li>Demo1 popup list4</li>
						<li>
							<div
								className="trigger-parent"
								data-toggle="popupDismiss"
								data-target="#demo11List"
								data-toggle-class="open"
								data-popup-dismiss="false"
							>
								Demo1 SubSelector, data-popup-dismiss="false"
							</div>
							<ul
								id="demo11List"
								className="popup-list"
								data-popup-dismiss="true"
							>
								SubList1-parent : data-popup-dismiss="true"
								<li data-popup-dismiss="false">
									SubList110 data-popup-dismiss="false"
									<span>(no data-) SubList111 </span>{' '}
									<span>(no data-) SubList112 </span>
								</li>
								<li data-popup-dismiss="false">
									SubList12, data-popup-dismiss="false"
								</li>
								<li>SubList13</li>
							</ul>
						</li>
						<li>Demo1 popup list6</li>
						<li>
							<div
								className="trigger-parent"
								data-toggle="popupDismiss"
								data-target="#demo12List"
								data-toggle-class="open"
								data-popup-dismiss="false"
							>
								Demo1 SubSelector, data-popup-dismiss="false"
							</div>
							<ul
								id="demo12List"
								className="popup-list"
								data-popup-dismiss="false"
							>
								SubList2-parent : data-popup-dismiss="false"
								<li data-popup-dismiss="true">
									SubList210 data-popup-dismiss="true"{' '}
									<span>(no data-)SubList211</span>
									<span>(no data-)SubList212</span>
								</li>
								<li data-popup-dismiss="true">
									SubList22, data-popup-dismiss="true"
								</li>
								<li>SubList23</li>
							</ul>
						</li>
						<li>Demo1 popup list8</li>
					</ul>
				</section>
				<section>
					<h3>
						Demo2:{' '}
						<p>
							data-toggle="<b>popupDismiss</b>" data-target="
							<b>#demo2List</b>" data-toggle-class="open"
							data-popup-handler="popupHandler"
							data-dismiss-handler="dismissHandler"
						</p>
					</h3>
					<textarea id="eventLog"></textarea>
					<button
						className="trigger-parent"
						data-toggle="popupDismiss"
						data-target="#demo2List"
						data-toggle-class="open"
						data-popup-handler="popupHandler"
						data-dismiss-handler="dismissHandler"
					>
						toggle popup
					</button>
					<ul id="demo2List" className="popup-list">
						<li>Demo2 popup list1</li>
						<li>Demo2 popup list2</li>
						<li>Demo2 popup list3</li>
						<li data-popup-dismiss="false">
							Demo2 popup list4, data-popup-dismiss="false"
						</li>
						<li data-popup-dismiss="false">
							Demo2 popup list5, data-popup-dismiss="false"
						</li>
					</ul>
				</section>
				<section className="demo4-scope">
					<h3>
						Demo3:{' '}
						<p>
							data-toggle="<b>popupDismiss</b>" data-target="
							<b>#demo3List</b>" data-popup-handler="popupList"
							data-dismiss-handler="dismissList"
						</p>
					</h3>
					<button
						id="tapId"
						className="trigger-parent"
						data-toggle="popupDismiss"
						data-target="#demo3List"
						data-popup-handler="popupList"
						data-dismiss-handler="dismissList"
					>
						toggle popup
					</button>
					<ul id="demo3List" className="popup-list">
						<li>Demo3 popup list1</li>
						<li>Demo3 popup list2</li>
						<li>Demo3 popup list3</li>
						<li data-popup-dismiss="false">
							Demo3 popup list4, data-popup-dismiss="false"
						</li>
					</ul>
				</section>
				<section className="demo4-scope">
					<h3>
						Demo4:{' '}
						<p>
							data-toggle="<b>popupDismiss</b>" data-target="
							<b>.demo4List</b>" data-dismiss-scope=".demo4-scope"
							data-popup-handler="popupList"
							data-dismiss-handler="dismissList"
						</p>
					</h3>
					<button
						id="demo4Btn"
						className="trigger-parent"
						data-toggle="popupDismiss"
						data-target=".demo4List"
						data-dismiss-scope=".demo4-scope"
						data-popup-handler="popupList"
						data-dismiss-handler="dismissList"
					>
						toggle popup
					</button>
					<ul className="popup-list demo4List">
						<li>Demo4 popup list1</li>
						<li>Demo4 popup list2</li>
						<li>Demo4 popup list3</li>
						<li data-popup-dismiss="false">
							Demo4 popup list4, data-popup-dismiss="false"
						</li>
					</ul>
				</section>
				<section className="demo5-scope">
					<h3>
						Demo5:{' '}
						<p>
							data-toggle="<b>popupDismiss</b>" data-target="
							<b>.popup-list</b>" data-target-parent="
							<b>.popup-list-parent</b>" data-toggle-class="open"
						</p>
					</h3>
					<div className="popup-list-parent">
						<button
							id="demo51Btn"
							className="trigger-parent"
							data-toggle="popupDismiss"
							data-target=".popup-list"
							data-target-parent=".demo5-scope"
							data-toggle-class="open"
						>
							toggle popup
						</button>
						<ul className="popup-list demo51List">
							<li>Demo51 popup list1</li>
							<li>Demo51 popup list2</li>
							<li>Demo51 popup list3</li>
							<li data-popup-dismiss="false">
								Demo51 popup list51, data-popup-dismiss="false"
							</li>
						</ul>
					</div>
					<div>
						<button
							id="demo52Btn"
							className="trigger-parent"
							data-toggle="popupDismiss"
							data-target=".popup-list"
							data-target-parent="div"
							data-toggle-class="open"
						>
							toggle popup
						</button>
						<ul className="popup-list demo52List">
							<li>Demo52 popup list1</li>
							<li>Demo52 popup list2</li>
							<li>Demo52 popup list3</li>
							<li data-popup-dismiss="false">
								Demo52 popup list52, data-popup-dismiss="false"
							</li>
						</ul>
					</div>
					<div>
						<button
							id="demo53Btn"
							className="trigger-parent"
							data-toggle="popupDismiss"
							data-target=".demo53List"
							data-target-parent="div"
							data-toggle-class="open"
						>
							toggle popup
						</button>
						<ul className="dropdown-list demo53List">
							<li>Demo53 popup list1</li>
							<li>Demo53 popup list2</li>
							<li>Demo53 popup list3</li>
							<li data-popup-dismiss="false">
								Demo53 popup list53, data-popup-dismiss="false"
							</li>
						</ul>
					</div>
				</section>
			</div>
		</div>
	);
}

export default Samples;
