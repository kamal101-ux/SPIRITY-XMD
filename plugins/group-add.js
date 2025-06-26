const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "add ?(.*)?",
  alias: ["invite", "bring"],
  desc: "Ajoute un membre au groupe",
  category: "admin",
  react: "➕",
  filename: __filename
}, async (conn, mek, m, {
  from,
  q,
  sender,
  isGroup,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!isGroup) return reply("❌ Cette commande est uniquement disponible dans les groupes.");

    const senderIsOwner = sender === config.OWNER_NUMBER + "@s.whatsapp.net";
    const senderIsSudo = config.SUDO?.includes(sender);

    if (!senderIsOwner && !senderIsSudo && !isAdmins) {
      return reply("⛔ Seuls les administrateurs peuvent utiliser cette commande.");
    }

    if (!isBotAdmins) {
      return reply("🤖 Je dois être administrateur pour ajouter des membres.");
    }

    const numbers = q.match(/\d{6,}/g);
    if (!numbers || numbers.length === 0) {
      return reply("📥 Veuillez fournir au moins un numéro valide.\nExemple : `.add 22612345678 22998765432`");
    }

    let success = 0, failed = 0;

    for (const num of numbers) {
      const jid = `${num}@s.whatsapp.net`;
      try {
        await conn.groupParticipantsUpdate(from, [jid], 'add');
        success++;
      } catch (e) {
        console.error(`Erreur ajout ${jid}:`, e);
        failed++;
      }
    }

    let msg = `➕ *Résultat :*\n✅ Ajoutés : ${success}\n❌ Échecs : ${failed}`;
    reply(msg);

  } catch (error) {
    console.error("Erreur commande add:", error);
    reply("❌ Une erreur est survenue lors de l'ajout.");
  }
});
