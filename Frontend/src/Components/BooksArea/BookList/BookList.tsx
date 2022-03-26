import "./BookList.css";

import { SyntheticEvent, useEffect, useState } from "react";
import BookModel from "../../../Models/BookModel";
import GenreModel from "../../../Models/GenreModel";
import booksService from "../../../Services/BooksService";
import notify from "../../../Services/NotifyService";
import BookCard from "../BookCard/BookCard";
import Loading from "../../SharedArea/Loading/Loading";

function BookList(): JSX.Element {

  const [genres, setGenres] = useState<GenreModel[]>([])  //[{},{}]
  const [books, setBooks] = useState<BookModel[]>([])

 useEffect(() =>{
    (async function(){
        try {
            const genres = await booksService.getAllGenres()
            setGenres(genres)
        } catch (err:any) {
            notify.error(err)
        }
    })()

 }, [])
  
 async function changeHandler(e: SyntheticEvent):Promise<void> {
     try {
             const genreId = +(e.target as HTMLSelectElement).value 
     const books = await booksService.getAllBooksByGenre(genreId)
     setBooks(books)
     } catch (err: any) {
         notify.error(err)
     }
 
 }

 async function deleteBook(bookId: number):Promise<void> {
     try {

        const confirmDelete = window.confirm('Are you sure?')
        if (!confirmDelete) return

         await booksService.deleteBook(bookId)

         notify.success('Book has been deleted')

         const bookCopy = [...books]
         const indexToDelete = books.findIndex(b => b.bookId === bookId)
         bookCopy.splice(indexToDelete, 1)
         setBooks(bookCopy)



     } catch (err: any) {
         notify.error(err)
     }
 }



    return (
        <div className="BookList">
  
        <select onChange={changeHandler} defaultValue=''>
            <option value="" disabled>Select Genre</option>
            {genres.map(g => <option key={g.genreId} value={g.genreId}>{g.genreName}</option>)}
        </select>
{/* {books.length && <Loading/>} //cant do it here cause we have select that opens it  */}

      {/* {books.length !== 0 && <table>
          <thead>
              <tr>
                  <th>Genre Name</th>
                  <th>Book Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Delete</th>
              </tr>
          </thead>
          <tbody>
              {books.map(b => <tr key={b.bookId}>
                        <td>{b.genreName}</td>
                        <td>{b.bookName}</td>
                        <td>{b.description}</td>
                        <td>{b.price}</td>
                        <td>{b.stock}</td>
                        <td><button onClick={() => deleteBook(b.bookId)}>❌</button></td>
              </tr>)}
          </tbody>
      </table>} */}


      {/* with cards  */}
      
<br />
      <div className="container">
          {books.map(b => <BookCard  key={b.bookId} book={b} deleteBook={deleteBook}/>)}
      </div>
	
        </div>
    );
}
export default BookList;
