import Joi from "joi"

class BookModel {
    bookId: number 
    genreId: number 
    bookName: string 
    description: string 
    price: number 
    stock: number 

    constructor(book: BookModel) {
        this.bookId = book.bookId
        this.genreId = book.genreId
        this.bookName = book.bookName
        this.description = book.description
        this.price = book.price 
        this.stock = book.stock 
    }

    private static postValidationSchema = Joi.object({
        bookId: Joi.forbidden(),
        genreId : Joi. number().required().integer().min(1),
        bookName: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(1000),
        price: Joi.number().required().min(0).max(1000),
        stock: Joi.number().required().integer().min(0).max(10000)

    })

    validatePost():string {
        const result = BookModel.postValidationSchema.validate(this, {abortEarly: false})
        return result.error?.message
    }
}

export default BookModel