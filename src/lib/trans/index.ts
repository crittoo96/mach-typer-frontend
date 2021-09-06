// 組み合わせ、
interface Chunk {
  alphabetPair: string[]; // 例:か ['k', 'a'];
}

// ひらがな1文字を格納する
class HiraganaChar {
  c: string;
  chunks: Chunk[]; //例: 「か」 Chunk1: ['k', 'a'], Chunk2: ['c', 'a'],

  constructor(c: string, chunks: Chunk[]) {
    this.c = c;
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
  list: HiraganaChar[];

  constructor(str: string) {
    this.list = this.parse(str);
  }

  // 入力文字列をHiraganaCharにパースする
  parse(str: string): HiraganaChar[] {
    let list: HiraganaChar[] = [];

    for (let i = 0; i < str.length; i++) {
      list.push(new HiraganaChar(str[i], this.getChunksFrom(str[i])));
    }

    return list;
  }

  // １文字のひらがなに対応するchunksを返却
  getChunksFrom(c: string): Chunk[] {
    let chunks: Chunk[] = [];

    // TODO: test-code わがは
    // ここの処理50音分、頑張るくん？？なんか変換ツールないのかな
    switch (c) {
      case "わ":
        chunks.push({ alphabetPair: ["w", "a"] });
        break;
      case "た":
        chunks.push({ alphabetPair: ["t", "a"] });
        break;
      case "し":
        chunks.push({ alphabetPair: ["s", "h", "i"] });
        chunks.push({ alphabetPair: ["s", "i"] });
        break;
      case "か":
        chunks.push({ alphabetPair: ["k", "a"] });
        chunks.push({ alphabetPair: ["c", "a"] });
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
