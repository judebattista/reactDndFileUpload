import React, { useCallback, useState } from 'react';
import Dropzone from '../Dropzone/Dropzone';
import ImageList from '../ImageList/ImageList';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import cuid from 'cuid'; //Simple library to generate unique IDs

function App() {
    // State called images using useState hooks and pass the initial 
    // value as an empty array
    const [images, setImages] = useState([]);
    
    const onDrop = useCallback(acceptedFiles => {
        // Loop through accepted files
        acceptedFiles.map( file => {
            // Initialize FileReader browser API
            const reader = new FileReader();
            // onload callback gets called after the reader reads the file data.
            reader.onload = function(e) {
                // Add the image into the state. Since FileReader reading process is async, it's
                // better to get the latest snapshot state (i.e. prevState) and update it.
                setImages(prevState => [
                    ...prevState,
                    {id: cuid(), src: e.target.result}
                ]);
            };
            reader.readAsDataURL(file);
            return file;
        });
        //console.log(acceptedFiles);
    }, []);

    return (
        <main className='App'>
            <h1 className='text-center'>Drag and Drop Example</h1>
            <Dropzone onDrop={onDrop} accept={'image/*'}/>
            <DndProvider backend={HTML5Backend}>
                <ImageList images={images} /*onUpdate={moveImage}*/ />
            </DndProvider>
        </main>
    );


}

export default App;