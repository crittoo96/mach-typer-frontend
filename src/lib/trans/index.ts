// 組み合わせ、
export class Chunk {
  alphabetPair: string[]; // 例:か ['k', 'a'];

  constructor(alphabetPair: string[]) {
    this.alphabetPair = alphabetPair;
  }

  // ユーザーからの入力ごとに呼ばれる
  check(alphabetChar: string): boolean {
    if (alphabetChar === this.alphabetPair[0]) {
      console.log("ping pong!!");
      return true;
    }
    console.log("tigauyo!!");
    return false;
  }

  isEmptyAlphabetPair(): boolean {
    return this.alphabetPair.length === 0 ? true : false;
  }
}

// ひらがな1文字を格納する
export class Node {
  c: string;
  setectedChunk: Chunk | null;
  chunks: Chunk[]; //例: 「か」 Chunk1: ['k', 'a'], Chunk2: ['c', 'a'],

  constructor(c: string, chunks: Chunk[]) {
    this.c = c;
    this.setectedChunk = null;
    this.chunks = chunks;
  }

  getFrontChunk(): Chunk | null {
    if (this.chunks.length === 0) {
      return null;
    }
    let chunk = this.chunks.shift();
    return chunk === undefined ? null : chunk;
  }
}

export class HiraganaList {
  list: Node[];

  constructor(str: string) {
    this.list = this.parse(str);
  }

  // 入力文字列をNodeにパースする
  parse(str: string): Node[] {
    let list: Node[] = [];

    for (let i = 0; i < str.length; i++) {
      let chunks: Chunk[] = this.getChunksFrom(str[i]);
      list.push(new Node(str[i], chunks));
    }

    return list;
  }

  // １文字のひらがなに対応するchunksを返却
  getChunksFrom(c: string): Chunk[] {
    let chunks: Chunk[] = [];

    // TODO: test-code わがは
    // ここの処理50音分、頑張るくん？？なんか変換ツールないのかな
    // 「そんな」のnが２つ重なるときの判定とか、「ん」のときの判定がだるい
    switch (c) {
      case "た":
        chunks.push(new Chunk(["t", "a"]));
        break;
      case "し":
        chunks.push(new Chunk(["s", "h", "i"]));
        chunks.push(new Chunk(["s", "i"]));
        break;
      case "か":
        chunks.push(new Chunk(["k", "a"]));
        chunks.push(new Chunk(["c", "a"]));
        break;
      case "わ":
        chunks.push(new Chunk(["w", "a"]));
        break;

      default:
        break;
    }

    return chunks;
  }
}

// 入力文字をキューとして貯める必要はあるのか？
// 途中入力がOKになっているから1文字単位のOKじゃなくね？
// か」
