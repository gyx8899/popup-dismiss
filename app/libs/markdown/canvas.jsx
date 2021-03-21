import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import marked from 'marked';
import { transform } from 'babel-standalone';

import Editor from '../editor';

export default class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.playerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
		this.document = props.children.match(/([^]*)\n?(```[^]+```)/);
		this.description = marked(this.document[1]);
		this.source = this.document[2].match(/```(.*)\n?([^]+)```/);
		this.state = {
			showBlock: false,
		};
	}

	componentDidMount() {
		this.renderSource(this.source[2]);
	}

	blockControl() {
		this.setState((prevState) => ({ showBlock: !prevState.showBlock }));
	}

	renderSource(value) {
		import('../../../src')
			.then((Element) => {
				const args = ['context', 'React', 'ReactDOM'];
				const argv = [this, React, ReactDOM];
				Object.keys(Element).forEach((key) => {
					args.push(key);
					argv.push(Element[key]);
				});
				return {
					args,
					argv,
				};
			})
			.then(({ args, argv }) => {
				let code;
				if (value.match(/render\((.+)\)/)) {
					code = transform(
						value.replace(
							/render\(<(.+)\/>\)/,
							`ReactDOM.render(<$1 {...context.props} />, document.getElementById('${this.playerId}'))`
						),
						{
							presets: ['es2015', 'react'],
						}
					).code;
				} else {
					code = transform(
						`
              class Demo extends React.Component {
                  ${value}
              }
              ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))`,
						{
							presets: ['es2015', 'react'],
						}
					).code;
				}
				args.push(code);
				// eslint-disable-next-line no-new,no-new-func,prefer-spread
				new Function(...args).apply(null, argv);
				this.source[2] = value;
			})
			.catch((err) => {
				if (process.env.NODE_ENV !== 'production') {
					throw err;
				}
			});
	}

	render() {
		const { name, locale } = this.props;
		const { showBlock } = this.state;
		return (
			<div className={`demo-block demo-box demo-${name}`}>
				<div className="source" id={this.playerId}>
					{showBlock && (
						<div className="meta">
							{this.description && (
								<div
									className="description"
									dangerouslySetInnerHTML={{
										__html: this.description,
									}}
								/>
							)}
							<Editor
								value={this.source[2]}
								onChange={(code) => this.renderSource(code)}
							/>
						</div>
					)}
				</div>
				<div
					className="demo-block-control"
					onClick={() => this.blockControl()}
				>
					{showBlock ? (
						<span>
							<i className="el-icon-caret-top" />
							{locale.hide}
						</span>
					) : (
						<span>
							<i className="el-icon-caret-bottom" />
							{locale.show}
						</span>
					)}
				</div>
			</div>
		);
	}
}
Canvas.propTypes = {
	name: PropTypes.string,
	locale: PropTypes.object,
};
