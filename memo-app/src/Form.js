import { useLoginStatus } from "./useLoginContext";

export default function Form({
  text,
  handleTextSet,
  handleCreateMemo,
  handleUpdateMemo,
  isEditing,
  handleDeleteMemo,
}) {
  const { loggedIn } = useLoginStatus();

  return (
    <>
      <form>
        <textarea
          value={text}
          onChange={handleTextSet}
          disabled={!loggedIn}
        ></textarea>
        <div className="button-group">
          {loggedIn &&
            (isEditing ? (
              <>
                <button type="button" onClick={handleUpdateMemo}>
                  編集
                </button>
                <button type="button" onClick={handleDeleteMemo}>
                  削除
                </button>
              </>
            ) : (
              <button type="button" onClick={handleCreateMemo}>
                追加
              </button>
            ))}
        </div>
      </form>
    </>
  );
}
