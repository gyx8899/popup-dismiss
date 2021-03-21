import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';

import Canvas from './canvas';

export default class Markdown extends React.Component {
	constructor(props) {
		super(props);
		this.components = new Map();
		this.renderer = new marked.Renderer();
		this.renderer.table = (header, body) =>
			`<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
	}

	componentDidMount() {
		this.renderDOM();
	}

	componentDidUpdate() {
		this.renderDOM();
	}

	renderDOM() {
		// eslint-disable-next-line no-restricted-syntax
		for (const [id, component] of this.components) {
			const div = document.getElementById(id);
			if (div instanceof HTMLElement) {
				ReactDOM.render(component, div);
			}
		}
		prism.highlightAll();
	}

	render() {
		const document = this.document().default;
		if (typeof document === 'string') {
			this.components.clear();

			const html = marked(
				document.replace(
					/:::\s?demo\s?([^]+?):::/g,
					(match, p1, offset) => {
						const id = offset.toString(36);

						this.components.set(
							id,
							React.createElement(
								Canvas,
								{
									name: this.constructor.name.toLowerCase(),
									locale: {
										show: '显示代码',
										hide: '隐藏代码',
									},
									...this.props,
								},
								p1
							)
						);

						return `<div id=${id}></div>`;
					}
				),
				{ renderer: this.renderer }
			);
			return <div dangerouslySetInnerHTML={{ __html: html }} />;
		}

		return <span />;
	}
}
