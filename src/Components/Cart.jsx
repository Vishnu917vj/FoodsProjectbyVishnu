import React from 'react';
import { useCart, useCartDispatch } from './ContextRed';
import Table from 'react-bootstrap/Table';

function Cart() {
    const cart = useCart();
    const dispatch = useCartDispatch();
    const TotalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const email = localStorage.getItem('email');
    const date = new Date().toDateString();

    const handleCheckout = async () => {
        try {
            const response = await fetch("https://foods-project-4.onrender.com/api/orderdata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, date: date, food_items: cart })
            });

            const data = await response.json();

            if (data.success) {  // Ensure success key is correct
                alert("Order placed successfully");
                dispatch({ type: 'EMPTY_CART' });
            } else {
                alert("Failed to place order");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("Error while placing order");
        }
    };

    if (cart.length === 0) {
        return (
            <div style={{ height: "100vh" }} className='bg-dark text-white'>
                <h1 className='text-center fs-1'>Cart is Empty 😪</h1>
            </div>
        );
    } else {
        return (
            <div style={{ height: "100vh" }} className='bg-dark'>
                <Table className="table table-dark-light" style={{ border: "2px solid white" }} striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Option</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => (
                                <tr key={item.id || item._id}>  {/* Use item.id if no _id */}
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.size}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <div className='text-center text-white fs-5 '>Total price: {TotalPrice}</div>
                <div className='text-center btn btn-primary ms-5' onClick={handleCheckout}>Checkout</div>
            </div>
        );
    }
}

export default Cart;
