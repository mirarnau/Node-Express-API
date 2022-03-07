import {Request, response, Response, Router} from 'express';

import User from '../models/User';

class PostRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    async getUsers(req: Request, res: Response) {
        const allUsers = await User.find();
        res.json(allUsers);
    }

    async getUserByName(req: Request, res: Response) {
        const userFound = await User.findOne({name: req.params.nameUser});
        res.json(userFound);
        
    }

    async addUser(req: Request, res: Response) {
        console.log(req.body);
        const {id, name, psicoProfile, role} = req.body;
        const newUser = new User({id, name, psicoProfile, role});
        await newUser.save();
        res.json('User added!');
    }

    async updateUser(req: Request, res: Response) {
        await User.findOneAndUpdate ({name: req.params.nameUser}, req.body);
        res.json('Updated!');
    }

    async deleteUser(req: Request, res: Response) {
        await User.findOneAndDelete ({name:req.params.nameUser}, req.body);
        res.json('Deleted!')

    } 

    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:nameUser', this.getUserByName);
        this.router.post('/', this.addUser);
        this.router.put('/:nameUser', this.updateUser);
        this.router.delete('/:nameUser', this.deleteUser);
    }
}

const postsRoutes = new PostRoutes();

export default postsRoutes.router;