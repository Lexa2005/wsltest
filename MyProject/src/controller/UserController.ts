import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { createHash } from "crypto";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.userRepository.find({ relations: ["books"] });
      return users;
    } catch (error) {
      next(error);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return { message: "Неверный ID пользователя", status: 400 };
      }

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return { message: "Пользователь не найден", status: 404 };
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
        return { message: "Пользователь уже зарегистрирован", status: 403 };
      }

      const hashedPassword = this.hashPassword(password);

      const user = Object.assign(new User(), {
        firstName,
        lastName,
        age,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      return { message: "Пользователь успешно зарегистрирован", status: 200 };
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
        return { message: "Неверные данные", status: 401 };
      }

      return { message: "Аутентификация прошла успешно", status: 200 };
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return { message: "Неверный ID пользователя", status: 400 };
      }

      const userToRemove = await this.userRepository.findOneBy({ id });
      if (!userToRemove) {
        return { message: "Пользователь не найден", status: 404 };
      }

      await this.userRepository.remove(userToRemove);
      return { message: "Пользователь был удалён", status: 200 };
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

  async updateUser(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return response.status(400).json({ message: "Некорректный ID пользователя" });
      }
  
      const { oldPassword, firstName, lastName, age, password } = request.body;
  
      // Найти пользователя по ID
      const user = await this.userRepository.findOne({
        where: { id },
        select: ["id", "password", "firstName", "lastName", "age"],
      });
  
      if (!user) {
        return { message: "Пользователь не найден", status: 404 };
      }
  
      // Проверить текущий пароль
      if (!this.comparePassword(oldPassword, user.password)) {
        return { message: "Неверный текущий пароль", status: 403 };
      }
  
      // Обновить поля пользователя
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (age) user.age = age;
      if (password) user.password = this.hashPassword(password);
  
      // Явно указать, что запись обновляется
      await this.userRepository.save(user);
  
      return { message: "Пользователь обновлен успешно", user, status: 200 };
    } catch (error) {
      next(error);
    }
  }
  
}
