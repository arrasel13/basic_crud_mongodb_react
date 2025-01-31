import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul>
        <Link style={{ marginRight: "20px" }} to="/">
          Home
        </Link>
        <Link to="/users">Users</Link>
      </ul>
    </div>
  );
};

export default Header;
