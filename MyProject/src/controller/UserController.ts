import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { createHash } from "crypto";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      response.status(404)
      return("unregistered user");
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    let { firstName, lastName, age, password } = request.body;
    // return 'json'

    // Проверка на существование пользователя
    const existingUser = await this.userRepository.findOne({
      where: {
        firstName,
        lastName,
      },
    });

    if (existingUser) {
      response.status(403);
      return "User already registered";
    }

    password = this.hashPassword(password);
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
      password,
    });

    await this.userRepository.save(user);

    response.status(200);
    return "User registered successfully";
  }

  async authenticate(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, password } = request.body;

    const user = await this.userRepository.findOne({
      where: { firstName, lastName },
      select: ["password"], // Выбираем только пароль
    });

    //@ts-ignore
    if (!user || !(await this.comparePassword(password))) {
      response.status(401);
      return "lol";
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      response.status(404);
      return("this user not exist");
    }

    await this.userRepository.remove(userToRemove);

    return response.send("user has been removed");
  }

  hashPassword(password: string): string {
    if (!password) {
    }

    return createHash("md5").update(password).digest("hex");
  }

  comparePassword(inputPassword: string, storedPasswordHash: string): boolean {
    const hashedInputPassword = this.hashPassword(inputPassword);
    return hashedInputPassword === storedPasswordHash;
    
  }
}
