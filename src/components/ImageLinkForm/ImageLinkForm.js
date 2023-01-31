import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return (
    <div>
        <p className = 'f3'>
            {'This magic brain will detect faces in your pictures. Give it a go!'}
        </p>
    <div className = 'center'>
        <div className = 'pa4 br3 shadow-5 center form'>
            <input 
                className = 'w-70 f4 pa2 center' type = 'text' 
                onChange = {onInputChange} 
            />
            <button 
                className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple center'
                onClick = {onPictureSubmit}
            >Detect</button>
        </div>
    </div>
    </div>
    )
}

export default ImageLinkForm;