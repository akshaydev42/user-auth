const formateDate = (date)=>{
const dateObject = new Date(date)
if(Number.isNaN(dateObject.getTime())){
    return "Invalid Date"
}
return dateObject.toLocaleDateString("en-US",{
    year: "numeric",
    month: "long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric"
})
}

export default formateDate