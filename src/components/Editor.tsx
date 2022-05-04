import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'

import { Controlled as CodeMirror } from 'react-codemirror2-react-17'

interface EditorInterface {
    name: string,
    language: string,
    value: string,
    onChange: (value: string, language: string) => void
}


const Editor: React.FC<EditorInterface> = ({ name, value, language, onChange }) => {
    const handleChange = (editor: any, data: any, value: string) => {
        onChange(value, language)
    }
    return (
        <div className='editor-container'>
            <div className='editor-title'>
                <span>{name}</span>
            </div>
            <CodeMirror
                onBeforeChange={handleChange}
                value={value}
                className='editor-codemirror'
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    lineNumbers: true,
                    theme: 'material'
                }}
            />
        </div>
    )
}

export default Editor