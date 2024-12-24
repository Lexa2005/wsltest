import { UserController } from "./controller/UserController";
import { BookController } from "./controller/BookController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "post",
    route: "/auth",
    controller: UserController,
    action: "authenticate",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "post",
    route: "/books",
    controller: BookController,
    action: "addBook",
  },
  {
    method: "get",
    route: "/books",
    controller: BookController,
    action: "getAllBooks",
  },
  {
    method: "delete",
    route: "/books/:id",
    controller: BookController,
    action: "removeBook",
  },

  {
    method: "get",
    route: "/books/search",
    controller: BookController,
    action: "searchBooks",
  },

  {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "updateUser",
  },
];


