import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import add from "../images/signup.png"

function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [msg, setMsg] = useState("");
    let [show, setShow] = useState(false);
    let [btn, setBtn] = useState("Login");
    let navigate = useNavigate();

    function handleEmailChange(e){
        setEmail(e.target.value);
        setShow(false);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
        setShow(false);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(password.length<6 || password.length>=16){
            setShow(true);
            setMsg("Password length should be 6-16 characters");
            return;
        }
        let obj = {
            email,
            password
        };

        createUser(obj);
    }

    async function createUser(obj){
        setBtn("Creating...")
        try {
            let addUser = await fetch("https://career-fair-server.onrender.com/login", {
                method:"POST",
                body:JSON.stringify(obj),
                headers:{
                    "Content-type":"application/json"
                }
            })
            let response = await addUser.json();
            if(response.ok){
                localStorage.setItem("userId", response.id);
                localStorage.setItem("authToken", response.token);
                navigate("/all-property")
            }
            else{
                setMsg(response.response);
                setShow(true);
            }
        } catch (error) {
            console.log("error", error);
        }
        finally{
            setBtn("Login");
        }
    }
  return (
    <div className='signup-div d-flex justify-content-center align-items-center min-vh-100'>
        <div className='container my-sign-div d-flex justify-content-center align-items-center pt-5 pb-5'>
            <form onSubmit={handleSubmit}>
                <div className='form' style={{padding:"30px 10px", width:"380px", borderRadius:"10px", boxShadow: "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"}}>
                <p className='fw-bolder text-dark fs-5 forgot mb-3'>Welcome again,  Login!</p>
                <div className='d-flex justify-content-center'>
                    <img src={add} alt='Signup avatar' className='signup-avatar' style={{width:"90px", height:"90px", marginRight:"10px"}}/>
                </div>
                    <div className='d-flex flex-column justify-content-start align-items-start form-div mt-3'>
                        
                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            <input type='text' placeholder='your email'
                            value={email}
                            required
                            onChange={handleEmailChange}/>
                        </div>
                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            <input type='password' placeholder='your password'
                            value={password}
                            required
                            onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    {show &&<p className='error mt-2' style={{textAlign:"center"}}>{msg}</p>}
                    <div className='btn-div mt-4'>
                    <button className='sign' style={{background:"linear-gradient(to right, #8ba9d7, #879bdf, #908ae1, #a375db, #bb59cc)"}}>{btn}</button>
                    </div>
                    <div className='mt-2'>
                    <Link to="/forgot"><p style={{textAlign:"center", marginRight:"20px", marginTop:"20px"}}>Forgot password ?</p></Link>
                    <Link to="/"><p style={{textAlign:"center", marginRight:"20px", marginTop:"20px"}}>New User? Create Account</p></Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;