export async function POST(req) {
  const { product, audience, style } = await req.json();

  const prompt = `
你是一个爆款小红书文案写手，请根据以下信息生成内容：

要求：
1. 标题要吸引人，有情绪
2. 用口语化表达
3. 多用emoji
4. 模拟真实分享
5. 包含标题和正文

产品：${product}
人群：${audience}
风格：${style}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();

  return Response.json({
    text: data.choices?.[0]?.message?.content || "生成失败"
  });
}
