import { useState } from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Register() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [resPasvord, setResPasvord] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState(false);
  const [pasvord, setPasvord] = useState("");
  const navigate = useNavigate();
  function getRegisterData(event) {
    event.preventDefault();
    if (resPasvord !== pasvord) {
      setError(true);
      return;
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, pasvord)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: lastName + " " + firstName,
          })
            .then(() => {
              navigate("/");
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  }
  return (
    <div className="all_r">
      {showModal && (
        <div className="all_d" onClick={() => setShowModal(false)}>
          <p>
            1. Вы согласны с тем что мы будем собирать все возможные данные от
            вас и продавать их
          </p>
          <p>
            2. После принятия вы никогда не сможете рассторгнуть это соглашение
          </p>
          <p>3. Вы продаёте нам свою душу и души ваших детей до 7 колена</p>
        </div>
      )}
      <form className="modal_r" onSubmit={getRegisterData}>
        <p className="h1_r">Регистрация</p>
        <NavLink to="/Login" className="p_r">
          или у меня уже есть аккаунт
        </NavLink>
        <input
          required
          className="name_r"
          type="email"
          placeholder="Ваш e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="passvord_r"
          type="password"
          placeholder="Ваш пароль"
          value={pasvord}
          onChange={(e) => setPasvord(e.target.value)}
        />
        <input
          required
          className="passvord_r"
          type="password"
          placeholder="Повторите ваш пароль"
          value={resPasvord}
          onChange={(e) => setResPasvord(e.target.value)}
        />
        {error && <p className="error_r">Пароли не совпадают</p>}
        <input
          required
          className="passvord_r"
          type="text"
          placeholder="Ваше имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
                <input
          required
          className="passvord_r"
          type="text"
          placeholder="Ваша фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div>
          <input required className="radio" type="radio" />
          <p className="p_radio1">Вы прочитали и согласны с </p>
          <a
            onClick={() => setShowModal(true)}
            className="p_radio2"
            to="/document"
          >
            соглашением
          </a>
        </div>
        <input type="submit" className="button_l" value="Войти" />
      </form>
    </div>
  );
}
