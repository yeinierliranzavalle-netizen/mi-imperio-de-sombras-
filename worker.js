export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Usa POST" }), {
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
    try {
      const { amount, description } = await request.json();
      const testUrl = "https://qvapay.com/pay/test_" + Date.now();
      return new Response(JSON.stringify({
        success: true,
        payment_url: testUrl,
        message: "Modo prueba: pago simulado. Todo funciona.",
        amount: amount,
        description: description,
      }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Datos inválidos" }), { status: 400 });
    }
  },
};
