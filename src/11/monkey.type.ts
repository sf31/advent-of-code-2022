export type Monkey = {
  id: number;
  items: number[];
  myWorry: (item: number) => number;
  nextMonkeyId: (myWorry: number) => number;
};

export type Operation = {
  op: string;
  arg: number;
};
