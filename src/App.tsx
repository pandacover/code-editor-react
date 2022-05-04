import React from 'react'
import Editor from './components/Editor'

interface PopUpInterface {
    show: boolean
}

const PopUp: React.FC<PopUpInterface> = ({ show }) => {
    return (
        <div className={`popup-container ${show && '.show'}`}>
            <span>You cannot save the code here, so please do not use this as your main editor or edit important files here. This editor is just to test your code or for fun in general.</span>
        </div>
    )
}


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "xml":
            return { ...state, html: action.payload }
        case "css":
            return { ...state, css: action.payload }
        case "javascript":
            return { ...state, js: action.payload }
        default:
            return state;
    }
}

const App: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, { html: '', css: '', js: '' })
    const [srcDoc, setSrcDoc] = React.useState('')
    const [alertPopUp, setAlertPopUp] = React.useState(true)


    const onChange = (value: string, language: string) => {
        dispatch({ type: language, payload: value })
    }

    const docCallback = React.useCallback(() => setSrcDoc(`
        <html>
            <body>${state.html}</body>
            <style>${state.css}</style>
            <script>${state.js}</script>
        </html>`), [state])

    React.useEffect(() => {
        const timeoutID = setTimeout(() => docCallback(), 250)
        setTimeout(() => setAlertPopUp(false), 5000)
        return () => clearTimeout(timeoutID)
    }, [docCallback, state])

    return (
        <main className='relative'>
            {alertPopUp && <PopUp show={alertPopUp} />}
            <div className='pane top-pane'>
                <Editor language='xml' name='HTML' value={state.html} onChange={onChange} />
                <Editor language='css' name='CSS' value={state.css} onChange={onChange} />
                <Editor language='javascript' name='JS' value={state.js} onChange={onChange} />
            </div>
            <div className='pane'>
                <iframe
                    srcDoc={srcDoc}
                    title='output'
                    sandbox='allow-scripts'
                    frameBorder={0}
                    width='100%'
                    height='100%'
                />
            </div>
        </main>
    )
}

export default App