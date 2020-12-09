import React from 'react';
import data from "../database/data";
import "../style.css";
import {Link} from "react-router-dom";

export default class Business extends React.Component{
    constructor(props){
        super(props)
        this.state = {ids: props.location.state.bs, reviewinp: null, reviewtext: "" }
        this.get_bus()
    }
    reviewclick = (event) =>{
        this.setState({reviewinp: event.target.getAttribute("business")})
    }
    onSubmit = (event) => {
        data.addreview(this.state.reviewinp,this.state.reviewtext)
        this.setState({reviewinp: null})
        event.preventDefault();
        this.forceUpdate()
    }
    get_bus = () => {
        data.allbusinesses().then(x => x.json())
            .then(allbs => {
                let bs = allbs.filter(b => this.state.ids.indexOf(b.id) != -1)
                this.setState({businesses: bs})
                })
    }
    reviewchange = (event) => {
        const value = event.target.value;
        this.setState({reviewtext: value})
    }
    render(){
        const bs = this.state.ids.map(data.businessbyid)
        const divs =[] 
        for (let i = 0; i < bs.length ; i++){
            const b = bs[i]
            let rdivs = []
            if (b.reviews.length === 0){
                rdivs.push(<div className="question">Oops! There are no more reviews for this bussiness</div>)
            }
            else{ 
                rdivs.push(<div className="title">Reviews</div>)
                rdivs= rdivs.concat(b.reviews.map((r) => <div> <span  style= {{
                    background: "white", border: "1"
                }}>"{r}"</span> </div>))
            }
            
            divs.push(<div>"{b.name}" in this address: {b.address}<br></br><br></br>{rdivs}<button onClick={this.reviewclick}  business= {b.id}>Add Review</button></div>)
            
        }

        return (
            <div>
            <Link to='/'>Home</Link>
            <div className="container">
            {divs}
            {this.state.reviewinp ? <form onSubmit= {this.onSubmit}> <input onChange= {this.reviewchange} type = "text" /> 
            <button type ="submit">Post</button> </form> : "" }
            </div>
            </div>
        )
    }}