const a = 5;
const b = 10;

const plus = () => {
  return a + b;
};

const minus = () => {
  return a - b;
};
// calculator.js에서 값을 보내고
export default { a, b, plus, minus };
