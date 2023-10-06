import "./AdminPanel.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import NewUser from "../NewUser/NewUser";

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

  // State to check weather new User form is visible
  const [newUserForm, setNewUserForm] = useState(false);

  // State to store new User Details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // To delete single user through the icon provided at right side of each user
  const handleDelete = async (id) => {
    try {
      // First we will send Delete request to backend Api using Axios
      const deleteURL = `${backendURL}/id`;
      axios.delete(deleteURL);

      // We will update our state to remove that user
      const updatedUsers = users.filter((post) => post.id !== id);
      setUsers(updatedUsers);
    } catch (err) {
      window.alert(err);
    }
  };

  // This function will be called when we press save Icon after performing required update on User
  const handleSave = async (updatedItem) => {
    try {
      const id = updatedItem.id;

      const updateURL = `${backendURL}/${id}`;
      const response = await axios.put(updateURL, updatedItem);
      console.log(response);

      const updatedUsers = users.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      setUsers(updatedUsers);
    } catch (err) {
      window.alert(err);
    }
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
  const handleDeleteSelected = async () => {
    try {
      for (const user of selectedLine) {
        await axios.delete(`${backendURL}/${user.id}`);
      }
      const updatedUsers = users.filter((user) => !selectedLine.includes(user));
      setUsers(updatedUsers);
      setSelectedLine([]);
    } catch (err) {
      window.alert(err);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const submitNewUser = async (e) => {
    try {
      const newUser = {
        name: name,
        email: email,
        id: users.length + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      };

      const response = await axios.post(backendURL, newUser);
      setUsers([...users, newUser]);
      setName("");
      setEmail("");
    } catch (err) {
      window.alert(err);
    }
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

      <div className="user-management-section">
        <button className="delete-selected" onClick={handleDeleteSelected}>
          Delete Selected
        </button>

        {/* This button will show or hide the New user registration form i.e It will toggle the state  */}
        <button
          className="add-user--button"
          onClick={() => setNewUserForm(!newUserForm)}
        >
          Register New User
        </button>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <footer>
        {newUserForm && (
          <NewUser
            name={name}
            email={email}
            setName={setName}
            setEmail={setEmail}
            submitNewUser={submitNewUser}
          />
        )}
      </footer>
    </section>
  );
};

export default AdminPanel;
