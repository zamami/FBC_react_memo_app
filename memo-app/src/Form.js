export default function Form({text, handleTextSet, handleChangeMemo, isEditing, handleDeleteMemo }){
    return(
        <>
            <form>
                <textarea
                    cols="30"
                    rows="10"
                    value={text}
                    onChange={handleTextSet}
                ></textarea>
                <button type="button" onClick={handleChangeMemo}>
                    {isEditing ? "編集" : "追加" }
                </button>

                {isEditing && (
                    <button type="button" onClick={handleDeleteMemo}>
                        削除
                    </button>
                )}

            </form>
        </>
    )
}