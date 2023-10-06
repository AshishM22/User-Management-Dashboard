import Table from "../Table/Table";
import "./AdminPanel.css";
import axios from "axios";
import { useState, useEffect } from "react";

import React from "react";
import Pagination from "../Pagination/Pagination";

const AdminPanel = () => {
  const backendURL = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(backendURL);
      // console.log(response.data);
      setUsers(response.data);
    };
    fetchData();
  }, []);

  return (
    <section>
      <header>
        <h2 className="main-heading">User Managment DashBoard</h2>
      </header>

      <main>
        <Table />
      </main>

      <footer>
        <button className="delete-selected">Delete Selected</button>

        <Pagination />
      </footer>
    </section>
  );
};

export default AdminPanel;
