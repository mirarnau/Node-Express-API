"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
class PostRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }
    async getUsers(req, res) {
        const allUsers = await User_1.default.find();
        res.json(allUsers);
    }
    async getUserByName(req, res) {
        const userFound = await User_1.default.findOne({ name: req.params.nameUser });
        res.json(userFound);
    }
    async addUser(req, res) {
        console.log(req.body);
        const { id, name, psicoProfile, role } = req.body;
        const newUser = new User_1.default({ id, name, psicoProfile, role });
        await newUser.save();
        res.json('User added!');
    }
    async updateUser(req, res) {
        await User_1.default.findOneAndUpdate({ name: req.params.nameUser }, req.body);
        res.json('Updated!');
    }
    async deleteUser(req, res) {
        await User_1.default.findOneAndDelete({ name: req.params.nameUser }, req.body);
        res.json('Deleted!');
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
exports.default = postsRoutes.router;
