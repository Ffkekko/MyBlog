import React, { Component } from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import debounce from 'lodash.debounce';

class Editor1 extends Component {
 
  saveContent = debounce((content) => {
    fetch('/api/posts', {
      method: 'GET',
      body: JSON.stringify({
        content: convertToRaw(content),
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }, 1000);

 constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    fetch('/api/post').then(val => val.json())
    .then(rawContent => {
      if (rawContent) {
        this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
      } else {
        this.setState({ editorState: EditorState.createEmpty() });
      }
    });
  }

onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  }
  
  render() {

    if (!this.state.editorState) {
      return (
        <h3 className="loading">Loading...</h3>
      );
    }

    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Editor1;