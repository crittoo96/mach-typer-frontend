import { Chunk, ChunkOption } from "./Chunk";

// ひらがな1文字を格納する
export class HiraganaNode {
  c: string;
  setectedChunk: Chunk | null;
  chunks: Chunk[]; //例: 「か」 Chunk1: ['k', 'a'], Chunk2: ['c', 'a'],

  constructor(c: string, nextS?: string) {
    this.c = c;
    this.setectedChunk = null;
    this.chunks = this.getChunksFrom(c, nextS);
  }

  getFrontChunk(): Chunk | null {
    if (this.chunks.length === 0) {
      return null;
    }
    let chunk = this.chunks.shift();
    return chunk === undefined ? null : chunk;
  }

  createChunkInstance(
    alphabetPair: Array<string>,
    options?: ChunkOption
  ): Chunk {
    return new Chunk(alphabetPair, options);
  }

  // １文字のひらがなに対応するchunksを返却
  getChunksFrom(c: string, nextS?: string): Chunk[] {
    let chunks: Chunk[] = [];

    // ここの処理50音分、頑張るくん？？なんか変換ツールないのかな
    // 「そんな」のnが２つ重なるときの判定とか、「ん」のときの判定がだるい
    switch (c) {
      case "あ":
        chunks.push(this.createChunkInstance(["a"]));
        break;
      case "い":
        chunks.push(this.createChunkInstance(["i"]));
        break;
      case "う":
        chunks.push(this.createChunkInstance(["u"]));
        break;
      case "え":
        chunks.push(this.createChunkInstance(["o"]));
        break;
      case "お":
        chunks.push(this.createChunkInstance(["o"]));
        break;

      case "か":
        chunks.push(this.createChunkInstance(["k", "a"]));
        chunks.push(this.createChunkInstance(["c", "a"]));
        break;
      case "き":
        chunks.push(this.createChunkInstance(["k", "i"]));

        // きゃ
        if (nextS === "ゃ") {
          chunks.push(
            this.createChunkInstance(["k", "y", "a"], {
              skipNextNode: true,
            })
          );
        } else if (nextS === "ゅ") {
          chunks.push(
            this.createChunkInstance(["k", "y", "u"], {
              skipNextNode: true,
            })
          );
        } else if (nextS === "ょ") {
          chunks.push(
            this.createChunkInstance(["k", "y", "o"], {
              skipNextNode: true,
            })
          );
        }
        break;
      case "く":
        chunks.push(this.createChunkInstance(["k", "u"]));
        chunks.push(this.createChunkInstance(["c", "u"]));
        break;
      case "け":
        chunks.push(this.createChunkInstance(["k", "e"]));
        break;
      case "こ":
        chunks.push(this.createChunkInstance(["k", "o"]));
        chunks.push(this.createChunkInstance(["c", "o"]));
        break;

      case "さ":
        chunks.push(this.createChunkInstance(["s", "a"]));
        break;
      case "し":
        chunks.push(this.createChunkInstance(["s", "h", "i"]));
        chunks.push(this.createChunkInstance(["s", "i"]));
        break;
      case "す":
        chunks.push(this.createChunkInstance(["s", "u"]));
        break;
      case "せ":
        chunks.push(this.createChunkInstance(["s", "e"]));
        break;
      case "そ":
        chunks.push(this.createChunkInstance(["s", "o"]));
        break;

      case "た":
        chunks.push(this.createChunkInstance(["t", "a"]));
        break;
      case "ち":
        chunks.push(this.createChunkInstance(["t", "i"]));
        chunks.push(this.createChunkInstance(["c", "h", "i"]));
        break;
      case "つ":
        chunks.push(this.createChunkInstance(["t", "u"]));
        chunks.push(this.createChunkInstance(["t", "s", "u"]));
        break;
      case "て":
        chunks.push(this.createChunkInstance(["t", "e"]));
        break;
      case "と":
        chunks.push(this.createChunkInstance(["t", "o"]));
        break;

      case "な":
        chunks.push(this.createChunkInstance(["n", "a"]));
        break;
      case "に":
        chunks.push(this.createChunkInstance(["n", "i"]));
        break;
      case "ぬ":
        chunks.push(this.createChunkInstance(["n", "u"]));
        break;
      case "ね":
        chunks.push(this.createChunkInstance(["n", "e"]));
        break;
      case "の":
        chunks.push(this.createChunkInstance(["n", "o"]));
        break;

      case "は":
        chunks.push(this.createChunkInstance(["h", "a"]));
        break;
      case "ひ":
        chunks.push(this.createChunkInstance(["h", "i"]));
        break;
      case "ふ":
        chunks.push(this.createChunkInstance(["h", "u"]));
        chunks.push(this.createChunkInstance(["f", "u"]));
        break;
      case "へ":
        chunks.push(this.createChunkInstance(["h", "e"]));
        break;
      case "ほ":
        chunks.push(this.createChunkInstance(["h", "o"]));
        break;

      case "ま":
        chunks.push(this.createChunkInstance(["m", "a"]));
        break;
      case "み":
        chunks.push(this.createChunkInstance(["m", "i"]));
        break;
      case "む":
        chunks.push(this.createChunkInstance(["m", "u"]));
        break;
      case "め":
        chunks.push(this.createChunkInstance(["m", "e"]));
        break;
      case "も":
        chunks.push(this.createChunkInstance(["m", "o"]));
        break;

      case "や":
        chunks.push(this.createChunkInstance(["y", "a"]));
        break;
      case "ゆ":
        chunks.push(this.createChunkInstance(["y", "u"]));
        break;
      case "よ":
        chunks.push(this.createChunkInstance(["y", "o"]));
        break;

      case "ら":
        chunks.push(this.createChunkInstance(["r", "a"]));
        break;
      case "り":
        chunks.push(this.createChunkInstance(["r", "i"]));
        break;
      case "る":
        chunks.push(this.createChunkInstance(["r", "u"]));
        break;
      case "れ":
        chunks.push(this.createChunkInstance(["r", "e"]));
        break;
      case "ろ":
        chunks.push(this.createChunkInstance(["r", "o"]));
        break;

      case "わ":
        chunks.push(this.createChunkInstance(["w", "a"]));
        break;
      case "を":
        chunks.push(this.createChunkInstance(["w", "o"]));
        break;
      case "ん":
        // ここの実装かえる！！！
        if (nextS && !["な", "に", "ぬ", "ね", "の"].includes(nextS))
          chunks.push(
            this.createChunkInstance(["n"], { allowDuplicate_N: true })
          );

        chunks.push(this.createChunkInstance(["n", "n"]));
        chunks.push(this.createChunkInstance(["x", "n"]));
        break;

      /*濁音*/
      case "が":
        chunks.push(this.createChunkInstance(["g", "a"]));
        break;
      case "ぎ":
        chunks.push(this.createChunkInstance(["g", "i"]));
        break;
      case "ぐ":
        chunks.push(this.createChunkInstance(["g", "u"]));
        break;
      case "げ":
        chunks.push(this.createChunkInstance(["g", "e"]));
        break;
      case "ご":
        chunks.push(this.createChunkInstance(["g", "o"]));
        break;

      case "ざ":
        chunks.push(this.createChunkInstance(["z", "a"]));
        break;
      case "じ":
        chunks.push(this.createChunkInstance(["z", "i"]));
        chunks.push(this.createChunkInstance(["j", "i"]));
        break;
      case "ず":
        chunks.push(this.createChunkInstance(["z", "u"]));
        break;
      case "ぜ":
        chunks.push(this.createChunkInstance(["z", "e"]));
        break;
      case "ぞ":
        chunks.push(this.createChunkInstance(["z", "o"]));
        break;

      case "だ":
        chunks.push(this.createChunkInstance(["d", "a"]));
        break;
      case "ぢ":
        chunks.push(this.createChunkInstance(["d", "i"]));
        break;
      case "づ":
        chunks.push(this.createChunkInstance(["d", "u"]));
        break;
      case "で":
        chunks.push(this.createChunkInstance(["d", "e"]));
        break;
      case "ど":
        chunks.push(this.createChunkInstance(["d", "o"]));
        break;

      case "ば":
        chunks.push(this.createChunkInstance(["b", "a"]));
        break;
      case "び":
        chunks.push(this.createChunkInstance(["b", "i"]));
        break;
      case "ぶ":
        chunks.push(this.createChunkInstance(["b", "u"]));
        break;
      case "べ":
        chunks.push(this.createChunkInstance(["b", "e"]));
        break;
      case "ぼ":
        chunks.push(this.createChunkInstance(["b", "o"]));
        break;

      case "ぱ":
        chunks.push(this.createChunkInstance(["p", "a"]));
        break;
      case "ぴ":
        chunks.push(this.createChunkInstance(["p", "i"]));
        break;
      case "ぷ":
        chunks.push(this.createChunkInstance(["p", "u"]));
        break;
      case "ぺ":
        chunks.push(this.createChunkInstance(["p", "e"]));
        break;
      case "ぽ":
        chunks.push(this.createChunkInstance(["p", "o"]));
        break;

      case "ゃ":
        chunks.push(this.createChunkInstance(["x", "y", "a"]));
        chunks.push(this.createChunkInstance(["l", "y", "a"]));
        break;
      case "ゅ":
        chunks.push(this.createChunkInstance(["x", "y", "u"]));
        chunks.push(this.createChunkInstance(["l", "y", "u"]));
        break;
      case "ょ":
        chunks.push(this.createChunkInstance(["x", "y", "o"]));
        chunks.push(this.createChunkInstance(["l", "y", "o"]));
        break;

      default:
        break;
    }

    return chunks;
  }
}
