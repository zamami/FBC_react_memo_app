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
  const [formVisible, setFormVisible] = useState(false);

  function handleTextSet(e) {
    setText(e.target.value);
  }

  function handleAddMemo() {
    // 既存、新規メモを新しい配列に入れてstateで更新
    const nextMemos = [...memos, { id: crypto.randomUUID(), content: text }];
    setMemos(nextMemos);
    setSelectedMemo(null);
    setText("");
    localStorage.setItem("Memos", JSON.stringify(nextMemos));
    setFormVisible(false);
  }

  // add memo or edit memo
  function handleChangeMemo(e) {
    e.preventDefault();
    if (selectedMemo) {
      const nextMemos = memos.map((memo) =>
        memo.id === selectedMemo.id ? { ...memo, content: text } : memo,
      );
      localStorage.setItem("Memos", JSON.stringify(nextMemos));
      setMemos(nextMemos);
      setSelectedMemo(null);
      setFormVisible(false);
    } else {
      handleAddMemo();
    }
    setText("");
  }
  function handleDeleteMemo() {
    if (selectedMemo) {
      const nextMemos = memos.filter((memo) => memo.id !== selectedMemo.id);
      setMemos(nextMemos);
      localStorage.setItem("Memos", JSON.stringify(nextMemos));
      setSelectedMemo(null);
      setText("");
      setFormVisible(false);
    }
  }

  // メモを選択してstateに保存
  function handleSelectMemo(memo) {
    setSelectedMemo(memo);
    setText(memo.content);
    setFormVisible(true);
  }

  function handleResetMemo() {
    setSelectedMemo(null);
    setText("");
    setFormVisible(true);
  }

  return (
    <div className="memo-list-container">
      <div className="memo-list-header">
        <h1>メモ一覧</h1>
      </div>
      <div className="memo-list-body">
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
          <li className="memo-item" onClick={handleResetMemo}>
            +
          </li>
        </ul>
        {formVisible && (
          <Form
            text={text}
            handleTextSet={handleTextSet}
            handleChangeMemo={handleChangeMemo}
            handleDeleteMemo={handleDeleteMemo}
            isEditing={selectedMemo !== null}
          />
        )}
      </div>
    </div>
  );
}
