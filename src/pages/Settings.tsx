import { useState } from "react";
import { FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign, FaRegEye } from "react-icons/fa";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import "../css/Settings.css";

export default function Settings() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [theme, setTheme] = useState("light");
  const [showGold, setShowGold] = useState(true);

  const handleSave = () => {
    alert(`✅ Saved:
- Base: ${baseCurrency}
- Theme: ${theme}
- Show Gold: ${showGold ? "Yes" : "No"}`);
  };

  const currencyIcons: Record<string, JSX.Element> = {
    USD: <FaDollarSign />,
    EUR: <FaEuroSign />,
    GBP: <FaPoundSign />,
    JPY: <FaYenSign />,
  };

  return (
    <div className="settings-container">
      <h1>⚙️ Settings</h1>
      <p>Manage your preferences for Forex Tracker.</p>

      <div className="settings-group disabled" title="Coming soon!">
        <label>
          <span className="icon">{currencyIcons[baseCurrency]}</span>
          <strong>Base Currency:</strong>
          <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} disabled>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </select>
        </label>
      </div>

      <div className="settings-group disabled" title="Coming soon!">
        <label>
          <span className="icon">{theme === "light" ? <IoMdSunny /> : <IoMdMoon />}</span>
          <strong>Theme:</strong>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} disabled>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </label>
      </div>

      <div className="settings-group disabled" title="Coming soon!">
        <label>
          <input type="checkbox" checked={showGold} onChange={(e) => setShowGold(e.target.checked)} disabled />
          <span><FaRegEye className="icon-eye" /> Show Gold Prices</span>
        </label>
      </div>

      <button className="settings-save-btn" onClick={handleSave} disabled>
        Save Settings
      </button>
    </div>
  );
}
