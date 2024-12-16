import { useContext } from "react";
import "./MemoList.css";
import { LoggedInContext } from "./LoginContext";


export default function LoginButton({onLoggedInChange}){
    const { loggedIn } = useContext(LoggedInContext);

    return (
        <div className="login-button">
            <button type="button" onClick={ onLoggedInChange }>
                {loggedIn ? "ログアウト" : "ログイン"}
            </button>
        </div>
    );
}