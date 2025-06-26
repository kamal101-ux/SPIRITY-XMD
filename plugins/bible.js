const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
  pattern: "bible ?(.*)?",
  alias: ["verse", "verset"],
  desc: "Obtenir un verset biblique (ex: `.bible Jean 3:16`)",
  category: "tools",
  react: "📖",
  filename: __filename
}, async (conn, mek, m, { q, reply, react }) => {
  if (!q) return reply("✝️ Donne une référence biblique valide.\nExemple : `.bible Jean 3:16`");

  await react("⏳");
  const start = Date.now();

  try {
    const apiUrl = `https://bible-api.com/${encodeURIComponent(q)}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const delay = Date.now() - start;

    if (data.error) {
      return reply(`❌ Erreur : ${data.error}`);
    }

    if (data.text) {
      const verseText = data.text.trim();
      const reference = data.reference;
      const message = `───═📖═───\n*${reference}*\n\n${verseText}\n───═✝️═───\n_⏱️ ${delay} ms_`;
      return conn.sendMessage(m.from, { text: message }, { quoted: mek });
    } else {
      return reply("❌ Aucune donnée trouvée pour cette référence.");
    }
  } catch (e) {
    console.error("Erreur Bible:", e);
    return reply("❌ Une erreur s'est produite lors de la récupération du verset.");
  } finally {
    await react("✅");
  }
});
