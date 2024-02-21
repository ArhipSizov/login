import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pasvord, setPasvord] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function getLoginData(event) {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pasvord)
      .then((user) => {
        navigate("/");
      })
      .catch((e) => {
        setError(true);
      });
  }
  return (
    <div className="all_l">
      <form className="modal_l" onSubmit={getLoginData}>
        <p className="h1_l">Вход</p>
        <NavLink to="/Register" className="p_l">
          или у меня ещё нет аккаунта
        </NavLink>
        <input
          className="name_l"
          type="email"
          required
          placeholder="Ваш e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="passvord_l"
          type="password"
          required
          placeholder="Ваш пароль"
          value={pasvord}
          onChange={(e) => setPasvord(e.target.value)}
        />
        {error && <p className="error_l">Не верный логин или пароль</p>}
        <input type="submit" className="button_l" value="Войти" />
      </form>
    </div>
  );
}
