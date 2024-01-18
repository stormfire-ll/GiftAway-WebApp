import React, { useState } from 'react'
import axios from "axios";
import userContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useNavigate()

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
            // Handle the response from backend here
            .then((res) => {

               console.log(res)

            })

            // Catch errors if any
            .catch(err => console.log('Login error', err));
    }





    return (

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
                </form>
            </div>
        </div>

    )
}

export default Login