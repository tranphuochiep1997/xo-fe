import React from 'react';
import './index.css';
import DrawGrid from './DrawGrid';

function Draw() {
    return (
        <div className='draw'>
            <DrawGrid edge={27}/>
        </div>
    );
}

export default Draw;