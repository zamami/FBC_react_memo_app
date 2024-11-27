import { useState } from "react";
import Form from "./Form";
import "./MemoList.css";

let initialMemos =
    localStorage.getItem("Memos") === null
        ? []
        : JSON.parse(localStorage.getItem("Memos"));

export default function MemoList() {

  const [memos, setMemos] = useState(initialMemos);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [text, setText] = useState("");

  function handleTextSet(e) {
      setText(e.target.value);
  }

  function handleAddMemo(){
      // 既存、新規メモを新しい配列に入れてstateで更新
      const nextMemos = [ ...memos, {id: crypto.randomUUID(), content: text} ];
      setMemos(nextMemos);
      setSelectedMemo(null);
      setText("");
      localStorage.setItem("Memos", JSON.stringify(nextMemos));
  }

  // add memo or edit memo
  function handleChangeMemo(e) {
      e.preventDefault();
      if (selectedMemo){
          const nextMemos = memos.map( memo =>
          memo.id === selectedMemo.id ? {...memo, content: text} : memo
          );
          localStorage.setItem("Memos", JSON.stringify(nextMemos));
          setMemos(nextMemos);
          setSelectedMemo(null);
      } else {
          handleAddMemo();
      }
      setText("");
  }

  function handleDeleteMemo() {
      if (selectedMemo){
          const nextMemos = memos.filter(memo => memo.id !== selectedMemo.id);
          setMemos(nextMemos);
          localStorage.setItem("Memos", JSON.stringify(nextMemos));
          setSelectedMemo(null);
          setText("");
      }
  }

  // メモを選択してstateに保存
  function handleSelectMemo(memo) {
      setSelectedMemo(memo);
      setText(memo.content);
  }

  function handleResetMemo() {
      setSelectedMemo(null);
      setText("");
  }

  return (
      <div className="container">
          <h1>メモ一覧</h1>
          <ul>
              {memos.map((memo) => (
                  <li
                      key={memo.id}
                      className="memo-item"
                      onClick={() => handleSelectMemo(memo)}
                  >
                      {memo.content.split("\n")[0]}
                  </li>
              ))}
              <li onClick={handleResetMemo}>+</li>
          </ul>
          <Form
              text={text}
              handleTextSet={handleTextSet}
              handleChangeMemo={handleChangeMemo}
              handleDeleteMemo={handleDeleteMemo}
              isEditing={selectedMemo !== null}
          />
      </div>
      );

};