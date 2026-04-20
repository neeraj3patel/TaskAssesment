
"use client";
import React, { useEffect, useState } from "react";

export default function PokemonDetails({ url, onClose }) {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setErr("");
    setData(null);
    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject("Failed to fetch details"))
      .then(d => setData(d))
      .catch(e => setErr(e.toString()))
      .finally(() => setLoading(false));
  }, [url]);

  if (!url) return null;

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.2)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50}}>
      <div style={{background:"#fff",borderRadius:16,boxShadow:"0 4px 32px #0002",padding:32,maxWidth:400,width:"100%",position:"relative",border:"1px solid #dbeafe"}}>
        <button style={{position:"absolute",top:12,right:16,fontSize:24,color:"#888",border:"none",background:"none",cursor:"pointer"}} onClick={onClose} aria-label="Close">&times;</button>
        {loading && <div>Loading details...</div>}
        {err && <div style={{color:"red"}}>{err}</div>}
        {data && (
          <div>
            <h2 style={{fontWeight:700,marginBottom:16,textTransform:"capitalize",color:"#2563eb",textAlign:"center"}}>{data.name}</h2>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20}}>
              {data.types && data.types.length > 0 ? data.types.map((t,i) => (
                <button key={t.type.name} style={{padding:"6px 16px",borderRadius:20,border:"1px solid #93c5fd",background:tab===i?"#2563eb":"#e0f2fe",color:tab===i?"#fff":"#2563eb",fontWeight:600,cursor:"pointer"}} onClick={()=>setTab(i)}>{t.type.name}</button>
              )) : <span>No types</span>}
            </div>
            {data.types && data.types.length > 0 && (
              <div style={{textAlign:"center",marginTop:24, paddingBottom:8}}>
                <div style={{marginBottom:8,fontSize:17, color:'#222'}}>
                  <b>Game Indices:</b> {Array.isArray(data.game_indices) ? data.game_indices.length : 0}
                </div>
                <div style={{marginBottom:8,fontSize:17, color:'#222'}}>
                  <b>Total Moves:</b> {Array.isArray(data.moves) ? data.moves.length : 0}
                </div>
              </div>
            )}
            {/* Remove debug output for production, or keep for dev only */}
          </div>
        )}
      </div>
    </div>
  );
}
