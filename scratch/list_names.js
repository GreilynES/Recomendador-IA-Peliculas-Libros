const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
  const apiKey = "AIzaSyCJyOBkcRB8Xzs0CEQ_YhoG98qzDnprM08";
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.models) {
      console.log("Available models:");
      data.models.forEach(m => console.log(m.name));
    } else {
      console.log("No models found or error:", JSON.stringify(data));
    }
  } catch (e) {
    console.error(e);
  }
}

run();
