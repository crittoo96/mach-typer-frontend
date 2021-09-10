import React, { useState, useEffect, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Node, HiraganaList, Chunk } from "./lib/trans/index";
import { type } from "os";

function App() {
  const [text, setText] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentNode, setCurrentNode] = useState();
  // const [typeText, setTypeText] = useState("");

  // setTypeText("わたしか");
  // setTypeText("わたしか");
  const typeText = "きゃんたまきゅん";
  const h1Text = typeText;
  let inputFullText = "";
  let sampleInput = "";

  // 問題文からインスタンス生成
  let _nodeList: HiraganaList = new HiraganaList(typeText);
  let nodeList: Node[] = _nodeList.list;

  nodeList.forEach((node: Node) => {
    let chunk: Chunk = node.chunks[0];
    sampleInput += chunk.alphabetPair.join("");
  });

  // let exampleInput = "";

  // if
  // let Node = nodeList.list.shift();

  // const handleInputText = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ): void => {
  //   setInput(event.target.value);

  //   // nodeList[0].chunks[0].alphabetPair[0];
  // };

  // ひらがな文字の取得
  let checkNode = nodeList.shift();

  console.log(checkNode);

  const handleWrong = () => {
    setIsWrong(true);

    setTimeout(() => {
      setIsWrong(false);
    }, 330);
  };

  const escFunc = useCallback(
    (e: KeyboardEvent) => {
      // 入力文字の取得
      let inputKey: string = e.key;

      if (checkNode === undefined) {
        return;
      }

      // 入力をもとにchunkに存在するか確認する。存在したら、それを正式チャンクにする
      // 入力に応じて動的にチャンクが切り替わる様にすればいい
      let chunk: Chunk | undefined = checkNode.chunks.find((chk) =>
        chk.check(inputKey)
      );

      if (chunk !== undefined) checkNode.setectedChunk = chunk;
      else return;

      if (chunk.check(inputKey)) {
        for (let i = 0; i < checkNode.chunks.length; i++) {
          checkNode.chunks[i].alphabetPair.shift(); //先頭文字を削除
        }
        // chunk.alphabetPair.shift(); //先頭文字を削除
        inputFullText += inputKey;
        setText(inputFullText);

        // 現在のNodeのチャンクが空になったとき、次の文字に進める
        if (chunk.isEmptyAlphabetPair()) {
          if (nodeList.length > 0) {
            console.log(checkNode.c, chunk);
            if (chunk.skipNextNode) {
              nodeList.shift();
            }
            checkNode = nodeList.shift();
          } else {
            // 次の問題を出す
            // 終了判定
            console.log("Congraturation!!!");
            setIsEnd(true);
          }
        }
      } else {
        handleWrong();
      }
    },
    [nodeList, checkNode, inputFullText]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunc, false);
    // setCurrentNode(nodeList.shift());
  }, []);

  // console.log(input);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          {h1Text}
          <br />
          {sampleInput}
        </h1>
        <h2>{text}</h2>
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
}

export default App;
