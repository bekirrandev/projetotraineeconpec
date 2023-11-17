/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import Logo from "../assets/logo.svg";
import UserIcon from "../assets/user_icon.svg";
import CornerTires from "../assets/corner_tires.svg";
import "../css/Login.css";

const LoginComp = (props: any): any => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="LoginComp">
      <div className="login">
        <div className="login-left">
          <div className="CornerTires">
            <img src={CornerTires} alt="Corner tires" />
          </div>

          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
        </div>
        <div className="login-right">
          <div className="UserIcon">
            <img src={UserIcon} alt="User icon" />
          </div>

          <div className="loginInputEmail">
            <input type="text" placeholder="Email" autoFocus required value={email} onChange={(e):any => setEmail(e.target.value)} />
            <p className="errorMsg">{emailError}</p>
          </div>

          <div className="loginInputPassword">
            <input type="password" placeholder="Senha" required value={password} onChange={(e):any => setPassword(e.target.value)} />
            <p className="errorMsg">{passwordError}</p>
          </div>

          <div className="loginButton">
            <button type="submit" onClick={handleLogin}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginComp;
