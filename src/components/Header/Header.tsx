import { Link } from "react-router-dom";
import classes from './Header.module.css'

const Header = () => {
  return (
    <header>
        <Link to="/posts/new" className={classes.create__btn}></Link>
    </header>
  );
};

export default Header;
