const User = require('../models/UserModel')
const Role = require('../models/RoleModel')
const Joi = require('joi')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    roles: Joi.array()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

const register = async (req, res) => {

    const {error} = schemaRegister.validate(req.body) 

    if(error) {
        const alert = error.details[0].message
        return res.status(400).json({error: alert})
    }

    const {name, email, password, roles} = req.body

    //aca verificamos si el email del usuario ya fue registrado
    const emailDB = await User.findOne({email: email})
    if (emailDB) {
        return res.status(400).json({error:'Email ya registrado'})
    }
    
    //aca se encripta la password
    const increment = await bcrypt.genSalt(10)
    const passwordEncrypted = await bcrypt.hash(password, increment)

    try {
        const user = new User ({
            name: name,
            email: email, 
            password: passwordEncrypted,
        })

        //verficamos si hay roles, si no tiene le asignamos el rol de "User" común
        if(roles) {
            const foundRoles = await Role.find({name: {$in: roles}})
            if(foundRoles.length > 0) {
                user.roles = foundRoles.map(role => role._id)
                console.log(foundRoles)
            } else {
                return res.status(400).json({error:'Rol Inexistente'})
            }
        } else {
            const foundRole = await Role.findOne({name:'USER'})
            user.roles = [foundRole._id]
        }

        await user.save()

        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.TOKEN_SECRET, {expiresIn: 86400}) //24 horas
        
        res.header('auth-token', token).json({
            data: {token}
        })
    }

    catch(e) {
        res.status(400)
    }
} 


const login = async (req, res) => {

    const {error} = schemaLogin.validate(req.body) 

    if(error) {
        const alert = error.details[0].message
        return res.status(400).send(alert)
    }

    //obtenemos el email y la password del body , que hasta aqui son correctas sintacticamente.
    const {email, password} = req.body
    
    //verficamos si el usuario se encuentra registrado 
    const userDB = await User.findOne({email: email})
    if (!userDB) {
        return res.status(400).json({error:'Usuario no encontrado'})
    }

    //se verifica la constraseña 
    const validPassword = await bcrypt.compare(password, userDB.password)

    if(!validPassword) {
        return res.status(400).json({error: 'Constraseña incorrecta'})
    }

    const token = jwt.sign({
        name: userDB.name,
        id: userDB._id
    }, process.env.TOKEN_SECRET, {expiresIn: 86400}) //24 horas)
    
    res.header('auth-token', token).json({
        data: {token}
    })
}

module.exports = {
    register, 
    login
}
