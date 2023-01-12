import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
export const NavBar = () => {
  const [user, loding, error] = useAuthState(auth);
  return (
    <div>
      <Link to="/">Home</Link>
      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/createPost">Create Post </Link>
      )}
      {/* <Link to="/createPost">Create Post </Link> */}
      <div>
        <p>User name: {user?.email}</p>
      </div>
    </div>
  );
};
