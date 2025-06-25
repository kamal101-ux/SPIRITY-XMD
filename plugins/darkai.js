const { cmd } = require('../command');
const axios = require('axios');

// Activation par défaut
global.darkAiEnabled = true;
global.darkAiRPmode = false;
global.userChats = {};

const identityTriggers = [
  "t'es qui", "tes qui", "tu es qui", "c'est qui", "c ki", "ki es tu", "qui es-tu", "qui es tu",
  "who are you", "who r u"
];

const identityResponseFR = "👁️‍🗨️ *Je suis Dark-AI, développé dans l’ombre par l’exorciste de l’ombre : Dark-DEv...* 🌑";
const identityResponseEN = "👁️‍🗨️ *I am Dark-AI, forged in the shadows by the shadow exorcist: Dark-DEv...* 🌑";

function detectLanguage(text) {
  const lower = text.toLowerCase();
  const fr = ["qui", "c'est", "tu es", "tes"];
  const en = ["who", "are", "you", "what"];
  if (fr.some(k => lower.includes(k))) return 'fr';
  if (en.some(k => lower.includes(k))) return 'en';
  return 'fr';
}

// 📘 Commande de gestion darkai : .darkai on/off, rp on/off
cmd({
  pattern: "darkai ?(.*)?",
  alias: ["dark", "darkgpt"],
  desc: "Gérer le mode Dark AI et RP",
  category: "ai",
  react: "🌑",
  filename: __filename
}, async (conn, mek, m, { q, reply, react, isCreator }) => {
  if (!isCreator) return reply("❌ Commande réservée au propriétaire du bot.");

  const args = q?.trim().split(/\s+/) || [];
  if (args.length === 0) {
    return reply(`📘 Utilisation :
.darkai on — activer Dark AI
.darkai off — désactiver Dark AI
.darkai rp on — activer mode RP
.darkai rp off — désactiver mode RP`);
  }

  if (args[0] === "on") {
    global.darkAiEnabled = true;
    await react("✅");
    return reply("🌑 *Dark AI activé.*");
  }

  if (args[0] === "off") {
    global.darkAiEnabled = false;
    await react("❌");
    return reply("🌕 *Dark AI désactivé.*");
  }

  if (args[0] === "rp") {
    if (args[1] === "on") {
      global.darkAiRPmode = true;
      await react("👻");
      return reply("🎭 *Mode RP activé.*");
    } else if (args[1] === "off") {
      global.darkAiRPmode = false;
      await react("🛑");
      return reply("🎭 *Mode RP désactivé.*");
    } else {
      return reply("📘 Utilisation : .darkai rp on | .darkai rp off");
    }
  }

  return reply("❓ Commande inconnue. Utilise `.darkai` pour l'aide.");
});

// 🤖 Réponse automatique de Dark-AI
cmd({
  pattern: ".*",
  desc: "Réponse automatique de Dark-AI",
  hidden: true,
  fromMe: false,
  onlyInGroup: false,
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    if (!global.darkAiEnabled) return;
    if (!m?.body || m.key.fromMe || m.body.startsWith('.')) return;

    const sender = m.sender;
    const userMsg = m.body.toLowerCase();

    // Identité
    if (identityTriggers.some(trigger => userMsg.includes(trigger))) {
      const lang = detectLanguage(userMsg);
      return reply(lang === 'fr' ? identityResponseFR : identityResponseEN);
    }

    // Historique
    if (!global.userChats[sender]) global.userChats[sender] = [];
    global.userChats[sender].push(`User: ${userMsg}`);
    if (global.userChats[sender].length > 15) global.userChats[sender].shift();
    const history = global.userChats[sender].join("\n");

    // Prompt
    let prompt = global.darkAiRPmode
      ? `You are DARK AI, a paranormal and mysterious entity speaking in riddles and shadows. Be cryptic, enigmatic and occasionally menacing.\n\nConversation History:\n${history}`
      : `You are DARK AI, an intelligent and mysterious assistant with a sharp and witty personality.\n\nConversation History:\n${history}`;

    // Appel API
    const { data } = await axios.get("https://mannoffc-x.hf.space/ai/logic", {
      params: { q: userMsg, logic: prompt }
    });

    if (data?.result) {
      const botReply = data.result;
      global.userChats[sender].push(`Dark AI: ${botReply}`);
      await reply(botReply);
    }
  } catch (e) {
    console.error("Dark AI error:", e);
    reply("❌ Une erreur est survenue avec Dark AI.");
  }
});
