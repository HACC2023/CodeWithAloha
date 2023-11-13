import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 p-4 text-white">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} CMDR. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
