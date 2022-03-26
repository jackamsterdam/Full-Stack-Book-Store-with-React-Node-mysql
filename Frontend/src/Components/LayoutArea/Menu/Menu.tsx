import "./Menu.css";
import { NavLink } from 'react-router-dom'

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
			<NavLink to="/book-list">Books</NavLink>
			<NavLink to="/add-book">Add Book</NavLink>
		
        </div>
    );
}

export default Menu;
