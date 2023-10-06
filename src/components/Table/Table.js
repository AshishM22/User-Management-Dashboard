import "./Table.css";
import TableContent from "../TableContent/TableContent";

const Table = ({
  users,
  handleDelete,
  handleSave,
  selectedLine,
  handleSelectAll,
  handleRowSelect,
}) => {
  const allSelected = selectedLine.length === users.length;
  const lineSelected = (user) => selectedLine.includes(user);

  return (
    <div>
      <table>
        <thead>
          <th>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
            />
          </th>

          <th> Name </th>
          <th> Email </th>
          <th> Id </th>
          <th> Actions </th>
        </thead>

        <tbody>
          {users.map((user) => {
            return (
              <TableContent
                key={user.id}
                user={user}
                handleDelete={handleDelete}
                id={user.id}
                handleSave={handleSave}
                lineSelected={lineSelected}
                handleRowSelect={handleRowSelect}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
