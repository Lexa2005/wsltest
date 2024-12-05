import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { createHash } from "crypto";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      next(error);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return { message: "Invalid user ID", status: 400 };
      }

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return { message: "User not found", status: 404 };
      }

      return user;
    } catch (error) {
      next(error);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { firstName, lastName, age, password } = request.body;

      const existingUser = await this.userRepository.findOne({
        where: { firstName, lastName },
      });

      if (existingUser) {
        return { message: "User already registered", status: 403 };
      }

      const hashedPassword = this.hashPassword(password);

      const user = Object.assign(new User(), {
        firstName,
        lastName,
        age,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      return { message: "User registered successfully", status: 200 };
    } catch (error) {
      next(error);
    }
  }

  async authenticate(request: Request, response: Response, next: NextFunction) {
    try {
      const { firstName, lastName, password } = request.body;

      const user = await this.userRepository.findOne({
        where: { firstName, lastName },
        select: ["password"],
      });

      if (!user || !this.comparePassword(password, user.password)) {
        return { message: "Invalid credentials", status: 401 };
      }

      return { message: "Authentication successful", status: 200 };
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return { message: "Invalid user ID", status: 400 };
      }

      const userToRemove = await this.userRepository.findOneBy({ id });
      if (!userToRemove) {
        return { message: "User not found", status: 404 };
      }

      await this.userRepository.remove(userToRemove);
      return { message: "User has been removed", status: 200 };
    } catch (error) {
      next(error);
    }
  }

  hashPassword(password: string): string {
    return createHash("md5").update(password).digest("hex");
  }

  comparePassword(inputPassword: string, storedPasswordHash: string): boolean {
    const hashedInputPassword = this.hashPassword(inputPassword);
    return hashedInputPassword === storedPasswordHash;
  }
}
