class WalletSystem {
  constructor() {
    this.users = new Map([
      [1, { id: 1, name: 'Riva ', balance: 500_000 }],
      [2, { id: 2, name: 'Sukma ', balance: 1_000_000 }],
    ])
    this.MAX_TRANSACTION = 10_000_000
    this.MIN_TOPUP = 10_000
    this.MIN_WITHDRAW = 50_000

    this.transactions = [];
  }
  isValidAmount(amount){
    return typeof amount === 'number' && Number.isInteger(amount) && amount > 0 
  }
  
  topup(userId, amount) {
    const transactionId = Date.now();
    const user = this.users.get(userId)
    const name = user?.name;
    if (!user) {
      return { success: false, message: 'User not found!' }
    }
    if (!this.isValidAmount(amount)) {
      return { success: false, message: 'Amount must be positive and must be an integer number!' }
    } else if (amount < this.MIN_TOPUP) {
      return { success: false, message: `Minimum topup: ${this.MIN_TOPUP}` }
    } else if (amount > this.MAX_TRANSACTION) {
      return { success: false, message: `Maximum topup per transaction is: ${this.MAX_TRANSACTION}` }
    }

    const oldBalance = user.balance
    user.balance += amount

    this.transactions.push({
      transactionId: transactionId,
      id: userId,
      type: 'topup',
      amount: amount,
      timestamp: new Date(),
      oldBalance: oldBalance,
      balanceAfter: user.balance,
    })

    return {
      success: true,
      transactionId,
      name:name,
      message: 'Topup successful',
      amount: amount,
      oldBalance: oldBalance,
      newBalance: user.balance,
    }
  }


  
  withdraw(userId, amount) {
    const transactionId = Date.now();
    const user = this.users.get(userId)
    const name = user?.name

    if (!user) {
      return { success: false, message: 'User not found!' }
    }
    if (!this.isValidAmount(amount)) {
      return { success: false, message: 'Amount must be positive and must be an integer number!' }
    }else if(amount > this.MAX_TRANSACTION){
      return { success: false, message: `Maximum withdraw per-day: ${this.MAX_TRANSACTION} ` }
    } 
    else if (amount < this.MIN_WITHDRAW) {
      return { success: false, message: `Minimum withdraw ${this.MIN_WITHDRAW}` }
    } else if (amount > user.balance) {
      return { success: false, message: 'Insufficient balance!' }
    }

    const oldBalance = user.balance
    user.balance -= amount
    

    this.transactions.push({
      transactionId,
      name:name,
      id: userId,
      type: 'withdraw',
      amount: amount,
      timestamp: new Date(),
      oldBalance: oldBalance,
      balanceAfter: user.balance,
    })

    return {
      success: true,
      name:name,
      transactionId,
      message: 'Withdraw successful',
      amount: amount,
      oldBalance: oldBalance,
      newBalance: user.balance,
    }
  }

  getBalance(userId) {
    const user = this.users.get(userId)

    if (user) {
      return user.balance
    } else {
      return null
    }
  }
}

function runAllTests() {
  const wallet = new WalletSystem()

  console.log('=== WALLET SYSTEM TESTING ===\n')

  // Test initial balances
  console.log('1. Initial Balances:')
  console.log('   Riva:', wallet.getBalance(1))
  console.log('   Sukma:', wallet.getBalance(2))

  // Test topup
  console.log('\n2. Testing Topup:')
  console.log('   Normal topup:', wallet.topup(1, 200_000))
  console.log('   Invalid amount:', wallet.topup(1, 25_000_000))
  console.log('   Invalid user:', wallet.topup(9, 50_000))

  // Test withdraw
  console.log('\n3. Testing Withdrawal:')
  console.log('   Normal withdraw:', wallet.withdraw(1, 400_000))
  console.log('   Over limit withdraw:', wallet.withdraw(2, 15_000_000))
  console.log('   Insufficient balance:', wallet.withdraw(1, 2_000_000))
  console.log('   Invalid user:', wallet.withdraw(99, 50_000))

  // Final balances
  console.log('\n4. Final Balances:')
  console.log('   Riva:', wallet.getBalance(1))
  console.log('   Sukma:', wallet.getBalance(2))
}

runAllTests()
