import { Link, useLocation } from "react-router-dom";
import { FaHome, FaDollarSign, FaBitcoin, FaCog, FaInfoCircle } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import "../css/Sidebar.css";

interface SidebarLink {
  to: string;
  label: string;
  icon: JSX.Element;
}

const Sidebar = () => {
  const location = useLocation();

  const links: SidebarLink[] = [
    { to: "/", label: "Dashboard", icon: <FaHome /> },
    { to: "/gold", label: "Gold", icon: <GiGoldBar /> },
    { to: "/forex", label: "Forex", icon: <FaDollarSign /> },
    { to: "/crypto", label: "Crypto", icon: <FaBitcoin /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
  ];

  return (
    <aside className="sidebar">
      <h2>📊 Forex Tracker</h2>
      <nav className="sidebar-nav">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
