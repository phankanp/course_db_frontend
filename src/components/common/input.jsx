import React from "react";

const Input = ({ name, type, value, onChange, placeholder, error }) => {
  return (
    <div className="row">
      <div className="col-md-12 form-group">
        <input
          value={value}
          onChange={onChange}
          id={name}
          name={name}
          type={type}
          className="form-control"
          placeholder={placeholder}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
