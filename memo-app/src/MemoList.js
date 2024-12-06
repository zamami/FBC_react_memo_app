import { useState } from "react";
import Form from "./Form";
import "./MemoList.css";

export default function MemoList() {
  const initialMemos =
      localStorage.getItem("Memos") === null
          ? []
          : JSON.parse(localStorage.getItem("Memos"));
  const [memos, setMemos] = useState(initialMemos);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [text, setText] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  function handleTextSet(e) {
    setText(e.target.value);
  }

  function saveMemos(nextMemos) {
    setMemos(nextMemos);
    localStorage.setItem("Memos", JSON.stringify(nextMemos));
  }

  function handleCreateMemo() {
    // 既存、新規メモを新しい配列に入れてstateで更新
    const nextMemos = [...memos, { id: crypto.randomUUID(), content: text }];
    setSelectedMemo(null);
    setText("");
    setFormVisible(false);
    saveMemos(nextMemos);
  }

  function handleUpdateMemo(){
    const nextMemos = memos.map((memo) =>
        memo.id === selectedMemo.id ? { ...memo, content: text } : memo,
    );
    setSelectedMemo(null);
    setFormVisible(false);
    saveMemos(nextMemos);
  }

  function handleDeleteMemo() {
    if (selectedMemo) {
      const nextMemos = memos.filter((memo) => memo.id !== selectedMemo.id);
      setSelectedMemo(null);
      setText("");
      setFormVisible(false);
      saveMemos(nextMemos);
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
            handleCreateMemo={handleCreateMemo}
            handleUpdateMemo={handleUpdateMemo}
            handleDeleteMemo={handleDeleteMemo}
            isEditing={selectedMemo !== null}
          />
        )}
      </div>
    </div>
  );
}
