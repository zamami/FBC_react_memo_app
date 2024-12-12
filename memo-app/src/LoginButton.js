import "./MemoList.css";

export default function LoginButton({ isLoggedIn, onLoggedInChange }){
    return (
        <div className="login-button">
            <button type="button" onClick={onLoggedInChange}>
                {isLoggedIn ? "ログアウト" : "ログイン"}
            </button>
        </div>
    )
}