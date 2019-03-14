import React from 'react';
import '../Stylesheets/LoadingIconStyle.css';
import { RingLoader } from 'react-spinners';

class LoadingIcon extends React.Component{

    render(){
        return(
            <div className="LoadingContainer">
                <RingLoader type="Rings" color="green" size={150} />
                <p> Loading... </p>
            </div>
            
        )
    }
}

export default LoadingIcon;