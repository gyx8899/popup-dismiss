import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';

import 'codemirror/lib/codemirror.css';
import './index.scss';

let timeout = null;

const Editor = (props) => {
	const editor = useRef(null);
	const { onChange, value } = props;
	let cm = null;
	useEffect(() => {
		cm = CodeMirror(editor.current, {
			mode: 'jsx',
			theme: 'react',
			keyMap: 'sublime',
			viewportMargin: Infinity,
			lineNumbers: false,
			dragDrop: false,
		});
		cm.setValue(value);
		cm.on('changes', (_cm) => {
			if (onChange) {
				if (timeout) {
					clearTimeout(timeout);
				}

				timeout = setTimeout(() => {
					onChange(_cm.getValue());
				}, 300);
			}
		});
	}, []);
	return <div className="editor" ref={editor} />;
};

Editor.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string,
};

export default Editor;
