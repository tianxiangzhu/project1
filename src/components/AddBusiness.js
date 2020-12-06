import React from 'react';
import {Redirect} from "react-router-dom";
import data from "../database/data"
import "../style.css";


export default class AddBusiness extends React.Component{
    constructor(props){
        super(props)
        
        this.state ={finished: false, username:"",name: "",
            address: "",city: "",state:"",zip:"", phone: ""}
        if (props.update){
            this.state.update = true
            const id = props.location.state.id
            const p = data.allbusinesses()[id]
            this.state.username = p.username
            this.state.id = p.id
            this.state.name = p.name
            this.state.address = p.address
            this.state.city = p.city
            this.state.state = p.state
            this.state.zip = p.zip
            this.state.phone = p.phone
            this.state.active = p.active
        }
    }
onInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }
onSubmit = (event) => {
        this.setState({finished: true})
        const state = this.state
        const p = {id : state.id, username:state.username, name:state.name, active:state.active , address:state.address, city:state.city, state:state.state, zip:state.zip, phone:state.phone}
        if (this.state.update){
            data.updatebusiness(p)
        }
        else {
        data.addbusiness(p)
        }
        event.preventDefault();
    }

render(){
    let from = {pathname: '/', 
    state:{user: this.state.username}}
    if (this.state.finished){
        return (
            <Redirect to={from} />
        );
    }
    return (
        <div className="container">
            {this.state.update ? "": <div className="title"><h3>What you want to add today?</h3></div>}
            <br></br>
            <form onSubmit={this.onSubmit} className="questions">
                <label>User Name:</label>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder = "Same as login name"
                    onChange={this.onInputChange}
                    required
                ></input><br></br><br></br>
                <label>Bussiness Name:</label>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onInputChange}
                ></input><br></br><br></br>
            <label>Address:</label>
            <input
                type="text"
                name="address"
                value={this.state.address}
                placeholder = "Address"
                onChange={this.onInputChange}
            ></input>
            <input
                type="text"
                name="city"
                value={this.state.city}
                placeholder = "City"
                onChange={this.onInputChange}
            ></input>
            <input
                type="text"
                name="state"
                value={this.state.state}
                placeholder = "State"
                onChange={this.onInputChange}
            ></input>
            <input
                type="text"
                name="zip"
                value={this.state.zip}
                placeholder = "Zip"
                onChange={this.onInputChange}
            ></input><br></br><br></br>
            <label>Phone Number:</label>
            <input
                type="number"
                name="phone"
                value={this.state.phone}
                placeholder = "Number only"
                onChange={this.onInputChange}
            ></input><br></br><br></br>
            <button type="submit">Change</button>
    
        </form>
    </div>
    )
    
}
}