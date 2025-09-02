# Wallet system

Simple digital wallet implementation for Paper.id technical test.

## What it does

Basic wallet functionality where users can:

* Add money (topup)
* Withdraw money
* Check balance

Built with vanilla JavaScript using ES6 classes.

### **Quick start**

```
node wallet.js
```

### Sample Data

Two users are hardcoded:

* User 1 (Riva): starts with 500,000
* User 2 (Sukma): starts with 1,000,000

## Validation Rules

* Topup minimum: 10,000
* Withdrawal minimum: 50,000
* Max transaction: 10,000,000
* Can't withdraw more than balance

## What gets tested

The script automatically tests:

* Normal transactions
* Edge cases (invalid users, wrong amounts)
* Error scenarios

## Implementation Notes

* Uses JavaScript Map for user storage
* All transactions are logged with timestamps
* Returns structured response objects for easy handling
* Input validation on all operations

## Why certain choices were made

* **ES6 Classes**: Clean structure for wallet operations
* **Hard-coded data**: As per requirements, keeps it simple
* **Map over Object**: Better performance for user lookups
* **Structured returns**: Easier to handle success/error cases
