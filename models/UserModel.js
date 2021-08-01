const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const userSchema = new Schema( {
    name: String, 
    email: String, 
    password: String, 
    roles: [{
        ref: 'Role', //el "ref" el para hacer referencia o esta relacionado con otro modelo de datos 
        type: Schema.Types.ObjectId
    }]
}, {versionKey: false})

const User = mongoose.model('user', userSchema)

module.exports = User