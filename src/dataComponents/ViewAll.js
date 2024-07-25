import React, { useContext, useEffect, useState } from 'react'
import Home from './Home'
import { useNavigate } from 'react-router-dom';
import home from "../images/h2.png"
import { myData } from '../App';

function ViewAll() {
    let {propertyData, setPropertyData} = useContext(myData)
    let navigate = useNavigate()
    let [data, setData] = useState([]);
    let token = localStorage.getItem("authToken");
    let [show, setShow] = useState(false);

    useEffect(()=>{
        async function getAll(){

            let property = await fetch("http://localhost:8095/property/all", {
                method:"GET",
                headers:{
                    "auth-token":`${token}`,
                    "content-type":"application/json"
                }
            })
            let resp = await property.json();
            if(resp.response=="Authentication failed" || resp.response=="no token"){
                navigate("/login");
            }
            if(resp.data){
                setShow(true);
                setData(resp.data)
                setPropertyData(resp.data);
            }
        }
        getAll()
    }, [token])

    function deleteProp(id){
        // console.log(id)
        deleteData(id)
        
    }
    function editProp(id){
        navigate(`/edit/${id}`);
    }
    let deleteData = async (id) => {
        try {
            let response = await fetch(`http://localhost:8095/property/delete-property/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": `${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            if (result.ok) {
                setData(data.filter(prop => prop._id !== id));
            } else {
                console.error('Error deleting property:', result.response);
            }
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

  return (
   <Home>
    <div>
        <div>
        <p className='fw-bolder text-dark fs-4 forgot mb-3 mt-4 mb-5 pb-3' style={{borderBottom:"1px solid black"}}>All properties</p>
        <div>
            {show ? <div>
                <div className='d-flex flex-row flex-wrap justify-content-center align-items-center g-2 par'>
                    {data.map((prop, ind)=>(
                        <div className="child-prop d-flex justify-content-center align-items-center flex-column mt-4" style={{ width:"360px", borderRadius:"5px"}} key={ind}>
                            <div className='d-flex'>
                                <img src={home} className='child-img'/>
                                <div className='datas mt-5 p-3'>
                                   <p className='fw-bold fs-5'>{prop.propertyType}</p>
                                   <p>Price: {prop.price} all taxes(inclusive)</p>
                                   <p>Location: {prop.location}</p>
                                   <p>Status {prop.status}</p>
                                   <p style={{textAlign:"justify", fontSize:"14px", textIndent:"20px"}}>{prop.description}</p>
                                   </div>
                                </div>
                            <div className='btn-prop'>
                                <button className='btn bg-dark text-white' onClick={()=>editProp(prop._id)}>Edit</button>
                                <button className='btn bg-danger text-white' onClick={()=>deleteProp(prop._id)}>Delete</button>
                            </div>
                            </div>
                    ))}
                    </div>
            </div>:<p>No data to display</p>}
        </div>
        </div>
    </div>
   </Home>
  )
}

export default ViewAll