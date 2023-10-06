import "./NewUser.css";
import React from "react";
import { useState } from "react";

const NewUser = ({ submitNewUser, name, email, setName, setEmail }) => {
  return (
    <form className="new-user-registration" onSubmit={submitNewUser}>
      <h4>New User Registration</h4>

      <input
        type="text"
        placeholder="Full Name....."
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      <input
        type="text"
        placeholder="Email....."
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default NewUser;
