import { OkPacket } from "mysql";
import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import GenreModel from "../03-models/genre-model";
import BookModel from "../03-models/book-model";


async function getAllGenres():Promise<GenreModel[]>{
  const sql = `SELECT * FROM genres`
  const genres = await dal.execute(sql)
  return genres
}

async function getAllBooksByGenre(genreId: number):Promise<BookModel[]> {
    const sql = `SELECT b.*, g.genreName AS genreName
                 FROM genres as g
                 INNER JOIN books as b
                  ON g.genreId = b.genreId
                  WHERE g.genreId = ?
                  ORDER BY b.price, b.stock `


    const books = await dal.execute(sql, [genreId])
    if (books.length === 0) throw new ErrorModel(404, `Resource with id ${genreId} not found.`)
    return books

}

async function addBook(book: BookModel):Promise<BookModel> {
    const errors = book.validatePost() 
    if (errors) throw new ErrorModel(400, errors)
  const sql = `INSERT INTO books VALUES(DEFAULT,?, ?,?,?,?)`

  const info: OkPacket = await dal.execute(sql, [book.genreId, book.bookName,book.description, book.price, book.stock])
  book.bookId = info.insertId

  return book 

}

async function deleteBook(bookId: number):Promise<void> {
    const sql = `DELETE FROM books 
                 WHERE bookId = ?`

                 const info: OkPacket = await dal.execute(sql, [bookId])
                 if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with id ${bookId} not found.`)
}

export default {
    getAllGenres,
    getAllBooksByGenre,
    addBook,
    deleteBook
}