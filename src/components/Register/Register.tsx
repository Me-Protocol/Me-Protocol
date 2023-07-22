import React, { FC } from "react";

interface RegisterProps {
  children: React.ReactNode;
}

const Register: FC<RegisterProps> = ({ children }) => {
  return (
    <div>
      <h2>Hello man</h2>
      {children}
    </div>
  );
};

export default Register;
