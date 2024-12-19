import "./MemoList.css";
import { useLoginStatus } from "./useLoginContext";

export default function LoginButton() {
  const { loggedIn, setLoggedIn } = useLoginStatus();

  function handleLoggedInChange() {
    setLoggedIn(!loggedIn);
  }

  return (
    <div className="login-button">
      <button type="button" onClick={handleLoggedInChange}>
        {loggedIn ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
}
