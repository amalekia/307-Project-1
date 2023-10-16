import Portfolio from "./portfolio";
//--------------------------------------------------------------------------------------------
//PORTFOLIO TEST CASES
//--------------------------------------------------------------------------------------------

test('Testing Portfolio creation and emptiness -- success', () => {
    const got = new Portfolio();
    expect(got.collection).toEqual({});
    expect(got.isEmpty).toBeTruthy();
})

test('Testing the countTickers func -- success', () => {
    const p = new Portfolio();
    p.collection["APP"] = 1;
    p.collection["STK"] = 2;
    expect(p.countTickers()).toEqual(2);
})

test('Testing the purchaseStock and verifying table -- success', () => {
    const p = new Portfolio();
    p.purchaseStock("ADR", 4);
    expect(p.countTickers()).toEqual(1);
    expect(p.collection["ADR"]).toEqual(4);

    p.purchaseStock("ADR", 4);
    expect(p.countTickers()).toEqual(1);
    expect(p.collection["ADR"]).toEqual(8);

    p.purchaseStock("KYL", 4);
    expect(p.countTickers()).toEqual(2);
    expect(p.collection["KYL"]).toEqual(4);
})

test('Testing the sell stock and verifying the table -- success', () => {
    const p = new Portfolio();
    p.purchaseStock("KYB", 3);
    p.purchaseStock("FMF", 2);

    p.sellStock("KYB", 2);
    expect(p.collection["KYB"]).toEqual(1);
})

test('Testing the number of shares for a given symbol -- success', () => {
    const p = new Portfolio();
    p.purchaseStock("KYB", 3);
    p.purchaseStock("FMF", 2);

    expect(p.getShares("FMF")).toEqual(2);
    expect(p.getShares("KYB")).toEqual(3);
    expect(p.getShares("PIS")).toEqual(0);
})

test('Testing the if all symbols have shares > 0 -- success', () => {
    const p = new Portfolio();
    p.purchaseStock("KYB", 3);
    p.purchaseStock("FMF", 2);
    p.purchaseStock("FHD", 0);

    let res = "pass";

    for (const symbol in p.collection) {
        if (p.collection[symbol] === 0) {
            res = "fail";
        }
    }
    expect(res).toBe("pass")
})

test('Cannot sell more shares than owned when using sellStock() -- success', () => {
    const p = new Portfolio();
    p.purchaseStock("KYB", 3);
    p.purchaseStock("FMF", 2);

    expect(() => {
        p.sellStock("KYB", 4);
    }).toThrow('Not enough shares to sell.');
})

test('Cannot find stock in portfolio when using sellStock() -- success', () => {
    const p = new Portfolio();
    p.purchaseStock("KYB", 3);
    p.purchaseStock("FMF", 2);

    expect(() => {
        p.sellStock("POOP", 4);
    }).toThrow('Stock not found in the portfolio.');
})
