import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    id: {type: String, required:true, unique:true},
    name: {type: String, required:true},
    password: {type: String, required:true},
    psicoProfile: {type:String, required:true},
    role: {type:String, required:true}, 
    profilePic: {type: String, required:false},
    creationDate: {type: Date, default:Date.now}
})

export default model('User', UserSchema);