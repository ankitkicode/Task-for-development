import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinstance/AxoisInstance';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    // handleDelete function
    const handleDelete = async (id) => {
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            await axiosInstance.delete(`/task/delete/${id}`,);
            toast.success("Item deleted successfully");
            // Update the state to remove the deleted item from the UI
            const updatedData = data.filter((item) => item._id !== id);
            setData(updatedData);
        } catch (error) {
            toast.error("Error deleting item");
            console.error("Error deleting item:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    useEffect(() => {
        const fetchInventory = async () => {
            setData([]);
            try {
                const response = await axiosInstance.get('/task/find-inventory',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                            }

                );
                setData(response.data.allInventory); 
                // console.log(response.data, "allInventory");
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        };

        fetchInventory();
    }, []);


    const handleUserItems = async () => {
        navigate('/user-inventory')
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()).slice(-2); 
        return `${day}-${month}-${year}`; 
    };

    return (
        <div className="container">
        <div style={{ display: 'flex', gap:'20px', justifyContent: 'center', marginBottom: '20px' }}>
                <Link to={'/'} style={{ textDecoration:"none",  color: 'black',  textTransform:"capitalize",fontSize:'20px' }}>All Items</Link>
                <button 
               onClick={handleUserItems}
                style={{ 
                    textDecoration: "none", 
                    textTransform: "capitalize", 
                    fontSize: '20px', 
                   
                    cursor: 'pointer',
                    backgroundColor: 'transparent', 
                    color: 'black', 
                    border: 'none', 
                 
                }}>
                User Item
            </button>      
              </div>
            {data.length > 0 ? ( 
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date Received/Quantity</th>
                            <th>Date Dispatched/Quantity</th>
                            <th>Pending Items</th>
                            <th>Status</th>
                            <th>QR Code (Click to download)</th>
                            <th>Admin Panel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{formatDate(item.receivedDate)}/{item.receivedQuantity}</td>
                                <td>
                                    {item.dispatchDate ? formatDate(item.dispatchDate) : "------"}/{item.dispatchQuantity}
                                </td>
                                <td>{item.pandingItems}</td>
                                <td>{item.status}</td>
                                <td>
                                    <a href={item.qrCode} download={`QRCode_${item.name}.webp`}>
                                        <img src={item.qrCode} alt="QR Code" className="qr-code" />
                                    </a>
                                </td>
                                <td>
                                    <button onClick={() => handleEdit(item._id)} className="edit-button">
                                        <i className="ri-pencil-fill"></i>
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="delete-button"><i className="ri-delete-bin-5-line"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : ( // Display this if no data is available
                <div style={{ alignItems: 'center', justifyContent:'center', height:'80vh', display:'flex', marginTop: '20px' }}>
                    <p>No Items Here..</p>
                </div>
            )}
        </div>
    );
}

export default Home;
