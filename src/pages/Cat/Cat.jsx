import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./Cat.css";
import { v4 as uuidv4 } from "uuid";

export default function Cat() {
  var length = 40,
    array = new Array(length);
  while (length--) {
    array[length] = "/cats/cat_" + length + ".jpg";
  }

  const [user, setUser] = useState();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        setUser({
          email: null,
          displayName: null,
        });
        return;
      }
      setUser({
        displayName: currentUser.displayName,
        email: currentUser.email,
      });
    });
  }, []);

  function signOutUser() {
    signOut(auth).then(() => {
      setUser({
        email: null,
        displayName: null,
      });
    });
  }

  function sliceUserInitial(string) {
    return string
      ?.trim()
      .split(' ')
      .map(word => word[0])
      .join("");
  }

  if (!user) {
    return <h1>Загрузка...</h1>;
  }

  return (
    <div className="div_cats">
      <div onClick={signOutUser} className="div_logOut">
        Смотреть котиков не от имени {user.displayName}?({sliceUserInitial(user.displayName)})
      </div>
      {array.map((item) => (
        <div className="div_cat" key={uuidv4()}>
          <img className="img_cat" src={item} alt="" />
        </div>
      ))}
    </div>
  );
}
