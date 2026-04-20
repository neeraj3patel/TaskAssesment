
"use client";
import React, { useEffect, useState } from "react";
import PokemonDetails from "./PokemonDetails";

const LIMIT = 20;

export default function PokemonTable() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true);
    setErr("");
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${(page-1)*LIMIT}`)
      .then(r => r.ok ? r.json() : Promise.reject("Failed to fetch"))
      .then(d => { setList(d.results); setTotal(d.count); })
      .catch(e => setErr(e.toString()))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h2 style={{fontWeight:600,marginBottom:12}}>Pokémon List</h2>
      {err && <div style={{color:"red"}}>{err}</div>}
      {loading ? <div>Loading...</div> : (
        <table style={{width:"100%",borderCollapse:"collapse",marginTop:16,marginBottom:16}}>
          <thead>
            <tr style={{background:"#e0f2fe"}}>
              <th style={{padding:12,borderBottom:"2px solid #2563eb",fontSize:16}}>Serial Number</th>
              <th style={{padding:12,borderBottom:"2px solid #2563eb",fontSize:16}}>Name</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={2} style={{textAlign:"center",padding:16}}>No Pokémon found.</td></tr>
            ) : list.map((p,i) => (
              <tr key={p.name} style={{cursor:"pointer"}} onClick={()=>setShow(p.url)}>
                <td style={{padding:12,borderBottom:"1px solid #eee",textAlign:"center"}}>{(page-1)*LIMIT+i+1}</td>
                <td style={{padding:12,borderBottom:"1px solid #eee",textTransform:"capitalize",textAlign:"center",color:"#2563eb"}}>{p.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:16,marginTop:16}}>
        <button style={{padding:"8px 20px",fontSize:15,borderRadius:6,border:"1px solid #2563eb",background:page===1?"#e5e7eb":"#2563eb",color:page===1?"#2563eb":"#fff",cursor:page===1?"not-allowed":"pointer"}} onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1||loading}>Prev</button>
        <span style={{fontWeight:600,fontSize:15}}>Page {page} of {Math.ceil(total/LIMIT)||1}</span>
        <button style={{padding:"8px 20px",fontSize:15,borderRadius:6,border:"1px solid #2563eb",background:page===Math.ceil(total/LIMIT)?"#e5e7eb":"#2563eb",color:page===Math.ceil(total/LIMIT)?"#2563eb":"#fff",cursor:page===Math.ceil(total/LIMIT)?"not-allowed":"pointer"}} onClick={()=>setPage(p=>Math.min(Math.ceil(total/LIMIT),p+1))} disabled={page===Math.ceil(total/LIMIT)||loading}>Next</button>
      </div>
      {show && <PokemonDetails url={show} onClose={()=>setShow(null)} />}
    </div>
  );
}
