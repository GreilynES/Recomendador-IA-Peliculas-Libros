async function test() {
  const apiKey = "AIzaSyAZq1Qqn6hGUZTjrVA2Tnqmxn90AEEpd2A";
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Models:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Fetch failure:", e.message);
  }
}

test();
