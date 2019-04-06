import React from "react";

const TextArea = ({ name, value, rows, onChange, placeholder, error }) => {
  return (
    <div className="row">
      <div className="col-md-12 form-group">
        <textarea
          value={value}
          id={"textArea"}
          name={name}
          rows={rows}
          className="form-control"
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextArea;
