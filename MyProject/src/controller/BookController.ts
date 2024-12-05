import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Book } from "../entity/Book";
import { User } from "../entity/User";

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
      return response.status(200).json({ message: "Book removed successfully" });
    } catch (error) {
      next(error);
    }
  }
}
