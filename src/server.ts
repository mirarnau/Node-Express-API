import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import postsRoutes from './routes/usersRoutes';

class Server {
    public app: express.Application;

    //The contructor will be the first code that is executed when an instance of the class is declared.
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        //MongoDB settings
        const MONGO_URI = 'mongodb://localhost/tsapi';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL)
        .then(db => console.log("DB is connected"));

        //Settings
        this.app.set('port', process.env.PORT || 3000); 
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/api/users', postsRoutes);

    }

    start() {
        this.app.listen(this.app.get('port'), () =>{
            console.log ('Server listening on port', this.app.get('port'));
        });
    }
}

const server = new Server(); 
server.start();