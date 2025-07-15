-- Table for managing payments and business revenue
CREATE TABLE IF NOT EXISTS payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    chiffre_affaires DECIMAL(10, 2) NOT NULL COMMENT 'Business turnover/revenue',
    encaisse_payment DECIMAL(10, 2) DEFAULT 0.00 COMMENT 'Received payment amount',
    en_attente DECIMAL(10, 2) DEFAULT 0.00 COMMENT 'Pending payment amount',
    payment_en_retard DECIMAL(10, 2) DEFAULT 0.00 COMMENT 'Late payment amount',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_user (id_user),
    INDEX idx_created_at (created_at)
);

-- Sample data for testing
INSERT INTO payments (id_user, chiffre_affaires, encaisse_payment, en_attente, payment_en_retard) VALUES
(1, 5000.00, 3000.00, 1500.00, 500.00),
(2, 8000.00, 8000.00, 0.00, 0.00),
(3, 3000.00, 1000.00, 1000.00, 1000.00);