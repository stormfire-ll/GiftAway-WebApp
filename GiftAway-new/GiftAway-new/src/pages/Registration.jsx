import React, { useState } from 'react'
import axios from "axios"

const Registration = () => {

    const [username, setUsername] = useState("")
    const [mail, setMail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    

    const registerButtonclicked = (e) => {
        e.preventDefault()

       // console.log(username, mail, phoneNumber, password)

       axios.post("http://localhost:4000/register", {
        username: username,
        mail: mail,
        phone: phoneNumber,
        password: password
       },
       {
        withCredentials: true
       })
       .then((res) => {
        console.log(res)
       })
       .catch(err => console.log('Registration error', err))
    }

    return (
        <div style={{ display: "flex", height: "100vh", alignContent: "center", justifyContent: "center" }}>
            <div style={{ height: "50%", width: "30%", marginTop: "5rem", border: "2px", borderColor: "black", backgroundColor: "wheat", padding: "2rem", borderRadius: "2rem" }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mail" className="form-label">Mail</label>
                        <input type="email" className="form-control" id="mail" value={mail} onChange={(e) => setMail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="number" className="form-control" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"  value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                   
                    <button type="submit" onClick={registerButtonclicked} className="btn btn-primary btn-lg" style={{ marginLeft: "40%", marginTop: "20px" }}>Register</button>
                </form>
            </div>
        </div>
    )
}
export default Registration