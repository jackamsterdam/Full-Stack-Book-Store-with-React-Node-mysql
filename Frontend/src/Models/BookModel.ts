

class BookModel {
    bookId: number //Pk
    genreId: number //FK
    bookName: string 
    description: string 
    price: number 
    stock: number 

    genreName: string 

}

export default BookModel