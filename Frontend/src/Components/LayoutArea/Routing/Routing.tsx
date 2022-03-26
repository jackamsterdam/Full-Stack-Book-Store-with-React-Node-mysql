import { Routes, Route, Navigate } from 'react-router-dom'
import AddBook from '../../BooksArea/AddBook/AddBook';
import BookList from '../../BooksArea/BookList/BookList';
import Home from '../../HomeArea/Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';

function Routing(): JSX.Element {
    return (
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/book-list" element={<BookList/>}/>
          <Route path="/add-Book" element={<AddBook/>}/>


          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    );
}

export default Routing;
