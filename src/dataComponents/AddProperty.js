import React, { useState } from 'react'
import Home from './Home'
import house from "../images/logo.png"
import { useNavigate } from 'react-router-dom';

function AddProperty() {
    let [name, setName] = useState("");
    let [price, setPrice] = useState([]);
    let [location, setLocation] = useState("");
    let [description, setDescription] = useState("");
    let [btn, setBtn] = useState("Create");
    let [selectedType, setSelectedType] = useState('');
    let token = localStorage.getItem("authToken");
    let navigate = useNavigate();
    let id = localStorage.getItem("userId");

    function handleName(e){
        setName(e.target.value)
    }
    function handlePrice(e){
        setPrice(e.target.value)
    }
    function handleDropdownChange(e){
        setSelectedType(e.target.value);
    };

    function handleLocation(e){
        setLocation(e.target.value)
    }

    function handleDesc(e){
        setDescription(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault();
        let obj = {
            propertyType:name,
            location,
            price,
            description,
            status:selectedType,
            id
        }
        createProperty(obj);

    }

    async function createProperty(obj){
        try{
        setBtn("Creating....")
        let result = await fetch("https://career-fair-server.onrender.com/property/add-property", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "auth-token":`${token}`,
                "content-type":"application/json"
            }
        })
        let resp = await result.json();
        if(resp.ok){
            navigate("/all-property");
        }
    }
    catch(error){
        console.log(error);
    }
    finally{
        setBtn("Create")
    }
    }
    return (
        <Home>
            <div className='signup-div d-flex justify-content-center align-items-center min-vh-100'>
                <div className=''>
                    <form onSubmit={handleSubmit}>
                        <div className='form'>
                            <p className='fw-bolder text-dark fs-4 forgot mb-3'>Add new property</p>
                            <div className='d-flex justify-content-center'>
                                <img src={house} alt='Signup avatar' className='signup-avatar' style={{width:"90px", height:"90px"}}/>
                            </div>
                            <div className='d-flex flex-column justify-content-start align-items-start form-div mt-3'>
                        <div className='d-flex flex-column justify-content-start align-items-start '>
                            {/* <label>Enter your name</label> */}
                            <input type='text' placeholder='Property name'
                            value={name}
                            required
                            onChange={handleName}/>
                        </div>
                        
                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            {/* <label>Enter your email</label> */}
                            <input type='number' placeholder='Price'
                            value={price}
                            required
                            onChange={handlePrice}/>
                        </div>
                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            {/* <label>Enter your password</label> */}
                            <input type='text' placeholder='Location'
                            value={location}
                            required
                            onChange={handleLocation}/>
                        </div>
                        <div className='d-flex flex-column justify-content-start align-items-start'>
                            <textarea placeholder='Description' onChange={handleDesc} style={{width:"340px", margin:"5px 10px"}} required>
                            </textarea>
                        </div>
                        <div className='mb-3 ms-2'>
                        <label htmlFor="propertyType">Status:</label>
                        <br/>
                        <select id="propertyType" value={selectedType} onChange={handleDropdownChange} required>
                            <option value="">Select status</option>
                            <option value="Sold">Sold</option>
                            <option value="Unsold">Unsold</option>
                        </select>
                    </div>
                        <div className='btn-div mt-1 d-flex justify-content-flex-end'>
                        <button className='sign-prop' style={{background:"linear-gradient(to right, #8ba9d7, #879bdf, #908ae1, #a375db, #bb59cc)"}}>{btn}</button>
                    </div>
                    </div>
                        </div>
                    </form>


                </div>
            </div>
        </Home>
    )
}

export default AddProperty