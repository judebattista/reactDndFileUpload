import React, { useCallback } from 'react';
import Dropzone from '../Dropzone/Dropzone';
import './App.css';

function App() {
    const onDrop = useCallback(aceptedFiles => {
        console.log(acceptedFiles);
    }, []);

    return (
        <main className='App'>
            <h1 className='text-center'>Drag and Drop Example</h1>
            <Dropzone onDrop={onDrop} accept={'image/*'}/>
        </main>
    );
}

export default App;