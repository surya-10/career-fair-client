import React, { useContext, useEffect, useState } from 'react';
import Home from './Home';
import house from "../images/logo.png";
import { useNavigate, useParams } from 'react-router-dom';
import { myData } from '../App';

function Edit() {
  const { propertyData, setPropertyData } = useContext(myData);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [btn, setBtn] = useState("Update property");
  const [selectedType, setSelectedType] = useState('');
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { dataId } = useParams();

  useEffect(() => {
    if (propertyData) {
      const property = propertyData.find((prod) => prod._id === dataId);
      if (property) {
        setName(property.propertyType);
        setPrice(property.price);
        setLocation(property.location);
        setDescription(property.description);
        setSelectedType(property.status);
      }
    }
  }, [propertyData, dataId]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handlePrice(e) {
    setPrice(e.target.value);
  }

  function handleDropdownChange(e) {
    setSelectedType(e.target.value);
  }

  function handleLocation(e) {
    setLocation(e.target.value);
  }

  function handleDesc(e) {
    setDescription(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      propertyType: name,
      location,
      price,
      description,
      status: selectedType,
    };
    updateProperty(obj);
  }

  async function updateProperty(obj) {
    console.log(obj)
    try {
      setBtn("Updating...");
      const result = await fetch(`https://career-fair-server.onrender.com/property/edit-property/${dataId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "auth-token": `${token}`,
          "content-type": "application/json",
        },
      });
      const resp = await result.json();
      if (resp.ok) {
        navigate("/all-property");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtn("Update property");
    }
  }

  return (
    <Home>
      <div className='signup-div d-flex justify-content-center align-items-center min-vh-100'>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='form'>
              <p className='fw-bolder text-dark fs-4 forgot mb-3'>Edit property</p>
              <div className='d-flex justify-content-center'>
                <img src={house} alt='Signup avatar' className='signup-avatar' style={{ width: "90px", height: "90px" }} />
              </div>
              <div className='d-flex flex-column justify-content-start align-items-start form-div mt-3'>
                <div className='d-flex flex-column justify-content-start align-items-start'>
                  <input type='text' placeholder='Property name' value={name} required onChange={handleName} />
                </div>
                <div className='d-flex flex-column justify-content-start align-items-start'>
                  <input type='text' placeholder='Price' value={price} required onChange={handlePrice} />
                </div>
                <div className='d-flex flex-column justify-content-start align-items-start'>
                  <input type='text' placeholder='Location' value={location} required onChange={handleLocation} />
                </div>
                <div className='d-flex flex-column justify-content-start align-items-start'>
                  <textarea placeholder='Description' onChange={handleDesc} style={{ width: "340px", margin: "5px 10px" }} required value={description}></textarea>
                </div>
                <div className='mb-3 ms-2'>
                  <label htmlFor="propertyType">Status:</label>
                  <br />
                  <select id="propertyType" value={selectedType} onChange={handleDropdownChange} required>
                    <option value="">Select status</option>
                    <option value="Sold">Sold</option>
                    <option value="Unsold">Unsold</option>
                  </select>
                </div>
                <div className='btn-div mt-1 d-flex justify-content-flex-end'>
                  <button className='sign-prop' style={{ background: "linear-gradient(to right, #8ba9d7, #879bdf, #908ae1, #a375db, #bb59cc)" }}>{btn}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Home>
  );
}

export default Edit;
