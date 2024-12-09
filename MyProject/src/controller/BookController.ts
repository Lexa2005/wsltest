import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Book } from "../entity/Book";
import { User } from "../entity/User";
import { ILike } from "typeorm";


export class BookController {
  private bookRepository = AppDataSource.getRepository(Book);
  private userRepository = AppDataSource.getRepository(User);

  async addBook(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId, title, author } = request.body;

      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      const book = this.bookRepository.create({ title, author, user });
      await this.bookRepository.save(book);

      return response.status(201).json({ message: "Book added successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getAllBooks(request: Request, response: Response, next: NextFunction) {
    try {
      const books = await this.bookRepository.find({ relations: ["user"] });
      return response.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async removeBook(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);
      const book = await this.bookRepository.findOneBy({ id });

      if (!book) {
        return response.status(404).json({ message: "Book not found" });
      }

      await this.bookRepository.remove(book);
      return response
        .status(200)
        .json({ message: "Book removed successfully" });
    } catch (error) {
      next(error);
    }
  }

  async searchBooks(request: Request, response: Response, next: NextFunction) {
    try {
      const { title, author } = request.query;

      const searchCriteria: any = [];
      if (title) {
        searchCriteria.push({ title: ILike(`%${title}%`) });
      }
      if (author) {
        searchCriteria.push({ author: ILike(`%${author}%`) });
      }

      if (searchCriteria.length === 0) {
        return response
          .status(400)
          .json({
            message: "Provide at least one search parameter: title or author",
          });
      }

      const books = await this.bookRepository.find({
        where: searchCriteria,
        relations: ["user"], // Загрузить информацию о пользователе
      });

      return response.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }
}
