import Role from "../models/Role";

export const createRoles = async () => {

    try{
        const count = await Role.estimatedDocumentCount();

        //If there are already roles in the DB, do nothing.
        if (count > 0) return; 

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save()
        ]); //Executes all promises at the same time
        
        console.log (values);
    }
    catch (error){
        console.error(error);
    }

}