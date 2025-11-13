const mongoose=require('mongoose');


const database=async()=>
{
    try {
        await mongoose.connect('mongodb://localhost:27017/awp').then(()=>
console.log("connected"));
    } catch (error) {
        console.log("fail to connect");
    }

}
module.exports=database;
