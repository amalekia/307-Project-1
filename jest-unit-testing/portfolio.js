class Portfolio {
    constructor() {
      this.collection = {}; // An object to store ticker symbols and their corresponding number of shares
    }

    isEmpty() {
      for (const symbol in this.collection) {
        if (this.collection[symbol] > 0) {
          return false;
        }
      }
      return true;
    }

    countTickers() {
      return Object.keys(this.collection).length;
    }
  
    purchaseStock(symbol, shares) {
      if (shares > 0){
        if (this.collection[symbol]) {
          this.collection[symbol] += shares;
        } else {
          this.collection[symbol] = shares;
        }
      }
    }
  
    // Sell shares of a stock from the portfolio
    sellStock(symbol, shares) {
      if (this.collection[symbol]) {
        if (shares <= this.collection[symbol]) {
          this.collection[symbol] -= shares;
          if (this.collection[symbol] === 0) {
            delete this.collection[symbol];
          }
        } else {
          throw ("Not enough shares to sell.");
        }
      } else {
        throw ("Stock not found in the portfolio.");
      }
    }
  
    getShares(symbol) {
      return this.collection[symbol] || 0;
    }

}

export default Portfolio;