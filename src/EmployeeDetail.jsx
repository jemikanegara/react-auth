import React from "react";

const EmployeeDetail = props => {
  return (
    <div>
      <li>Name : {`${props.first_name} ${props.last_name}`}</li>
      <li>Gender: {props.gender}</li>
      <li>Birth Date: {props.birth_date}</li>
      <hr />
    </div>
  );
};

export default EmployeeDetail;
