import "./NewUser.css";
import React from "react";
import { useState } from "react";
const validator = require("validator");

const NewUser = ({ submitNewUser, name, email, setName, setEmail }) => {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateForm = () => {
    let isValid = true;

    // Validate Name
    if (name.trim() === "") {
      setNameError("Full Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate Email
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validator.isEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      submitNewUser();
      // setName("");
      // setEmail("");
    }
  };

  return (
    <form className="new-user-registration" onSubmit={handleSubmit}>
      <h4>New User Registration</h4>

      <input
        type="text"
        placeholder="Full Name....."
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      {nameError && <p className="error-message">{nameError}</p>}

      <input
        type="text"
        placeholder="Email....."
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      {emailError && <p className="error-message">{emailError}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewUser;
