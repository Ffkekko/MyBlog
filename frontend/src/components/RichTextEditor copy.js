/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable vars-on-top */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line max-classes-per-file
import React, { useState } from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromRaw, convertFromHTML, ContentState, draftToHtml, convertToRaw} from 'draft-js';
import "./RichText.css"
import 'draft-js/dist/Draft.css';

export default function RichTextEditor(props) {

    const paragraph=props.paragraph;

    const blocksFromHTML = convertFromHTML(paragraph);

    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );

    const [editorState, setEditorState] = React.useState(
      () => EditorState.createWithContent(state),
    );


  /*  const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());     
      const HtmlContent = draftToHtml(rawContentState);  */

  /* JSON.stringify(
    convertToRaw(this.state.editorState.getCurrentContent()),
      null,
      "  "
  ) */

    focus = () => refs.editor.focus();
  
    /* this.onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    this.setState({
      editorState,
    });
  } */

    handleKeyCommand = _handleKeyCommand.bind(this);
    mapKeyToEditorCommand = _mapKeyToEditorCommand.bind(this);
    toggleBlockType = _toggleBlockType.bind(this);
    toggleInlineStyle = _toggleInlineStyle.bind(this);
  

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }

  const _mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== state.editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  const _toggleBlockType = (blockType) => {
    onChange(
      RichUtils.toggleBlockType(
        state.editorState,
        blockType
      )
    );
  }

  const _toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        state.editorState,
        inlineStyle
      )
    );
  }

  
    const {editorState} = state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <div className={className} onClick={focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={setEditorState}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
          
        </div>
      </div>
    );
  
}



// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line no-var
var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        // eslint-disable-next-line react/jsx-wrap-multilines
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};