import React from 'react';
import { useDropzone } from 'react-dropzone';
import './Dropzone.css';

const Dropzone = ({ onDrop, accept }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, 
        accept
    });

return(
    <div className="dropzone-container">
        <div className='dropzone-contents' {...getRootProps()}>
            <input className='dropzone-input' {...getInputProps()}/>
            <div className='text-center'>
                {isDragActive ? (
                    <p className='dropzone-content'>Release to drop the files here</p>
                ) :
                (
                    <p className='dropzone-content'>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
        </div>
    </div>
);
};

export default Dropzone; 
