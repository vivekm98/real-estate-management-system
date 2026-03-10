import { useContext } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Header = () => {
	const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext);
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		setIsLoggedIn(false);
		navigate("/login");
	};
	return (
		<>
			<nav className="navbar container pt-3 pb-3 align-items-start">
				<Link className="navbar-brand text-light" href="" to="/">
					Stock prediction portal
				</Link>
				{isLoggedIn ? (
					<>
					<div>
						<Button text ="Dashboard" class ="btn-outline-info mr-3" url = "/dashboard" />
					     &nbsp;
					    <button className="btn btn-danger" onClick={logout}>Logout</button>
					</div>
					</>
					
				) : (
					<>
						<div>
							<Button text="Login" class="btn-outline-info" url="/login" />
							&nbsp;
							<Button text="Register" class="btn-info" url="/register" />
						</div>
					</>
				)}
			</nav>
		</>
	);
};
export default Header;