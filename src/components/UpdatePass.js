import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import add from "../images/signup.png"

function UpdatePass() {
    let { id, token } = useParams();
    let [show, setShow] = useState(true);
    let [btn, setBtn] = useState("Update");
    let [password, setPassword] = useState("");
    let navigate = useNavigate();
    let [msg, setMsg] = useState("");
    let [show1, setShow1] = useState(false);
    let [enable, setEnable] = useState(false);

    useEffect(() => {

        async function verifytoken() {
            let isValid = await fetch(`https://career-fair-server.onrender.com/token-verify/${id}/${token}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
            let response = await isValid.json();
            if (response.ok) {
                setShow(false);
            } else {
                alert(response.response);
                navigate("/forgot")
            }
        }
        verifytoken();
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        if (password.length < 6 || password.length >= 16) {
            setShow1(true);
            setMsg("Password length should be 6-16 characters");
            return;
        }
        let obj = {
            password
        }
        addNewPass(obj);
    }
    async function addNewPass(obj) {
        setBtn("Updating...")
        try {
            let addUser = await fetch(`https://career-fair-server.onrender.com/update-password/${id}`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            })
            let response = await addUser.json();
            if (response.ok) {

                alert(response.response);
                navigate("/login")
            }
            else {
                setMsg(response.response);
                setShow(true);
            }
        } catch (error) {
            console.log("error", error);
        }
        finally {
            setBtn("Update");
        }
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setShow1(false);
    }
    return (
        <div className='update-div d-flex justify-content-center align-items-center min-vh-100'>
            {show ? <div>

                <div className='d-flex justify-content-center align-items-center'><div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                    <span className='ms-3'>Verifying.... Please wait</span>
                </div>

            </div>
                :
                <div className='signup-div d-flex justify-content-center align-items-center min-vh-100'>
                    <div className='container my-sign-div d-flex justify-content-center align-items-center pt-5 pb-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='form' style={{ padding: "30px 10px", width: "380px", borderRadius: "10px", boxShadow: "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px" }}>
                                <p className='fw-bolder text-dark fs-5 forgot mb-3'>Update new password</p>
                                <div className='d-flex justify-content-center'>
                                    <img src={add} alt='Signup avatar' className='signup-avatar' style={{ width: "90px", height: "90px", marginRight: "10px" }} />
                                </div>
                                <div className='d-flex flex-column justify-content-start align-items-start form-div mt-4'>

                                    <div className='d-flex flex-column justify-content-start align-items-start'>
                                        <input type='password' placeholder='your password'
                                            value={password}
                                            required
                                            onChange={handlePasswordChange} />
                                    </div>

                                </div>
                                {show1 && <p className='error mt-2' style={{ textAlign: "center" }}>{msg}</p>}
                                <div className='btn-div mt-5 mb-3'>
                                    <button className='sign' style={{ background: "linear-gradient(to right, #8ba9d7, #879bdf, #908ae1, #a375db, #bb59cc)" }} disabled={enable}>{btn}</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default UpdatePass;