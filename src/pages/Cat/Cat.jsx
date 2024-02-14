import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cat.css";
import { v4 as uuidv4 } from "uuid";
import {getAuth} from "firebase/auth"

export default function Cat() {
  var length = 40,
    array = new Array(length);
  while (length--) {
    array[length] = "/cats/cat_" + length + ".jpg"
  }


  const navigate = useNavigate();

  useEffect(() => {
    const unscribe = getAuth().onAuthStateChanged(async ()=>{
      unscribe()
      const {currentUser} = getAuth()
      if (!currentUser) {
        navigate("/login")
      }
    })
  }, []);



  return (
    <div className="div_cats">
      {array.map((item) => (
        <div className="div_cat" key={uuidv4()}>
          <img className="img_cat" src={item} alt="" />
        </div>
      ))}
    </div>
  );
}
