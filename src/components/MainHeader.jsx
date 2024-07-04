import { Link } from "react-router-dom";

export const MainHeader = () => {
  return (
    <header>
      <div className="container navbar">
        <Link to="/">
          <img className="navbar__logo" src="./src/assets/SafeMe.png" alt="" />
        </Link>
        <ul className="navbar__menu">
          <li>
            <Link to="/login">
              <img src="./src/assets/login48.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <img src="./src/assets/person48.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to="/contacts">
              <img src="./src/assets/groups48.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to="/alerts">
              <img src="./src/assets/settings48.svg" alt="" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
