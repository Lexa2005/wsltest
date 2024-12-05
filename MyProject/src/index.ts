import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());

    Routes.forEach((route) => {
      app[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await new (route.controller as any)()[route.action](req, res, next);
          if (result !== undefined && !res.headersSent) {
            const { status = 200, ...data } = result;
            res.status(status).json(data);
          }
        } catch (error) {
          next(error);
        }
      });
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(err);
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/users");
    });
  })
  .catch((error) => console.log(error));
