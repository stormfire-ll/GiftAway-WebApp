import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import ErrorPopup from '../components/ErrorPopup';

//registrierung mit zusätzlich phone und mail
const Registration = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [mail, setMail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    //wird ausgelöst wenn man den button klickt, macht einen post request mit den eingegeben daten
    const registerButtonclicked = (e) => {
        e.preventDefault()

        if (!/\S+@\S+\.\S+/.test(mail)) {
            setErrorMessage("Please enter a valid mail address !");
            setShowErrorPopup(true);
            return; // Registrierung nicht fortzusetzen
        }

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
        //console.log(res)
        navigate('/');
       })
       .catch(err => {
        // Wenn ein Fehler auftritt, zeigen Sie das Popup mit der Fehlermeldung an
        const message = err.response?.data?.message || 'Registration error';
        setErrorMessage(message);
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
        </>
    )
}
export default Registration