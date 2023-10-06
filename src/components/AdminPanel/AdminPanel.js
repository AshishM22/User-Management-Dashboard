import "./AdminPanel.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";

const AdminPanel = () => {
  const backendURL = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [selectedLine, setSelectedLine] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(backendURL);
      setUsers(response.data);
    };
    fetchData();
  }, []);

  // To implement pagination we will keep 5 users per page
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);

  // To delete single user through the icon provided at right side of each user
  const handleDelete = (id) => {
    const updatedUsers = users.filter((post) => post.id !== id);
    setUsers(updatedUsers);
  };

  // This function will be called when we press save Icon after performing required update on User
  const handleSave = (updatedItem) => {
    const updatedUsers = users.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setUsers(updatedUsers);
  };

  // Used to Select and Deselect Rows and store data in our selectedLine array
  const handleRowSelect = (e, user) => {
    const selected = e.target.checked;
    if (selected) {
      setSelectedLine((prevLine) => [...prevLine, user]);
    } else {
      setSelectedLine((prevLine) =>
        prevLine.filter((selectedRow) => selectedRow.id !== user.id)
      );
    }
  };

  // This function is triggered when checkBox at top left corner is clicked
  const handleSelectAll = (e) => {
    const selected = e.target.checked;
    if (selected) {
      setSelectedLine([...currentItems]);
    } else setSelectedLine([]);
  };

  // This function is similar to above Delete function but only difference here is it delete all the selected user at once
  const handleDeleteSelected = () => {
    const updatedUsers = users.filter((user) => !selectedLine.includes(user));
    setUsers(updatedUsers);
    setSelectedLine([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <header>
        <h2 className="main-heading">User Managment DashBoard</h2>
      </header>

      <main>
        <Table
          users={currentItems}
          handleDelete={handleDelete}
          handleSave={handleSave}
          handleSelectAll={handleSelectAll}
          handleRowSelect={handleRowSelect}
          selectedLine={selectedLine}
        />
      </main>

      <footer>
        <button className="delete-selected" onClick={handleDeleteSelected}>
          Delete Selected
        </button>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </footer>
    </section>
  );
};

export default AdminPanel;
