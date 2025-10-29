import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaEuroSign, FaPoundSign, FaYenSign, FaCanadianMapleLeaf } from "react-icons/fa";
import { LuSwissFranc } from "react-icons/lu";
import "../css/Forex.css";

interface ForexPoint {
  timestamp: string;
  rate: number;
}

type CurrencyType = "EUR" | "GBP" | "JPY" | "CAD" | "CHF";

const API_URL = import.meta.env.VITE_FOREX_API_URL!;

export default function Forex() {
  const [data, setData] = useState<Record<CurrencyType, ForexPoint[]>>({
    EUR: [],
    GBP: [],
    JPY: [],
    CAD: [],
    CHF: [],
  });
  const [selected, setSelected] = useState<CurrencyType>("EUR");
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("Live exchange rates (USD)");

  useEffect(() => {
    if (!API_URL) {
      setError("API URL is missing");
      return;
    }

    const fetchForex = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (!json.rates) throw new Error("Invalid API response");

        const now = new Date();
        const nowTime = now.toLocaleTimeString();

        setData(prev => {
          const updated: Record<CurrencyType, ForexPoint[]> = { ...prev };
          (Object.keys(prev) as CurrencyType[]).forEach(cur => {
            updated[cur] = [...prev[cur], { timestamp: nowTime, rate: json.rates[cur] }].slice(-120);
          });
          return updated;
        });

        setLastUpdate(`Live exchange rates (USD) — Last update: ${nowTime}`);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchForex();
    const interval = setInterval(fetchForex, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <p className="error-text">⚠️ {error}</p>;
  if (!data[selected].length) return <p className="loading-text">Loading forex data...</p>;

  const icons: Record<CurrencyType, JSX.Element> = {
    EUR: <FaEuroSign className="icon eur" />,
    GBP: <FaPoundSign className="icon gbp" />,
    JPY: <FaYenSign className="icon jpy" />,
    CAD: <FaCanadianMapleLeaf className="icon cad" />,
    CHF: <LuSwissFranc  className="icon chf" />,
  };

  return (
    <div className="forex-container">
      <h1>💱 Forex Market (Live)</h1>
      <p className="update-time">{lastUpdate}</p>

      <div className="forex-buttons">
        {(Object.keys(data) as CurrencyType[]).map(cur => (
          <button
            key={cur}
            className={selected === cur ? "active" : ""}
            onClick={() => setSelected(cur)}
          ><>
            {icons[cur]} {cur}</>
          </button>
        ))}
      </div>

      <div className="chart-title">{selected} Price Chart</div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data[selected]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="timestamp" tick={{ fill: "#ccc" }} />
            <YAxis tick={{ fill: "#ccc" }} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #444",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#00C49F"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <table className="forex-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate (USD)</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(data) as CurrencyType[]).map(cur => (
            <tr key={cur}>
              <td><>
                {icons[cur]} {cur}</>
              </td>
              <td>{data[cur].slice(-1)[0]?.rate.toFixed(4) || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
