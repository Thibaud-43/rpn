export const popLastElement = <T>(pile: Array<T>): [T, Array<T>] => {
  return [pile[pile.length - 1], pile.slice(0, pile.length - 1)];
};

export const pushNewElementToPile = <T>(pile: Array<T>, newElement: T): Array<T> => [...pile, newElement];
