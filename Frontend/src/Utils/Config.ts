class Config {

}

class DevelopmentConfig extends Config {
    genresUrl = "http://localhost:3001/api/genres/";
    booksByGenreUrl = "http://localhost:3001/api/books-by-genre/";
    booksUrl = "http://localhost:3001/api/books/";
}

class ProductionConfig extends Config {
    genresUrl = "http://localhost:3001/api/genres/";
    booksByGenreUrl = "http://localhost:3001/api/books-by-genre/";
    booksUrl = "http://localhost:3001/api/books/";
}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()

export default config