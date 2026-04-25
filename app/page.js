'use client'
import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [style, setStyle] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ product, audience, style })
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>小红书文案生成器</h1>

      <input placeholder="产品" onChange={e => setProduct(e.target.value)} />
      <br /><br />

      <input placeholder="人群" onChange={e => setAudience(e.target.value)} />
      <br /><br />

      <input placeholder="风格" onChange={e => setStyle(e.target.value)} />
      <br /><br />

      <button onClick={generate}>一键生成</button>

      <pre style={{ marginTop: 20 }}>{result}</pre>
    </div>
  );
}
