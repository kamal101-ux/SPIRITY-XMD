const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "bible ?(.*)?",
  alias: ["verse", "verset"],
  desc: "Obtenir un verset biblique (FR via bible-search)",
  category: "tools",
  react: "📖",
  filename: __filename
}, async (conn, mek, m, { q, reply, react }) => {
  if (!q) return reply("📖 Donne une référence valide.\nEx : `.bible Jean 3:16`");

  await react("⏳");

  try {
    const url = `https://bible-search-api.vercel.app/api?phrase=${encodeURIComponent(q)}&version=LSG`;
    const { data } = await axios.get(url);

    if (!data || !data.text) return reply("❌ Aucune réponse reçue pour ce verset.");

    const message = `───═📖═───\n*${data.reference}*\n\n${data.text}\n\n🕊 Version : ${data.version}`;
    await reply(message);
  } catch (e) {
    console.error("Erreur API bible-search:", e.message || e);
    reply("❌ Une erreur est survenue lors de la recherche du verset.");
  } finally {
    await react("✅");
  }
});
