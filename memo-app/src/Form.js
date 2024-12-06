export default function Form({
  text,
  handleTextSet,
  handleCreateMemo,
  handleUpdateMemo,
  isEditing,
  handleDeleteMemo,
}) {
  return (
    <>
      <form>
        <textarea value={text} onChange={handleTextSet}></textarea>
        <div className="button-group">
          {isEditing ? (
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
          )}
        </div>
      </form>
    </>
  );
}
