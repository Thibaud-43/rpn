type Operator = "+" | "-" | "/" | "*";
type Operand = number;
type Expression = Array<Operand | Operator>;

const getTwoLastNumber = (pile: Array<number>) => {
  return { last: pile[pile.length - 1], penultimate: pile[pile.length - 2] };
};

const isOperator = (token: Operator | Operand): token is Operator => ["+", "-", "/", "*"].includes(token);
// eslint-disable-next-line consistent-return
const evaluate = (expression: Expression, pile: Array<number> = []): Operand => {
  if (!expression.length) return pile[0];
  const [token, ...rest] = expression;
  if (isOperator(token)) {
    const { last, penultimate } = getTwoLastNumber(pile);
    const newPile = pile.slice(0, pile.length - 2);
    switch (token) {
      case "+":
        return evaluate(rest, [...newPile, penultimate + last]);
      case "-":
        return evaluate(rest, [...newPile, penultimate - last]);
      case "/":
        return evaluate(rest, [...newPile, penultimate / last]);
      case "*":
        return evaluate(rest, [...newPile, penultimate * last]);
    }
  }
  return evaluate(rest, [...pile, token]);
};

export default evaluate;
