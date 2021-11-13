import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectAndSaveToken } from "../api/connection";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  //navigation
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState();
  const [pswErr, setPswError] = useState();
  const [messageError, setMessageError] = useState();
  const [formData, setFormData] = useState(initialFormData);

  //handle form fields values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  //handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    //import fn to make post request get token and save to LS
    connectAndSaveToken(
      formData,
      navigate,
      setUsernameError,
      setPswError,
      setMessageError,
      dispatch
    );
  };

  return (
    <div>
      <form action="/login">
        <h2>Log in</h2>
        <div className="message error"> {messageError}</div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required onChange={handleChange} />
        <div className="username error"> {usernameError}</div>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
        />
        <div className="password error">{pswErr} </div>
        <button onClick={handleSubmit}>Log in</button>
      </form>
    </div>
  );
}
