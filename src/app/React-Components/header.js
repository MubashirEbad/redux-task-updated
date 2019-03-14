import React from 'react';
import logo from '../Books.jpg';
import { Link } from 'react-router-dom';
import '../Stylesheets/Main_Page_Style.css';

class Header extends React.Component{
    render(){
        return(
            <div className="header">
                <div className="header-content">
                    <Link to='/'><img src={logo} className="logo" alt="Main Logo"/> </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to='/About'><h4> About </h4></Link>
                    <br/>
                    <p> </p>
                </div>
            </div>
            
        );
    }
}

export default Header;