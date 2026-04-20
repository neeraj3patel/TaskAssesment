import Link from "next/link";

export default function Home() {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'80vh'}}>
      <h1 style={{fontSize:28,marginBottom:24}}>Root Layout Page</h1>
      <Link href="/poke" style={{padding:'12px 28px',background:'#2563eb',color:'#fff',borderRadius:8,textDecoration:'none',fontWeight:600,fontSize:18}}>Go to Pokémon Page</Link>
    </div>
  );
}
