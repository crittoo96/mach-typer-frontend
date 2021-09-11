export interface ChunkOption {
  skipNextNode?: boolean;
  allowDuplicate_N?: boolean;
}
export class Chunk {
  alphabetPair: string[]; // 例:か ['k', 'a'];
  options: ChunkOption = {
    skipNextNode: false,
    allowDuplicate_N: false,
  };

  constructor(alphabetPair: string[], options?: ChunkOption) {
    this.alphabetPair = alphabetPair;

    if (options !== undefined) {
      if (options.skipNextNode !== undefined) {
        this.options.skipNextNode = options.skipNextNode;
      }
      if (options.allowDuplicate_N !== undefined) {
        this.options.allowDuplicate_N = options.allowDuplicate_N;
      }
    }
  }

  // ユーザーからの入力ごとに呼ばれる
  check(alphabetChar: string): boolean {
    if (alphabetChar === this.alphabetPair[0]) {
      return true;
    }
    return false;
  }

  isEmptyAlphabetPair(): boolean {
    return this.alphabetPair.length === 0 ? true : false;
  }
}
