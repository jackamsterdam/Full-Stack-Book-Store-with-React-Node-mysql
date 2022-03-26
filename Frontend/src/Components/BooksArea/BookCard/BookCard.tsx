import BookModel from "../../../Models/BookModel";
import "./BookCard.css";

interface BookCardProps {
   book: BookModel
   deleteBook: (bookId: number) => void
}

function BookCard(props: BookCardProps): JSX.Element {
    return (
        <div className="BookCard">

            <span>Genre: {props.book.genreName}</span>
            <br />
            <span>Book Name: {props.book.bookName}</span>
            <br />
            <span>Description: {props.book.description}</span>
            <br />
            <span>Price: {props.book.price}</span>
            <br />
            <span>Stock: {props.book.stock}</span>
            <br />
            <button onClick={() => props.deleteBook(props.book.bookId)}>❌</button>
          
			
        </div>
    );
}

export default BookCard;
