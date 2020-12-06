import React from 'react';
import '../style.css';
import { Link } from "react-router-dom";

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
        };
    }

    content =()=>{
        return(
            <div className="question">Here are comments</div>
        );
    }

    render(){
        let username='';
        const location = this.props.location;
        if (location){
            if(location.state){
                if (location.state.user){
                    username = location.state.user;
                }
            }
        }
        return(
            <div className="container">
                <div className="title"><h2>Eat Nearby</h2></div>
                <div className="question">
                    {username.length > 0 ? username
                    : <Link to='/login'>Login</Link>}
                </div>
                <div>{this.content()}</div>
                <div>By Fred</div>
            </div>
        );
    }
} 

export default Content;
