import { useEffect, useState } from "react";
import "./App.css";

const MONITOR_URL = "https://monitor-qtum.onrender.com/status";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(MONITOR_URL);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setNodes(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No se pudo consultar el monitor");
      }
    };
    fetchStatus();                     // primer tiro
    const id = setInterval(fetchStatus, 5000); // cada 5 s
    return () => clearInterval(id);
  }, []);

  return (
    <div className="container">
      <h1>Estado de los servidores</h1>
      {error && <p className="bad">{error}</p>}
      <ul>
        {nodes.map((n, i) => (
          <li key={i} className={n.status === "healthy" ? "ok" : "bad"}>
            {n.url.replace("https://", "")} → {n.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
