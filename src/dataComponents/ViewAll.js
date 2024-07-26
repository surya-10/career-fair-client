import React, { useContext, useEffect, useState } from 'react';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import home from "../images/h2.png";
import { myData } from '../App';
import './ViewAll.css';
import { useTypewriter } from 'react-simple-typewriter';

function ViewAll() {
    let { propertyData, setPropertyData } = useContext(myData);
    let navigate = useNavigate();
    let [data, setData] = useState([]);
    let token = localStorage.getItem("authToken");
    let [show, setShow] = useState(false);
    let [allProp, setAllProp] = useState([]);
    let [search, setSearch] = useState("");
    let [typeMsg, setTypeMsg] = useState("All Properties");

    useEffect(() => {
        async function getAll() {
            let property = await fetch("https://career-fair-server.onrender.com/property/all", {
                method: "GET",
                headers: {
                    "auth-token": `${token}`,
                    "Content-Type": "application/json"
                }
            });
            let resp = await property.json();
            if (resp.response === "Authentication failed" || resp.response === "no token") {
                navigate("/login");
            }
            if (resp.data) {
                setShow(true);
                setData(resp.data);
                setAllProp(resp.data);
                setPropertyData(resp.data);
            }
        }
        getAll();
    }, [token, setPropertyData, navigate]);

    function deleteProp(id) {
        deleteData(id);
    }

    function editProp(id) {
        navigate(`/edit/${id}`);
    }

    let [text] = useTypewriter({
        words: [
            'Search by location',
            'Search by price',
            'Search by property'
        ],
        loop: 0,
    });

    function handleSearch(e) {
        e.preventDefault();
        setShow(false);
        setTypeMsg("Search Results");

        let searchData = allProp.filter((property) => 
            property.propertyType.toLowerCase().includes(search.toLowerCase()) ||
            property.price.toString().includes(search) ||
            property.location.toLowerCase().includes(search.toLowerCase())
        );

        if (searchData.length > 0) {
            setData(searchData);
            setShow(true);
        } else {
            setData([]);
            setShow(true);
        }
    }

    let deleteData = async (id) => {
        try {
            let response = await fetch(`https://career-fair-server.onrender.com/property/delete-property/${id}`, {
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

    function clearSearch(e) {
        e.preventDefault()
        setSearch("");
        setShow(true);
        setTypeMsg("All Properties");
        setData(propertyData);
    }

    return (
        <Home>
            <div>
                <form className="d-flex me-5 mt-4" role="search" onSubmit={handleSearch}>
                    <div className='d-flex justify-content-end align-items-center'>
                        <input
                            className="form-control me-2 border"
                            type="search"
                            placeholder={text}
                            aria-label="Search"
                            required
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className='d-flex'>
                            <button
                                className="btn mt-1"
                                style={{ background: "linear-gradient(to right, #8ba9d7, #879bdf, #908ae1, #a375db, #bb59cc)", color: "white" }}
                                type="submit"
                            >
                                Search
                            </button>
                            <button
                                className='ms-4 mt-1 btn border rounded'
                                style={{ fontSize: "13px" }}
                                onClick={clearSearch}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </form>
                <div className="container">
                    <p className="title">{typeMsg}</p>
                    <div className="property-list">
                        {show ? data.length > 0 ? data.map((prop, ind) => (
                            <div className="property-card" key={ind}>
                                <div className="property-header">
                                    <img src={home} className="property-image" alt="Property" />
                                    <div className="property-details">
                                        <p className="property-type">{prop.propertyType}</p>
                                        <p>Price Rs: <span className="property-price">{prop.price} all taxes (inclusive)</span></p>
                                        <p>Location: <span className="property-location">{prop.location}</span></p>
                                        <p>Status: <span className="property-status">{prop.status}</span></p>
                                        <p className="property-description">{prop.description}</p>
                                    </div>
                                </div>
                                <div className="property-actions">
                                    <button className="btn btn-edit" onClick={() => editProp(prop._id)}>Edit</button>
                                    <button className="btn btn-delete" onClick={() => deleteProp(prop._id)}>Delete</button>
                                </div>
                            </div>
                        )) : <p>No properties found matching your search criteria.</p> : <p>Loading...</p>}
                    </div>
                </div>
            </div>
        </Home>
    );
}

export default ViewAll;





// import React, { useContext, useEffect, useState } from 'react'
// import Home from './Home'
// import { useNavigate } from 'react-router-dom';
// import home from "../images/h2.png"
// import { myData } from '../App';

// function ViewAll() {
//     let {propertyData, setPropertyData} = useContext(myData)
//     let navigate = useNavigate()
//     let [data, setData] = useState([]);
//     let token = localStorage.getItem("authToken");
//     let [show, setShow] = useState(false);

//     useEffect(()=>{
//         async function getAll(){
//             let property = await fetch("https://career-fair-server.onrender.com/property/all", {
//                 method:"GET",
//                 headers:{
//                     "auth-token":`${token}`
//                 }
//             })
//             let resp = await property.json();
//             if(resp.response=="Authentication failed" || resp.response=="no token"){
//                 navigate("/login");
//             }
//             if(resp.data){
//                 setShow(true);
//                 setData(resp.data)
//                 setPropertyData(resp.data);
//             }
//         }
//         getAll()
//     }, [token])

//     function deleteProp(id){
//         // console.log(id)
//         deleteData(id)
        
//     }
//     function editProp(id){
//         navigate(`/edit/${id}`);
//     }
//     let deleteData = async (id) => {
//         try {
//             let response = await fetch(`https://career-fair-server.onrender.com/property/delete-property/${id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "auth-token": `${token}`,
//                     "Content-Type": "application/json"
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status}`);
//             }

//             const result = await response.json();
//             if (result.ok) {
//                 setData(data.filter(prop => prop._id !== id));
//             } else {
//                 console.error('Error deleting property:', result.response);
//             }
//         } catch (error) {
//             console.error('Error deleting property:', error);
//         }
//     };

//   return (
//    <Home>
//     <div>
//         <div>
//         <p className='fw-bolder text-dark fs-4 forgot mb-3 mt-4 mb-5 pb-3' style={{borderBottom:"1px solid black"}}>All properties</p>
//         <div>
//             {show ? <div>
//                 <div className='d-flex flex-row flex-wrap justify-content-center align-items-center g-2 par'>
//                     {data.map((prop, ind)=>(
//                         <div className="child-prop d-flex justify-content-center align-items-center flex-column mt-3" style={{ width:"360px", borderRight:"1px solid whitesmoke"}} key={ind}>
//                             <div className='d-flex'>
//                                 <img src={home} className='child-img'/>
//                                 <div className='datas mt-5 p-3'>
//                                    <p className='fw-bold fs-5'>{prop.propertyType}</p>
//                                    <p>Price: <span className='fw-bolder'>{prop.price} all taxes(inclusive)</span></p>
//                                    <p>Location: <span className='fw-bolder'>{prop.location}</span></p>
//                                    <p>Status: <span className='fw-bolder'>{prop.status}</span></p>
//                                    <p style={{textAlign:"justify", fontSize:"13px", textIndent:"20px"}}>{prop.description}</p>
//                                    </div>
//                                 </div>
//                             <div className='btn-prop'>
//                                 <button className='btn bg-dark text-white' onClick={()=>editProp(prop._id)}>Edit</button>
//                                 <button className='btn bg-danger text-white' onClick={()=>deleteProp(prop._id)}>Delete</button>
//                             </div>
//                             </div>
//                     ))}
//                     </div>
//             </div>:<p>No data to display</p>}
//         </div>
//         </div>
//     </div>
//    </Home>
//   )
// }

// export default ViewAll
