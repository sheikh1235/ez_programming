import { useState } from "react";
import axios from "axios";
import { Link , useHistory} from "react-router-dom";
import styles from "./styles.module.css";

const Signin = () => {
	document.title = "Login"
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const [message, setMessage] = useState("")

	const navigate = useHistory();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (data.email.localeCompare("admin@xyz.com") == 0 && data.password.localeCompare("asd123") == 0)
		{
			setError(false);
			setSuccess(true);
			setMessage("Logged in!")
			navigate.push("/admin")
		}
		else{
			setSuccess(false);
			setError(true);
			setMessage("Invalid Email or Password")

		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Admin Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && (<div className={styles.error_msg1}>{message}</div>)}
						{success && (<div className={styles.error_msg2}>{message}</div>)}

						<button type="submit" className={styles.green_btn}>
							Sign In as Admin
						</button>
						
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signin;
