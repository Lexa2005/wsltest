import { UserController } from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "post", 
    route: "/auth",
    controller: UserController,
    action: "authenticate"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}];