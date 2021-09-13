import React, { useState, useEffect, useCallback } from "react";

import { HiraganaList } from "../lib/trans/HiraganaList";
import { HiraganaNode } from "../lib/trans/HiraganaNode";
import { Chunk } from "../lib/trans/Chunk";

// materialUI componets

export const TypingGame = () => {
  const [text, setText] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [typeText, setTypeText] = useState("うんこ");
  const [nodeListManager, setNodeListManager] = useState<HiraganaList>(
    new HiraganaList(typeText)
  );
  const [sampleInput, setSampleInput] = useState("");

  let currentNode: HiraganaNode | undefined;
  let allowDuplicateN = false;

  console.log(nodeListManager);

  const handleWrong = () => {
    setIsWrong(true);

    setTimeout(() => {
      setIsWrong(false);
    }, 330);
  };

  // 長い文字を分割する（クソコード）->保存段階で分割しとくのがよろし！
  const splitByChunk = (str: string, size: number): Array<string> => {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);
    for (let i = 0, x = 0; i < numChunks; ++i, x += size) {
      chunks[i] = str.substr(x, size);
    }
    return chunks;
  };

  const escFunc = useCallback((e: KeyboardEvent) => {
    // 入力文字の取得
    let inputKey: string = e.key;

    if (currentNode === undefined) {
      console.log("currentNOde: ", currentNode);
      return;
    }

    if (allowDuplicateN && inputKey === "n") {
      setText((prevText) => prevText + inputKey);
      allowDuplicateN = false;
      return;
    }
    // 入力をもとにchunkに存在するか確認する。存在したら、それを正式チャンクにする
    // 入力に応じて動的にチャンクが切り替わる様にすればいい
    let chunk: Chunk | undefined = currentNode.chunks.find((chk) =>
      chk.check(inputKey)
    );

    if (chunk !== undefined) {
      currentNode.setectedChunk = chunk;
    } else {
      handleWrong();
      return;
    }

    if (chunk.check(inputKey)) {
      for (let i = 0; i < currentNode.chunks.length; i++) {
        currentNode.chunks[i].alphabetPair.shift(); //先頭文字を削除
      }

      // 「ん」のときを考慮する（クソ実装）
      allowDuplicateN = !!chunk.options.allowDuplicate_N;

      setText((prevText) => prevText + inputKey); // キータイプ入力を更新

      // 現在のNodeのチャンクが空になったとき、次の文字に進める
      if (chunk.isEmptyAlphabetPair()) {
        if (nodeListManager.nodeIndex < nodeListManager.list.length) {
          if (chunk.options.skipNextNode) {
            nodeListManager.getNextNode();
          }
          currentNode = nodeListManager.getNextNode();
          if (currentNode === undefined) {
            console.log("Congraturation!!!");
            setIsEnd(true);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunc, false);
    currentNode = nodeListManager.getNextNode();
  }, []);

  const renderingSample = () => {
    let sample = "";
    nodeListManager.list.forEach((node: HiraganaNode) => {
      if (!node.done) {
        let chunk: Chunk = node.setectedChunk
          ? node.setectedChunk
          : node.chunks[0];
        sample += chunk.alphabetPair.join("");
      }
    });
    return <p>{sample}</p>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {/* {splitByChunk(typeText, 50).map((chunkStr) => {
            return <p>{chunkStr}</p>;
          })} */}
          {nodeListManager.list.map((node: HiraganaNode, index: number) => (
            <span key={index}>{node.c}</span>
          ))}
          <br />
          {/* {renderingSample()} */}
        </p>
        <p>{text}</p>
        <div>
          {isEnd && <p>Congraturation!!</p>}
          {isWrong && <p>Wrong!!</p>}
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
