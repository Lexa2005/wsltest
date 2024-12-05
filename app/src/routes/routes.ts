import {NextFunction, Request, Response} from "express";
import * as express from "express";
import {readdirSync} from "fs";
import {version} from "../configs/version";
const router = express.Router();

const readModules = async () => {
    try {
        // @ts-ignore
        return readdirSync('./src/controller', { recursive: true });
    } catch (err) {
        console.error(err);
    }
}

export const Modules = async () => {
    const api_version = version.api_version;
    const controllersArray: Array<any> = [];
    const modules: any = await readModules();

    modules.forEach(item => {
        if (!item.toString().includes("Controller.ts")){
            return
        } else {
            const route: string = item.toString().replace("Controller.ts", "").toLowerCase();
            controllersArray.push(route);
        }
    })
    return controllersArray;
};
const Router = async () => {
    const modules = await Modules();


    modules.forEach(item => {
        (router as any).all(`/${item}`, (req: Request, res: Response, next: NextFunction) => {
            const controller = new(require(`./../controller/${item}Controller.ts`).default);
            const result = controller[`indexAction`](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        });
        (router as any).all(`/${item}/:action`, (req: Request, res: Response, next: NextFunction) => {
            const controller = new(require(`./../controller/${item}Controller.ts`).default);
            const result = controller[`${req.params.action}Action`](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        });
        (router as any).all(`/${item}/:action/:param`, (req: Request, res: Response, next: NextFunction) => {
            const controller = new(require(`./../controller/${item}Controller.ts`).default);
            const result = controller[`${req.params.action}Action`](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    });

    router.all("/admin", (req: Request, res: Response, next: NextFunction) => {
        const controller = new(require(`./../controller/admin/indexController.ts`).default);
        const result = controller[`indexAction`](req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
};

Router();

module.exports = router;
