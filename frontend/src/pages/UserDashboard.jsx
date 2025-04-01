import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function UserDashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2>Welcome, {user?.email}</h2>
      <button className="btn btn-danger mt-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;
