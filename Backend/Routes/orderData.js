const express = require('express');
const router = express.Router();
const Order = require('../Order'); // Capitalize model name by convention
const { sanitizeFilter } = require('mongoose');
const jwt=require('jsonwebtoken');
const something= "MYNAMEISVISHNU";
const User = require('../User');

router.post('/orderdata', async (req, res) => {
    try {
        const { email, date, food_items } = req.body; // Destructure request body

        const userOrder = await Order.findOne({ email });

        if (userOrder) {
            // Update the user's existing order for the given date
            await Order.findOneAndUpdate(
                { email, date },
                { $push: { food_items: { $each: food_items } } }
            );
            return res.json({ success: true, message: 'Order updated' });
        } else {
            // Create a new order if none exists
            await Order.create({ email, date, food_items });
            return res.json({ success: true, message: 'Order created' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
router.post('/myOrders', async (req, res) => {
    try {
        const { email } = req.body;
        const userOrder = await Order.find({ email });
        if (userOrder) {
            const data=userOrder.map((order) => {
                const date = order.date.toDateString();
                const food_items = order.food_items.map((item) => {
                    return {
                       name: item.name,
                       price: item.price,
                       qty: item.qty,
                       size: item.size,
                       sanitizeFilter
                    };
                });
                return { date, food_items };
            })
            return res.json({ success: true, data: data });
        } else {
            return res.json({ success: false});
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
