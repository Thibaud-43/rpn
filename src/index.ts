import { popLastElement, pushNewElementToPile } from "./utils/pileUtils";

type Operator = "+" | "-" | "/" | "*";
type Operand = number;
type Expression = Array<Operand | Operator>;
type ErrorMessage = string;
// eslint-disable-next-line
type FunctionType = ({ first, second }: { first: number; second: number }) => number;

const mapper: Record<Operator, FunctionType> = {
  "+": ({ first, second }) => first + second,
  "-": ({ first, second }) => first - second,
  "/": ({ first, second }) => first / second,
  "*": ({ first, second }) => first * second,
};

type Pile = Array<number>;

const popLastTwoElementsFromPile = (pile: Pile): [{ last: number; penultimate: number }, Pile] => {
  const [last, newPile] = popLastElement(pile);
  const [penultimate, newPile2] = popLastElement(newPile);
  return [
    {
      last,
      penultimate,
    },
    newPile2,
  ];
};

const evaluateOperation = (operator: Operator, rest: Expression, pile: Pile): Operand | ErrorMessage => {
  if (pile.length < 2) {
    return "Two operands need to evaluate operation";
  }
  const [{ last, penultimate }, tmpPile] = popLastTwoElementsFromPile(pile);
  const operatorFunction = mapper[operator];
  const operationResult = operatorFunction({ first: penultimate, second: last });
  const newPile = pushNewElementToPile(tmpPile, operationResult);
  return evaluate(rest, newPile);
};

const stackOperandOnPile = (operand: Operand, rest: Expression, pile: Pile): Operand => {
  const newElement = pushNewElementToPile(pile, operand);

  return evaluate(rest, newElement);
};

const isOperator = (token: Operator | Operand): token is Operator => ["+", "-", "/", "*"].includes(token);
// eslint-disable-next-line consistent-return
function evaluate(expression: Expression, pile: Pile = []): Operand | ErrorMessage {
  if (!expression.length) {
    return pile[0];
  }

  const [token, ...rest] = expression;

  if (isOperator(token)) {
    return evaluateOperation(token, rest, pile);
  }
  return stackOperandOnPile(token, rest, pile);
}

export default evaluate;
