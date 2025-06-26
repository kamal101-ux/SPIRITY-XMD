const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');

const dbFile = path.join(__dirname, '../database/antilink.json');
if (!fs.existsSync('./database')) fs.mkdirSync('./database');
let antilinkDB = fs.existsSync(dbFile) ? JSON.parse(fs.readFileSync(dbFile)) : {};
const saveDB = () => fs.writeFileSync(dbFile, JSON.stringify(antilinkDB, null, 2));

if (!global.warnings) global.warnings = {};

// 📘 Commande admin .antilink on / off
cmd({
  pattern: "antilink ?(.*)?",
  alias: ["antilinks"],
  desc: "Activer ou désactiver le blocage de liens pour ce groupe",
  category: "admin",
  react: "🚫",
  filename: __filename
}, async (conn, mek, m, { reply, isGroup, isAdmins }) => {
  if (!isGroup) return reply("❌ Cette commande ne fonctionne qu'en groupe.");
  if (!isAdmins) return reply("🚫 Seuls les admins peuvent activer/désactiver l'antilien.");

  const q = m.body.split(' ')[1];
  if (!q) return reply("📝 Utilisation : `.antilink on` ou `.antilink off`");

  if (q === "on") {
    antilinkDB[m.from] = true;
    saveDB();
    return reply("✅ Blocage des liens activé dans ce groupe.");
  } else if (q === "off") {
    delete antilinkDB[m.from];
    saveDB();
    return reply("❎ Blocage des liens désactivé dans ce groupe.");
  } else {
    return reply("📝 Utilisation : `.antilink on` ou `.antilink off`");
  }
});

// 👁‍🗨 Détection automatique de liens
cmd({
  pattern: ".*",
  fromMe: false,
  onlyInGroup: true,
  desc: "Système de blocage de liens",
  hidden: true,
  filename: __filename
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) return;

    const groupEnabled = antilinkDB[from];
    const globallyEnabled = config.ANTI_LINK === 'true';
    if (!groupEnabled && !globallyEnabled) return;

    const linkPatterns = [
      /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
      /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
      /https?:\/\/(?:www\.)?[\w\-]+\.(com|net|org|io|me|tv|xyz)\/\S+/gi
    ];

    const hasLink = linkPatterns.some(p => p.test(body));
    if (!hasLink) return;

    console.log(`🔗 Lien détecté de ${sender}: ${body}`);

    try {
      await conn.sendMessage(from, { delete: m.key });
    } catch (err) {
      console.error("❌ Impossible de supprimer le message :", err);
    }

    global.warnings[sender] = (global.warnings[sender] || 0) + 1;
    const warnCount = global.warnings[sender];

    if (warnCount < 3) {
      await conn.sendMessage(from, {
        text: `⚠️ *Lien interdit détecté !*\n👤 Utilisateur : @${sender.split('@')[0]}\n🧾 Avertissement : ${warnCount}/3`,
        mentions: [sender]
      });
    } else {
      await conn.sendMessage(from, {
        text: `🚫 *@${sender.split('@')[0]} a été expulsé pour avoir dépassé 3 avertissements.*`,
        mentions: [sender]
      });
      await conn.groupParticipantsUpdate(from, [sender], 'remove');
      delete global.warnings[sender];
    }
  } catch (e) {
    console.error("❌ Erreur Antilink :", e);
  }
});
