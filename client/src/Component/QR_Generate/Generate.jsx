import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosinstance/AxoisInstance';

const Generate = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: 'C1',
        date: '',
        quantity: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/task/create-inventory', formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                        }
            );
            // console.log('QR Code generated:', response.data);
            toast.success("QR code generated.")
            navigate('/')
        } catch (error) {
            toast.error("Error generating QR code.")
            console.error('Error generating QR code:', error);
        }
    };

    return (
        <div className="register">
            <div className="card">
                <div>
                    <h1>Generate QR Code</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <select name="name" id="name" value={formData.name} onChange={handleChange}>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                        <option value="C3">C3</option>
                        <option value="C4">C4</option>
                        <option value="C5">C5</option>
                    </select>

                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />

                    <label htmlFor="quantity">Item Quantity</label>
                    <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />

                    <button type="submit" className="sign-in">Generate QR</button>
                </form>
            </div>
        </div>
    );
};

export default Generate;
