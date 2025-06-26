const { cmd } = require('../command');

cmd({
  pattern: "warns ?(.*)?",
  alias: ["warnings"],
  desc: "Voir les avertissements des membres",
  category: "admin",
  react: "⚠️",
  filename: __filename
}, async (conn, mek, m, {
  reply,
  isGroup,
  isAdmins,
  q,
  mentionedJid
}) => {
  if (!isGroup) return reply("❌ Cette commande ne fonctionne qu'en groupe.");
  if (!isAdmins) return reply("❌ Seuls les administrateurs peuvent l’utiliser.");

  // Initialiser global.warnings si absent
  if (!global.warnings) global.warnings = {};

  // Si on mentionne un utilisateur
  let target = mentionedJid?.[0] || (q && q.endsWith('@s.whatsapp.net') ? q : null);

  if (target) {
    const warnCount = global.warnings[target] || 0;
    return reply(`⚠️ *Avertissements de ${target.split("@")[0]} :* ${warnCount}`);
  }

  // Afficher tout le monde dans le groupe
  const warningList = Object.entries(global.warnings)
    .filter(([jid]) => jid.endsWith('@s.whatsapp.net'))
    .map(([jid, count]) => `👤 @${jid.split("@")[0]} : ${count}`)
    .join("\n");

  if (!warningList) return reply("✅ Aucun avertissement pour le moment.");

  return reply(`*📋 Liste des avertissements :*\n\n${warningList}`, {
    mentions: Object.keys(global.warnings)
  });
});
