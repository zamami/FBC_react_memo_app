import { useState } from "react";
import Form from "./Form";
import "./MemoList.css";


const initialMemos =
    [
        {　id: 0, content: "memo1\nメモ１の内容です。\nメモ１の内容です。\nメモ１の内容です。\n",},
        {　id: 1, content: "memo2\nメモ2の内容です。\nメモ2の内容です。\nメモ2の内容です。\n",},
        {　id: 2, content: "memo3\nメモ3の内容です。\nメモ3の内容です。\nメモ3の内容です。\n",},
        {　id: 3, content: "memo4\nメモ4の内容です。\nメモ4の内容です。\nメモ4の内容です。\n",},
    ];
let nextMemoId = 4;

export default function MemoList() {

  const [memos, setMemos] = useState(initialMemos);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [text, setText] = useState("");

  function handleTextSet(e) {
      setText(e.target.value);
  }

  function handleAddMemo(){
      // 既存、新規メモを新しい配列に入れてstateで更新
      const nextMemo = [ ...initialMemos, {id: nextMemoId++, content: text} ];
      setMemos(nextMemo);
      setSelectedMemo(null);
      setText("");
  }

  // add memo or edit memo
  function handleChangeMemo(e) {
      e.preventDefault();
      if (selectedMemo){
          setMemos(memos.map( memo =>
          memo.id === selectedMemo.id ? {...memo, content: text} : memo
          ));
          setSelectedMemo(null);
      } else {
          handleAddMemo();
      }
      setText("");
  }

  function handleDeleteMemo() {
      if (selectedMemo){
          setMemos(memos.filter(memo => memo.id !== selectedMemo.id));
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