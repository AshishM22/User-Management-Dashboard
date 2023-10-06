import "./Table.css";
import { useState } from "react";

const Table = ({}) => {
  return (
    <div>
      <table>
        <thead>
          <th>
            <input type="checkbox" />
          </th>

          <th> Name </th>
          <th> Email </th>
          <th> ID </th>
          <th> Actions </th>
        </thead>

        <tbody></tbody>
      </table>
    </div>
  );
};

export default Table;
