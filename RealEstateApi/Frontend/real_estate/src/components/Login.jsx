import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const [role, setRole] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		const userData = { email, password };

		try {
			const response = await axios.post(
				"https://localhost:7225/api/User/login",
				userData,
			);

			const { token, role } = response.data;

			// save token and role
			localStorage.setItem("accessToken", token);
			localStorage.setItem("role", role);

			setIsLoggedIn(true);

			if (role === "Admin") {
				navigate("/admin");
			} else {
				navigate("/user-dashboard");
			}
		} catch (error) {
			setError("Invalid email or password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 bg-light-dark p-5 rounded">
						<h3 className="text-light text-center mb-4">Login to our Portal</h3>
						<form onSubmit={handleLogin}>
							<div className="mb-3">
								<input
									type="Email"
									className="form-control"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="mb-3">
								<input
									type="password"
									className="form-control "
									placeholder="Set password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							{error && <div className="text-danger">{error}</div>}

							{loading ? (
								<button
									type="submit"
									className="btn btn-info d-block mx-auto"
									disabled
								>
									<FontAwesomeIcon icon={faSpinner} spin /> Logging in...
								</button>
							) : (
								<button type="submit" className="btn btn-info d-block mx-auto">
									Login
								</button>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
