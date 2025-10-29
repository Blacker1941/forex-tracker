import { useEffect, useState } from "react";
import {
  FaYenSign,
  FaDollarSign,
} from "react-icons/fa";
import type { ForexData } from "../types/forexData";
import { IoLogoEuro } from "react-icons/io";
import { PiCurrencyGbp } from "react-icons/pi";
import { PiCurrencyJpy } from "react-icons/pi";
import { TbCurrencyDirham } from "react-icons/tb";
import { TbCurrencyAfghani } from "react-icons/tb";
import { RiCopperCoinLine } from "react-icons/ri";
import { TbCurrencyDram } from "react-icons/tb";
import { FaFlorinSign } from "react-icons/fa6";
import "../css/Home.css";

type CurrencyIconMap = Record<string, JSX.Element>;

const icons: CurrencyIconMap = {
  EUR: <IoLogoEuro className="icon eur" />,
  GBP: <PiCurrencyGbp className="icon gbp" />,
  JPY: <PiCurrencyJpy className="icon jpy" />,
  USD: <FaDollarSign className="icon usd" />,
  CAD: <FaDollarSign className="icon cad" />,
  CHF: <RiCopperCoinLine className="icon chf" />,
  AUD: <FaDollarSign className="icon aud" />,
  NZD: <FaDollarSign className="icon nzd" />,
  CNY: <FaYenSign className="icon cny" />,
  SEK: <RiCopperCoinLine className="icon sek" />,
  NOK: <RiCopperCoinLine className="icon nok" />,
  AED: <TbCurrencyDirham className="icon aed"  />,
  AFN: <TbCurrencyAfghani className="icon aed"  />,
  AMD: <TbCurrencyDram className="icon aed"  />,
  ARS: <FaDollarSign className="icon aed"  />,
  AWG: <FaFlorinSign className="icon aed"  />,
  ANG: <FaFlorinSign className="icon aed"  />,

};

export default function Home() {
  const BASE_URL =
    import.meta.env.VITE_API_URL || "https://open.er-api.com/v6/latest/USD";
  const [data, setData] = useState<ForexData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();

        if (!json || !json.rates) {
          console.warn("⚠️ Empty response:", json);
          setError("Invalid response from API");
          return;
        }

        setData(json);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!data) return <p className="no-data">No data available</p>;

  return (
    <div className="home-container">
      <h1>💹 Forex Tracker</h1>
      <h3>Base Currency: {data.base_code}</h3>
      <ul className="forex-list">
        {Object.entries(data.rates)
          .slice(0, 10)
          .map(([currency, rate]) => {
            const iconElement: React.ReactNode =
              icons[currency] ?? <RiCopperCoinLine className="icon default" />;
            return (
              <li key={currency}>
                <span className="currency-icon">{iconElement}</span>
                <strong>{currency}:</strong> {rate.toFixed(2)}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
