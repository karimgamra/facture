const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all payments
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM payments ORDER BY created_at DESC');
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching payments'
        });
    }
});

// GET payment by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM payments WHERE id = ?', [req.params.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }
        
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching payment'
        });
    }
});

// GET payments by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM payments WHERE id_user = ? ORDER BY created_at DESC', [req.params.userId]);
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching user payments:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user payments'
        });
    }
});

// POST create new payment
router.post('/', async (req, res) => {
    try {
        const { id_user, chiffre_affaires, encaisse_payment = 0, en_attente = 0, payment_en_retard = 0 } = req.body;
        
        if (!id_user || !chiffre_affaires) {
            return res.status(400).json({
                success: false,
                message: 'id_user and chiffre_affaires are required'
            });
        }
        
        const [result] = await db.execute(
            'INSERT INTO payments (id_user, chiffre_affaires, encaisse_payment, en_attente, payment_en_retard) VALUES (?, ?, ?, ?, ?)',
            [id_user, chiffre_affaires, encaisse_payment, en_attente, payment_en_retard]
        );
        
        res.status(201).json({
            success: true,
            data: {
                id: result.insertId,
                id_user,
                chiffre_affaires,
                encaisse_payment,
                en_attente,
                payment_en_retard
            }
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating payment'
        });
    }
});

// PUT update payment
router.put('/:id', async (req, res) => {
    try {
        const { chiffre_affaires, encaisse_payment, en_attente, payment_en_retard } = req.body;
        const paymentId = req.params.id;
        
        // Check if payment exists
        const [existingPayment] = await db.execute('SELECT * FROM payments WHERE id = ?', [paymentId]);
        
        if (existingPayment.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }
        
        // Update payment
        const [result] = await db.execute(
            'UPDATE payments SET chiffre_affaires = ?, encaisse_payment = ?, en_attente = ?, payment_en_retard = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [chiffre_affaires, encaisse_payment, en_attente, payment_en_retard, paymentId]
        );
        
        // Fetch updated payment
        const [updatedPayment] = await db.execute('SELECT * FROM payments WHERE id = ?', [paymentId]);
        
        res.json({
            success: true,
            message: 'Payment updated successfully',
            data: updatedPayment[0]
        });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating payment'
        });
    }
});

// PATCH update specific payment fields
router.patch('/:id', async (req, res) => {
    try {
        const paymentId = req.params.id;
        const updates = req.body;
        
        // Check if payment exists
        const [existingPayment] = await db.execute('SELECT * FROM payments WHERE id = ?', [paymentId]);
        
        if (existingPayment.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }
        
        // Build dynamic update query
        const allowedFields = ['chiffre_affaires', 'encaisse_payment', 'en_attente', 'payment_en_retard'];
        const updateFields = [];
        const updateValues = [];
        
        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                updateFields.push(`${field} = ?`);
                updateValues.push(updates[field]);
            }
        });
        
        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update'
            });
        }
        
        updateFields.push('updated_at = CURRENT_TIMESTAMP');
        updateValues.push(paymentId);
        
        const query = `UPDATE payments SET ${updateFields.join(', ')} WHERE id = ?`;
        await db.execute(query, updateValues);
        
        // Fetch updated payment
        const [updatedPayment] = await db.execute('SELECT * FROM payments WHERE id = ?', [paymentId]);
        
        res.json({
            success: true,
            message: 'Payment updated successfully',
            data: updatedPayment[0]
        });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating payment'
        });
    }
});

// DELETE payment
router.delete('/:id', async (req, res) => {
    try {
        const paymentId = req.params.id;
        
        // Check if payment exists
        const [existingPayment] = await db.execute('SELECT * FROM payments WHERE id = ?', [paymentId]);
        
        if (existingPayment.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }
        
        await db.execute('DELETE FROM payments WHERE id = ?', [paymentId]);
        
        res.json({
            success: true,
            message: 'Payment deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting payment'
        });
    }
});

module.exports = router;