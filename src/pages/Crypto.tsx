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
import {
  FaBitcoin as FaBitcoinIcon,
  FaEthereum as FaEthereumIcon,
} from "react-icons/fa";
import "../css/Crypto.css";

interface CryptoPoint {
  timestamp: string;
  price: number;
}

type CryptoType = "bitcoin" | "ethereum";

const API_URL = import.meta.env.VITE_CRYPTO_API_URL!;

export default function Crypto() {
  const [data, setData] = useState<Record<CryptoType, CryptoPoint[]>>({
    bitcoin: [],
    ethereum: [],
  });
  const [selected, setSelected] = useState<CryptoType>("bitcoin");
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>(
    "Live prices (USD) — Last 1 hour"
  );

  useEffect(() => {
    if (!API_URL) {
      setError("API URL is missing");
      return;
    }

    const fetchCrypto = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        if (!json.bitcoin?.usd || !json.ethereum?.usd) {
          throw new Error("Price not found in API response");
        }

        const now = new Date();
        const nowTime = now.toLocaleTimeString();

        setData((prev) => {
          const updated: Record<CryptoType, CryptoPoint[]> = { ...prev };
          (["bitcoin", "ethereum"] as CryptoType[]).forEach((key) => {
            const newPoint: CryptoPoint = {
              timestamp: nowTime,
              price: json[key].usd,
            };
            updated[key] = [...prev[key], newPoint].slice(-120);
          });
          return updated;
        });

        setLastUpdate(
          `Live prices (USD) — Last 1 hour (Updated: ${nowTime})`
        );
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchCrypto();
    const interval = setInterval(fetchCrypto, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <p className="error-text">⚠️ {error}</p>;
  if (!data[selected].length)
    return <p className="loading-text">Loading crypto data...</p>;

  return (
    <div className="crypto-container">
      <h1>💎 Crypto Market (Live)</h1>
      <p className="update-time">{lastUpdate}</p>

      <div className="crypto-buttons">
        <button
          className={selected === "bitcoin" ? "active" : ""}
          onClick={() => setSelected("bitcoin")}
        >
          <FaBitcoinIcon className="icon btc" /> Bitcoin
        </button>
        <button
          className={selected === "ethereum" ? "active" : ""}
          onClick={() => setSelected("ethereum")}
        >
          <FaEthereumIcon className="icon eth" /> Ethereum
        </button>
      </div>

      <div className="chart-title">
        {selected.charAt(0).toUpperCase() + selected.slice(1)} Price Chart
      </div>

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
              dataKey="price"
              stroke={selected === "bitcoin" ? "#F7931A" : "#3C3C3D"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <table className="crypto-table">
        <thead>
          <tr>
            <th>Crypto</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {["bitcoin", "ethereum"].map((crypto) => (
            <tr key={crypto}>
              <td>
                {crypto === "bitcoin" ? (
                  <FaBitcoinIcon className="icon btc" />
                ) : (
                  <FaEthereumIcon className="icon eth" />
                )}
                {crypto.charAt(0).toUpperCase() + crypto.slice(1)}
              </td>
              <td>
                {data[crypto as CryptoType].slice(-1)[0]?.price.toFixed(2) ||
                  "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
