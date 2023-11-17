/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-lone-blocks */
<<<<<<< HEAD:src/Pages/login.tsx
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Firebase from "../config/firebase";
import LoginComp from "../components/LoginComp";
=======
import React from 'react';
import Logo from "../assets/logo.svg";
import UserIcon from "../assets/user_icon.svg";
import CornerTires from "../assets/corner_tires.svg";
import "../css/Login.css";
>>>>>>> dea5e52a2957f35c5bdac690c7fb0ae4c67394e2:src/pages/Login.tsx

function Login(): JSX.Element {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [erro, setErro] = useState(false);
  

  const clearInputs = (): any => {
    setEmail("");
    setPassword("");
  };

    async function handleLogin():Promise<any> {
    setErro(false);
    await Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err: { code: any; message: React.SetStateAction<string> }) => {
        setErro(true);
        
        switch (err.code) {
          case "auth/invalid-email":
            setPasswordError("");
            setEmailError("E-mail inválido");
            break;
          case "auth/user-disabled":
            setPasswordError("");
            setEmailError("Usuário desativado");
            break;
          case "auth/user-not-found":
            setPasswordError("");
            setEmailError("Usuário não existe!");
            break;
          case "auth/wrong-password":
            setEmailError("");
            setPasswordError("Senha incorreta");
            break;
          default:
        }
      }).then((result) => {
        if(!(result === undefined)){
          history.push('/home');
        }
      });
  };

  const handleLogout = (): any => {
    Firebase.auth().signOut();
  };

  const authListener = (): any => {
    // eslint-disable-next-line @typescript-eslint/no-shadow

    Firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

<<<<<<< HEAD:src/Pages/login.tsx
  useEffect((): any => {
    authListener();
  }, []);
=======
                <div className="loginInputPassword">
                    <input type="password"
                        placeholder="Senha" />
                </div>
>>>>>>> dea5e52a2957f35c5bdac690c7fb0ae4c67394e2:src/pages/Login.tsx

  return (
    <div className="Login">
      <LoginComp
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
}

<<<<<<< HEAD:src/Pages/login.tsx
export default Login;
=======

*/}
>>>>>>> dea5e52a2957f35c5bdac690c7fb0ae4c67394e2:src/pages/Login.tsx
