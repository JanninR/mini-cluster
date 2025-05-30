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
    <div className="container" style={{background:'#000333',width:'100vw',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <h1 style={{color:'white'}}>Estado de los servidores</h1>
      <br style={{color:'white',height:'20px',width:'90%'}}/>
      {error && <p className="bad">{error}</p>}
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'90%',gap:'10px',flexWrap:'wrap',justifyContent:'center'}}>
        {nodes.map((n, i) => (
          <div key={i} className={n.status === "healthy" ? "ok" : "bad"} style={{color:'white',background:'#0e1254',height:'20vh',padding:'1vw',display:'flex',flexDirection:'column',borderRadius:'1vw',border:'1px solid grey'}}>
            <div>{n.url.replace("https://", "")}</div>
            <div style={{fontSize:'0.8em',color:n.status === "healthy" ? "green" : "red",background:n.status === "healthy" ? "#d4f7d4" : "#f7d4d4",padding:'5px',borderRadius:'5px',marginTop:'10px'}}>
              {n.status === "healthy" ? "En funcionamiento" : "No disponible"}
            </div>
            <div style={{fontSize:'0.8em',color:'white',marginTop:'10px'}}>
              Última actualización: {new Date().toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
