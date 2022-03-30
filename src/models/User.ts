import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name: {type: String, required:true},
    age: {type: String, required:true},
    password: {type: String, required:true},
    creationDate: {type: Date, default:Date.now},
    roles: [{
        type: Schema.Types.ObjectId, ref: 'Role'
    }]
})
export default model('User', UserSchema);