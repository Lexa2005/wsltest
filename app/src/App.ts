import * as express from "express"
import * as bodyParser from "body-parser"
import {NextFunction, Request, Response} from "express"
import * as cookieParser from "cookie-parser";
import * as createError from "http-errors";
import {AppDataSource} from "./configs/data-source"
import * as path from "path";
import * as cors from "cors";
import * as expressJSDocSwagger from "express-jsdoc-swagger";
import {options} from "./configs/swagger";
import Logger from "./midleware/Logger";

const Router = require("./routes/routes");
import fileUpload = require('express-fileupload');
// import * as fileUpload from 'express-fileupload';

// @ts-ignore
import RedisStore from "connect-redis"
import * as session from "express-session"
import {createClient} from "redis"
import ResponseJSON from "./midleware/Response";
import Files from "./midleware/Files";
import PrivateRoute from "./midleware/PrivateRoute";
import {getEnvironmentData} from "worker_threads";


// Initialize client.
let redisClient = createClient({
    url: 'redis://mws_redis:6379',
    password: "k6B6daVKj8n~am"
})
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "app:",
    ttl: 3600000
})

declare module 'express-session' {
    interface SessionData {
        key: string | number | object;
    }
}

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    const logger = new Logger;
    const response = new ResponseJSON;
    const fileChanger = new Files;
    const privateRoute = new PrivateRoute;


    // setup express app here
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(cors());

    // Express session
    app.use(session({
        store: redisStore,
        resave: true, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: "keyboard",
        cookie: {
            secure: false
        }
    }));

    // setup midleware
    // app.use(logger.nextAction);
    app.use(privateRoute.nextAction);
    app.use(response.nextAction);
    app.use(fileChanger.nextAction);
    app.use(fileUpload({}));
    app.use((req, res, next) => {
        res.locals = {
            ENV: req.app.get('env')
        };
        next();
    });

    // @ts-ignore
    expressJSDocSwagger(app)(options);


    // Express view engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'twig');
    app.set('twig globals', {
        env: 'production'
    });

    // todo - Routers
    app.use('/', Router);


    app.use(function (req: Request, res: Response, next: NextFunction) {
        next(createError(404));
    });

    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    // start express server
    app.listen(4000, () => {
        console.log("Express server has started on port 3000. Open http://localhost:4000 to see results")
    })


}).catch(error => console.log(error))
