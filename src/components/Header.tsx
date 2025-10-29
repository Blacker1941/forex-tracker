import "../css/Header.css";

interface HeaderProps {
  version?: string;
}

const Header = ({ version = "v0.1 Prototype" }: HeaderProps) => {
  return (
    <header className="header">
      <h1 className="header-title">📈 Trading Dashboard</h1>
      <div className="header-version">{version}</div>
    </header>
  );
};

export default Header;
