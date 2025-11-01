import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { GiGoldBar } from "react-icons/gi";
import "../css/Gold.css";

interface GoldDataPoint {
  time: string;
  date: string;
  price: number;
}

const BASE_URL = import.meta.env.VITE_GOLD_API_URL!;

export default function Gold() {
  const [data, setData] = useState<GoldDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("Real-time gold price (USD per ounce)");

  useEffect(() => {
    if (!BASE_URL) {
      setError("API URL is missing");
      return;
    }

    const fetchGold = async () => {
      try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        console.log(json);

        // ✅ گرفتن قیمت درست
        const rate = json.rates?.USDXAU
          ? json.rates.USDXAU
          : json.rates?.XAU
          ? 1 / json.rates.XAU
          : null;

        if (!rate) throw new Error("Gold price not found in API response");

        const now = new Date();
        const nowTime = now.toLocaleTimeString();

        const newPoint: GoldDataPoint = {
          time: nowTime,
          date: now.toLocaleDateString(),
          price: rate
        };

        setData(prev => [...prev, newPoint].slice(-120));
        setLastUpdate(`Real-time gold price (USD per ounce) — Last update: ${nowTime}`);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchGold();
    const interval = setInterval(fetchGold, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <p className="error-text">⚠️ {error}</p>;
  if (!data.length) return <p className="loading-text">Loading gold data...</p>;

  return (
    <div className="gold-container">
      <h1><GiGoldBar className="icon gold" /> Gold Market (Live)</h1>
      <p className="update-time">{lastUpdate}</p>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="time" tick={{ fill: "#ccc" }} />
            <YAxis tick={{ fill: "#ccc" }} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid #444", color: "#fff" }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Line type="monotone" dataKey="price" stroke="#FFD700" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <table className="gold-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(-1).map((point, idx) => (
            <tr key={idx}>
              <td>{point.date}</td>
              <td>{point.time}</td>
              <td>${point.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
