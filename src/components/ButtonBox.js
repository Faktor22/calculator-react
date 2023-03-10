import React from "react";
import PropTypes from "prop-types";
import "./ButtonBox.css";

const ButtonBox = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

ButtonBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonBox;
