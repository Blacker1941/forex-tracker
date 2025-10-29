import { FaDollarSign, FaBitcoin } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import { SiReact } from "react-icons/si";
import { MdPublic, MdDesktopMac, MdShowChart } from "react-icons/md";
import "../css/About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About Forex Tracker</h1>
      <p>Forex Tracker is a real-time financial dashboard that displays:</p>

      <ul className="market-list">
        <li><FaDollarSign className="icon forex" /> Forex Market: Exchange rates of major currencies (USD, EUR, GBP, JPY, etc.)</li>
        <li><GiGoldBar className="icon gold" /> Gold Market: Real-time gold prices per ounce</li>
        <li><FaBitcoin className="icon crypto" /> Crypto Market: Live prices of Bitcoin and Ethereum</li>
      </ul>

      <p>This app is built using modern web technologies:</p>
      <ul className="tech-list">
        <li><SiReact className="icon react" /> React with TypeScript for type-safe UI components</li>
        <li><MdShowChart className="icon chart" /> Recharts for interactive charts</li>
        <li><MdPublic className="icon api" /> Free public APIs for live market data</li>
        <li><MdDesktopMac className="icon layout" /> Responsive layout with CSS Flexbox and simple styling</li>
      </ul>

      <p>This project is a great example of a beginner-to-intermediate React/TypeScript app suitable for your portfolio or resume.</p>
    </div>
  );
}
