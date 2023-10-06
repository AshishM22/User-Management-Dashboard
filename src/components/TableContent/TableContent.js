import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { FaEdit, FaSave } from "react-icons/fa";
import { useState, useEffect } from "react";

const TableContent = ({
  user,
  handleDelete,
  handleSave,
  lineSelected,
  handleRowSelect,
}) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  // This function is Triggered when we are editing either name or email or id
  const handleInputChange = (fieldName, value) => {
    setUpdatedUser((prevuser) => ({
      ...prevuser,
      [fieldName]: value,
    }));
  };

  return (
    <tr className={lineSelected(user) ? "selected-line" : ""}>
      <td>
        <input
          type="checkbox"
          checked={lineSelected(user)}
          onChange={(e) => handleRowSelect(e, user)}
        />
      </td>

      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={updatedUser.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={updatedUser.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
            />
          </td>
        </>
      ) : (
        <>
          <td> {updatedUser.name} </td>
          <td> {updatedUser.email} </td>
          <td> {updatedUser.id} </td>
        </>
      )}
      <td>
        {isEditing ? (
          <FaSave
            style={{ marginRight: "10px", color: "rgba(0, 0, 0, 0.6)" }}
            className="button-save"
            onClick={() => {
              handleSave(updatedUser);
              setIsEditing(!isEditing);
            }}
          />
        ) : (
          <FaEdit
            style={{ marginRight: "10px", color: "rgba(0, 0, 0,0.5)" }}
            className="button-edit"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          />
        )}

        <DeleteOutlineOutlinedIcon
          style={{ color: "red" }}
          onClick={() => handleDelete(user.id)}
          className="button-delete"
        />
      </td>
    </tr>
  );
};

export default TableContent;
