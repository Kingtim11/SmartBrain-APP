import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
    <div>
        <Tilt>
            <div className="Tilt ma4 mt0 br2 shadow-2" style={{ height: '100px', width: '100px' }}>
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px'}} alt='Logo' src={brain} />
                </div>
            </div>
        </Tilt>
    </div>
    )
}

export default Logo;