const messages = [];
const MAX_MESSAGES = 5;

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body);
      const msg = {
        contact: body.contact || "Desconocido",
        text: body.text || "",
        time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
        id: Date.now()
      };
      messages.unshift(msg);
      if (messages.length > MAX_MESSAGES) messages.splice(MAX_MESSAGES);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } catch (e) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid body" }) };
    }
  }

  if (event.httpMethod === "GET") {
    return { statusCode: 200, headers, body: JSON.stringify(messages) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};
