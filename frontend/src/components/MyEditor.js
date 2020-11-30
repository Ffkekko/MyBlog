/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
import React, { useEffect, useState }         from 'react';
import { EditorState, convertFromRaw, convertToRaw, getContentFromDataBase}  from 'draft-js';
import Editor                                         from 'draft-js-plugins-editor';
import createMarkdownShortcutsPlugin                  from 'draft-js-md-keyboard-plugin';

export default function MyEditor() {
    /* const [paragraph, setParagraph] = useState(''); */
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const mdPlugin                      = [createMarkdownShortcutsPlugin()];
    
    const loadContent = () => {
    
        // Getting content from database
        let dataBaseContent = getContentFromDataBase();
    
        // Getting content back
        let content = convertFromRaw(JSON.parse(dataBaseContent));
        
        // Setting the state
        setEditorState(EditorState.createWithContent(content));
        


    }
    const saveContent = () => {
            
        // This content can be stored on a database
        let content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            
    }


    useEffect( () => {
    
        loadContent();
    
    }, []);
    
    useEffect( () => {
        
        saveContent();
    
    }, [editorState]);
    
    
    return(
        
        <Editor
            editorState = { editorState }
            onChange = { (editorState) => setEditorState(editorState) }
            placeholder = 'Type here or press ⌘ + V to paste your content'
            plugins = { mdPlugin }
        />
    )
    
}