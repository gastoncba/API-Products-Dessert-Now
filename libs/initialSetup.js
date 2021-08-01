const Role = require('../models/RoleModel')

const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount() 

        if (count > 0) return 

        const values = await Promise.all([
            new Role({name:'USER'}).save(),
            new Role({name:'ADMIN'}).save()
        ])

        console.log(values)
    }

    catch(e) {
        console.log(e)
    }
}

module.exports = createRoles