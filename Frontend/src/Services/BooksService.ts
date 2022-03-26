import BookModel from "../Models/BookModel"
import GenreModel from "../Models/GenreModel"
import axios from 'axios'
import config from '../Utils/Config'

class BooksService {


    async  getAllGenres():Promise<GenreModel[]>{
      const response = await axios.get<GenreModel[]>(config.genresUrl)
      const genres = response.data 
      return genres 

    }

    async  getAllBooksByGenre(genreId: number):Promise<BookModel[]> {
        const response = await axios.get<BookModel[]>(config.booksByGenreUrl + genreId)
        const books = response.data 
        return books 

    }

    async  addBook(book: BookModel):Promise<BookModel> {
        const response = await axios.post<BookModel>(config.booksUrl, book)
        const addedBook = response.data
        return book 

    }

    async  deleteBook(bookId: number):Promise<void> {
      await axios.delete(config.booksUrl + bookId)
    }



}

const booksService = new BooksService()

export default booksService