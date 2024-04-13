import mongoose from "mongoose";

interface Subscribe{
    email :String
}

const subscribeSchema = new mongoose.Schema<Subscribe>({
 
    email : {type : String},
   
    
})

const SubscribeModule = module.exports = mongoose.model("subscribe",subscribeSchema)
export default SubscribeModule