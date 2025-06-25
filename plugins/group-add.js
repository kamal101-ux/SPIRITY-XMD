const { cmd } = require('../command');

cmd({
    pattern: "add",
    alias: ["a", "invite"],
    desc: "Ajoute un ou plusieurs membres au groupe",
    category: "admin",
    react: "➕",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, senderNumber
}) => {
    if (!isGroup) return reply("❌ Cette commande ne fonctionne qu'en groupe.");

    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) return reply("❌ Seul le propriétaire du bot peut utiliser cette commande.");

    if (!isBotAdmins) return reply("❌ Je dois être admin pour ajouter des membres.");

    if (!q) return reply("❌ Fournis un ou plusieurs numéros (ex : `.add 226XXXXXXXX 229YYYYYYYY`).");

    // Séparer les numéros par espace
    const numbers = q.split(/\s+/).map(n => n.replace(/[^0-9]/g, '')).filter(n => n.length >= 6);

    if (numbers.length === 0) return reply("❌ Aucun numéro valide détecté.");

    let results = [];

    for (const number of numbers) {
        const jid = number + "@s.whatsapp.net";
        try {
            const res = await conn.groupParticipantsUpdate(from, [jid], "add");
            const status = res?.[0]?.status;

            if (status === 200) {
                results.push(`✅ @${number} ajouté avec succès`);
            } else if (status === 403) {
                const link = await conn.groupInviteCode(from);
                results.push(`⚠️ @${number} a refusé l’ajout → Lien : https://chat.whatsapp.com/${link}`);
            } else if (status === 408) {
                results.push(`❌ @${number} n’est pas sur WhatsApp`);
            } else {
                results.push(`❌ @${number} → erreur (code ${status})`);
            }
        } catch (err) {
            console.error(`Erreur avec ${number} :`, err);
            results.push(`❌ @${number} → erreur interne`);
        }
    }

    // Répondre avec un résumé
    const message = results.join("\n");
    reply(message);
});
