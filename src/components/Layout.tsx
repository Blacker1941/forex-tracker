import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../css/Layout.css";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
