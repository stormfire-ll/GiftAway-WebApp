import React, { useState } from 'react'
import axios from "axios";
import userContext from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import ErrorPopup from '../components/ErrorPopup'; 

//login route und sendet username und password an das backend, post request
const Login = () => {

    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const submitButtonClicked = async (e) => {
        e.preventDefault()

        // console.log(userName, password)

        await axios.post("http://localhost:4000/login", {
            username: userName,
            password: password
        }, 
        {
            withCredentials: true
        })
            .then((res) => {

                navigate("/")

            })
            .catch(err => {
                // Wenn ein Fehler auftritt, setzen Sie die Fehlermeldung und zeigen das Popup an
                const error = err.response?.data?.message || 'Login error. Please check your username and password.';
                setErrorMessage(error);
                setShowErrorPopup(true);
            })
    }

    const closeErrorPopup = () => {
        setShowErrorPopup(false);
    };



    return (
        <>
        {showErrorPopup && <ErrorPopup message={errorMessage} onClose={closeErrorPopup} />}
        <div style={{ display: "flex", height: "100vh", alignContent: "center", justifyContent: "center" }}>
            <div style={{ height: "50%", width: "30%", marginTop: "5rem", border: "2px", borderColor: "black", backgroundColor: "wheat", padding: "2rem", borderRadius: "2rem", paddingTop: "100px" }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" required value={userName} onChange={(e) =>
                            setUsername(e.target.value)
                        } />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" onClick={submitButtonClicked} className="btn btn-primary btn-lg" style={{ marginLeft: "40%", marginTop: "20px" }}>Login</button>
                    <div className="mt-5 text-center">
                        <p>Dont't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
</>
    )
}

export default Login