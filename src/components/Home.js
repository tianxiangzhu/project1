import React from 'react';
import {Link} from "react-router-dom";
import Searchpage from "./Searchpage"
import "../style.css";
import p1 from "../image/croissant.jpg";
import p2 from "../image/fruit.jpg";
import p3 from "../image/milkshake.jpg";
import p4 from "../image/pie.jpg"

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {showLoginForm: true}
    }
    
    login = ()=>{
        this.setState({showLoginForm: false}) 
    }
    render(){
       
       let username = '';
        const location = this.props.location;
        if (location) {
            if (location.state) {
                if (location.state.user) {
                    username = location.state.user;
                }
            }
        }

        return (
            
            <div className="container">
                <div className="title">
                {username.length > 0 ? username
                    : <Link to='/login'>Login</Link>}
                </div>
                <h3><Link to='/add'>Add more</Link></h3>
                <div className="question">
                    <Searchpage/>
                </div>
                <br></br>
                <table>
                    <tr>
                        <td><img src={p3}></img></td>
                        <td><img src={p2}></img></td>
                        <td><img src={p1}></img></td>
                        <td><img src={p4}></img></td>
                    </tr>
                </table>
            </div>
        )
    }
}


export default Home;