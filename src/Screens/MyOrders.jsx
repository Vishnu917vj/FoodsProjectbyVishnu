import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Table } from 'react-bootstrap';

function MyOrders() {
    const [orders, setOrders] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const email = localStorage.getItem("email");
                const res = await fetch("http://localhost:5000/api/myorders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });
                
                const data = await res.json();
                if (data.success) {
                    setOrders(data.data); // Assuming data.data holds the orders
                } else {
                    alert("Failed to fetch orders.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []); // Empty dependency array to run the effect once on mount

    return (
        <>
            <div><Navbar /></div>
            <div style={{ height: "100vh" }} className='bg-dark'>
                <h1>My Orders</h1>
                <Table className="table table-dark-light" style={{ border: "2px solid white" }} striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Order Date</th>
                            <th>Food Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.date}</td>
                                    <td>
                                        <ul>
                                            {order.food_items.map((item, idx) => (
                                                <li key={idx}>
                                                    {item.name} - Qty: {item.qty}, Price: {item.price}, Size: {item.size}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                </div>
        </>
    );
}

export default MyOrders;
