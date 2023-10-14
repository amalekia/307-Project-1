import mut from './module.js'; // MUT = Module Under Test
import Portfolio from './portfolio.js'

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected =0;
    const got = mut.div(0, 18);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 0.5;
    const got = mut.div(1, 2);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 0.5;
    const got = mut.div(1, 2);
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
    const expected = true;
    const got = mut.containsNumbers("2532452345.23454");
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
    const got = mut.containsNumbers("eernrhegeg");
    expect(got).toBeFalsy();
});

test('Testing containsNumbers -- success', () => {
    const got = mut.containsNumbers("eernr4hegeg");
    expect(got).toBeTruthy();
});

test('Testing containsNumbers -- success', () => {
    const got = mut.containsNumbers("");
    expect(got).toBeFalsy();
});

test('Testing containsNumbers -- success', () => {
    const got = mut.containsNumbers("adfivbifb1");
    expect(got).toBeTruthy();
});

test('Testing containsNumbers -- success', () => {
    const got = mut.containsNumbers("1adfivbifb");
    expect(got).toBeTruthy();
});