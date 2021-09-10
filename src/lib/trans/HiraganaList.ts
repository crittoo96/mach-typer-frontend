import { HiraganaNode } from "./HiraganaNode";

export class HiraganaList {
  list: HiraganaNode[];

  constructor(str: string) {
    this.list = this.parse(str);
  }

  // 入力文字列をHiraganaNodeにパースする
  parse(str: string): HiraganaNode[] {
    let list: HiraganaNode[] = [];

    for (let i = 0; i < str.length; i++) {
      // 次の文字が存在するなら、拗音のために次の文字を預ける
      i + 1 < str.length
        ? list.push(new HiraganaNode(str[i], str[i + 1]))
        : list.push(new HiraganaNode(str[i]));
    }

    return list;
  }
}
