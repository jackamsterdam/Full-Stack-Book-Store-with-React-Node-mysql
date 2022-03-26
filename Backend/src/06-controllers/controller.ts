import express, { NextFunction, Request, Response } from 'express'
import BookModel from '../03-models/book-model'
import logic from '../05-logic/logic'

const router = express.Router()
// http://localhost:3001/api/genres/
router.get('/genres', async (request: Request, response: Response, next: NextFunction) => {
  try {
      
     const genres = await logic.getAllGenres()
     response.json(genres)


  } catch (err: any) {
      next(err)
  }
})
// http://localhost:3001/api/books-by-genre/
router.get('/books-by-genre/:genreId', async (request: Request, response: Response, next: NextFunction) => {
  try {
      const genreId = +request.params.genreId
     const books = await logic.getAllBooksByGenre(genreId)
     response.json(books)


  } catch (err: any) {
      next(err)
  }
})

// http://localhost:3001/api/books/
router.post('/books', async (request: Request, response: Response, next: NextFunction) => {
  try {
     const book = new BookModel(request.body)
     const addedBook = await logic.addBook(book)
     response.status(201).json(addedBook)


  } catch (err: any) {
      next(err)
  }
})
// http://localhost:3001/api/books/
router.delete('/books/:bookId', async (request: Request, response: Response, next: NextFunction) => {
  try {
      const bookId = +request.params.bookId
      await logic.deleteBook(bookId)
      response.sendStatus(204)


  } catch (err: any) {
      next(err)
  }
})



export default router 