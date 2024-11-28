export default function Form({text, handleTextSet, handleChangeMemo, isEditing, handleDeleteMemo }){
    return(
        <>
            <form>
                <textarea
                    value={text}
                    onChange={handleTextSet}
                ></textarea>
                <div className="button-group">
                    <button type="button" onClick={handleChangeMemo}>
                        {isEditing ? "編集" : "追加" }
                    </button>

                    {isEditing && (
                        <button type="button" onClick={handleDeleteMemo}>
                            削除
                        </button>
                    )}
                </div>
            </form>
        </>
    )
}