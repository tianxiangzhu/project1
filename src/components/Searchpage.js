import React from 'react';
import {
    Link,
    Redirect
  } from "react-router-dom";
import data from "../database/data";
  class Searchpage extends React.Component{
    constructor(props){
        super(props)
        this.state = {searchtext:"",businesses:[], showbusiness: false, city:"", state: ""}
        
    }
    onSubmit = (event) => {
        this.setState({showbusiness: true}) 
        event.preventDefault();
    }
    livesearch = (event) => {
        const text = event.target.value;
        this.setState({searchtext: text})
        if (text == '')
        {
            this.setState({businesses: []})
            return 
        }
         data.findbusinesses(text,this.state.city,this.state.state).then(x => x.json())
         .then(b =>{console.log("bussiness",b);this.setState({businesses:b})})
         .catch(e => console.log("Failed",e))
    }

    citysearch = (event) => {
        const text = event.target.value;
        this.setState({ city: text,});
    }
    statesearch =  (event) => {
        const text = event.target.value;
        this.setState({ state: text,});
    }

    delete = (event) => {
        data.deletebusiness(event.target.getAttribute("business"))
        this.forceUpdate()
    }
    
    render(){
        const buslist= this.state.businesses.filter(b => b.active)
        const busdiv= buslist.map(
            (b) => <div>
                {b.name},{b.address}, {b.city}, {b.state} {b.zip}, {b.phone}   (
                <Link
                    to={{
                    pathname: "/update",
                    state: { id: b.id }
                }}
             >Update</Link>
             <a  onClick={this.delete} business= {b.id} >Delete</a>)
            </div>
        )
        
        
        if (this.state.showbusiness) {
            const bs = buslist.map(b => b.id)
            let to= {pathname: '/business', state: { bs: bs } };
            return (
                <Redirect to={to} />
            );

        }

        
        return(
        <div>
                <form onSubmit={this.onSubmit}>
                    <p>Where is your location?</p>
                    <input
                        type="text"
                        value={this.state.searchcity}
                        placeholder = "City"
                        onChange={this.citysearch}
                        required
                    ></input>
                    <br></br>
                    <input
                        type="text"
                        value={this.state.searchstate}
                        placeholder = "State"
                        onChange={this.statesearch}
                        required
                    ></input>
                    
                    <br/>
                    <p>Looking for something?</p>
                    <input
                        type="text"
                        value={this.state.searchtext}
                        placeholder = "Keywords for searching"
                        onChange={this.livesearch}
                        required
                    ></input><br></br><br></br>
                    <button type="submit">Go see reviews</button>
                </form>
                <br></br>
                <h4>Here are what you might be looking for: </h4>
                {busdiv}
                <hr></hr>

        </div>
        )
    }
}
export default Searchpage;
