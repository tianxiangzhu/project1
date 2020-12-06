let businesses = [
    {id : 0 , active : true, name:"Vero Amore - Swan",
    address:"2920 N Swan Rd",city: "Tucson",state: "AZ", zip:"85712", phone:"(520)325-4122",
    reviews: []},

    {id : 1 ,active : true, name:"The Parish",
    address:"6453 N Oracle Rd", city: "Tucson", state: "AZ", zip:"85704", phone:"(520)797-1233", 
    reviews: []},

    {id : 2,active : true, name:"Noodleholics",
    address:"3502 E Grant Rd", city:"Tucson", state:"AZ", zip:"85716", phone:"(520)305-4262",
    reviews: ["My favourite noodle restaurant"]},

    {id : 3,active : true, name:"Holy Smokin Butts BBQ",
    address:"454 W Grant Rd", city:"Tucson", state:"AZ", zip:"85710", phone:"(520)329-3088",
    reviews: ["Love their meat"]}
]
function strinc (str,inc){
    return (
    str.toLowerCase().includes(inc.toLowerCase())
    )
}
const services = {
    findbusinesses:(text,city,state) => {
        const api = `http://localhost:3000/search/${text}/${city},${state}`
        return fetch(api)
        if (text == ""){
            return []
        }
        let x = businesses.filter(b => strinc(b.name,text) && strinc(b.city,city) && strinc(b.state,state))
        if (x){
            return x
        }
        else{
            return []
        }
    
    },
    addbusiness:(business) => {
        const api = `http://localhost:3000/place`
        fetch(api,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(business)}
        ).catch(e => console.log("Error",e))
    },
    updatebusiness:(business) => {
        business.update = true
        services.addbusiness(business)
    },
    deletebusiness:(id) => {
        businesses[id].active = false
    }
    ,
    allbusinesses:() => {
        const api = "http://localhost:3000/places"
        return fetch(api)
       
    },
    businessbyid:(id) => {
        return businesses[id]
    },
    addreview:(id,review) => {
        console.log("addreview",id,review)
        const b = businesses[id]
        b.reviews.push(review)
    }
}
export default services;
