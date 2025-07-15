const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test function to demonstrate API usage
async function testPaymentAPI() {
    try {
        console.log('🚀 Testing Payment Management API\n');

        // Test health check
        console.log('1. Health Check:');
        const health = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health:', health.data);
        console.log();

        // Test creating a new payment
        console.log('2. Creating a new payment:');
        const newPayment = {
            id_user: 5,
            chiffre_affaires: 7500.00,
            encaisse_payment: 5000.00,
            en_attente: 2000.00,
            payment_en_retard: 500.00
        };
        
        const createResponse = await axios.post(`${BASE_URL}/api/payments`, newPayment);
        console.log('✅ Created payment:', createResponse.data);
        console.log();

        const paymentId = createResponse.data.data.id;

        // Test getting all payments
        console.log('3. Getting all payments:');
        const allPayments = await axios.get(`${BASE_URL}/api/payments`);
        console.log('✅ All payments:', allPayments.data);
        console.log();

        // Test getting payment by ID
        console.log('4. Getting payment by ID:');
        const singlePayment = await axios.get(`${BASE_URL}/api/payments/${paymentId}`);
        console.log('✅ Single payment:', singlePayment.data);
        console.log();

        // Test updating payment (partial update)
        console.log('5. Updating payment (PATCH):');
        const updateData = {
            encaisse_payment: 6000.00,
            en_attente: 1500.00
        };
        
        const updateResponse = await axios.patch(`${BASE_URL}/api/payments/${paymentId}`, updateData);
        console.log('✅ Updated payment:', updateResponse.data);
        console.log();

        // Test getting payments by user
        console.log('6. Getting payments by user ID:');
        const userPayments = await axios.get(`${BASE_URL}/api/payments/user/5`);
        console.log('✅ User payments:', userPayments.data);
        console.log();

        console.log('🎉 All tests completed successfully!');

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
    }
}

// Run tests only if this file is executed directly
if (require.main === module) {
    console.log('Starting API tests...');
    console.log('Make sure the server is running on port 3000');
    console.log('Run: npm start\n');
    
    // Wait a bit for server to start if needed
    setTimeout(testPaymentAPI, 1000);
}

module.exports = { testPaymentAPI };