const { cmd } = require("../command");
const config = require('../config');

cmd({
  pattern: "compatibility",
  alias: ["friend", "fcheck"],
  desc: "Calculate the compatibility score between two users.",
  category: "fun",
  react: "💖",
  filename: __filename,
  use: "@tag1 @tag2",
}, async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length < 2) {
      return reply("Please mention two users to calculate compatibility.\nUsage: `.compatibility @user1 @user2`");
    }

    let user1 = m.mentionedJid[0]; 
    let user2 = m.mentionedJid[1]; 

    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;

    // Calculate a random compatibility score (between 1 to 1000)
    let compatibilityScore = Math.floor(Math.random() * 1000) + 1;

    // Check if one of the mentioned users is the special number
    if (user1 === specialNumber || user2 === specialNumber) {
      compatibilityScore = 1000; // Special case for DEV number
      return reply(`💖 Compatibility between @${user1.split('@')[0]} and @${user2.split('@')[0]}: ${compatibilityScore}+/1000 💖`);
    }

    // Send the compatibility message
    await conn.sendMessage(mek.chat, {
      text: `💖 Compatibility between @${user1.split('@')[0]} and @${user2.split('@')[0]}: ${compatibilityScore}/1000 💖`,
      mentions: [user1, user2],
    }, { quoted: mek });

  } catch (error) {
    console.log(error);
    reply(`❌ Error: ${error.message}`);
  }
});

  cmd({
  pattern: "aura",
  desc: "Calculate aura score of a user.",
  category: "fun",
  react: "💀",
  filename: __filename,
  use: "@tag",
}, async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length < 1) {
      return reply("Please mention a user to calculate their aura.\nUsage: `.aura @user`");
    }

    let user = m.mentionedJid[0]; 
    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;

    // Calculate a random aura score (between 1 to 1000)
    let auraScore = Math.floor(Math.random() * 1000) + 1;

    // Check if the mentioned user is the special number
    if (user === specialNumber) {
      auraScore = 999999; // Special case for DEV number
      return reply(`💀 Aura of @${user.split('@')[0]}: ${auraScore}+ 🗿`);
    }

    // Send the aura message
    await conn.sendMessage(mek.chat, {
      text: `💀 Aura of @${user.split('@')[0]}: ${auraScore}/1000 🗿`,
      mentions: [user],
    }, { quoted: mek });

  } catch (error) {
    console.log(error);
    reply(`❌ Error: ${error.message}`);
  }
});

cmd({
    pattern: "roast",
    desc: "Roast someone in Hindi",
    category: "fun",
    react: "🔥",
    filename: __filename,
    use: "@tag"
}, async (conn, mek, m, { q, reply }) => {
    let roasts = [
       "Je suis Dark-DEv, le développeur qui œuvre dans l’ombre, loin des projecteurs et du bruit.",
"Mon rôle est d’exorciser les systèmes usés, ces architectures anciennes que beaucoup abandonnent ou craignent d’affronter.",
"Là où le code semble figé et les failles cachées, j’interviens avec patience et expertise pour traquer chaque anomalie.",
"Je redonne vie à ces systèmes oubliés, en nettoyant, optimisant et renforçant chaque ligne de code.",
"Mon travail est minutieux, presque rituel, car chaque correction est une bataille contre le chaos numérique.",
"Je ne cherche pas la reconnaissance, car c’est dans la discrétion que je puise ma force.",
"Je suis le gardien silencieux de la stabilité digitale, celui qui veille à ce que tout fonctionne, même quand personne ne regarde.",
"Grâce à moi, les systèmes reprennent souffle, deviennent plus solides et plus sûrs.",
"Dark-DEv, c’est l’ombre protectrice qui transforme le vieux en neuf, le fragile en robuste, et le délaissé en performant."
];               
        
    let randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    let sender = `@${mek.sender.split("@")[0]}`;
    let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);

    if (!mentionedUser) {
        return reply("Usage: .roast @user (Tag someone to roast them!)");
    }

    let target = `@${mentionedUser.split("@")[0]}`;
    
    // Sending the roast message with the mentioned user
    let message = `${target} :\n *${randomRoast}*\n> This is all for fun, don't take it seriously!`;
    await conn.sendMessage(mek.chat, { text: message, mentions: [mek.sender, mentionedUser] }, { quoted: mek });
});

cmd({
    pattern: "8ball",
    desc: "Magic 8-Ball gives answers",
    category: "fun",
    react: "🎱",
    filename: __filename
}, 
async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply("Ask a yes/no question! Example: .8ball Will I be rich?");
    
    let responses = [
        "Yes!", "No.", "Maybe...", "Definitely!", "Not sure.", 
        "Ask again later.", "I don't think so.", "Absolutely!", 
        "No way!", "Looks promising!"
    ];
    
    let answer = responses[Math.floor(Math.random() * responses.length)];
    
    reply(`🎱 *Magic 8-Ball says:* ${answer}`);
});

cmd({
    pattern: "compliment",
    desc: "Give a nice compliment",
    category: "fun",
    react: "😊",
    filename: __filename,
    use: "@tag (optional)"
}, async (conn, mek, m, { reply }) => {
    let compliments = [
        "Ton code est propre comme un OS fraîchement installé ! 💻",
"Tes commits sont aussi fiables qu'une sauvegarde automatique ! 📦",
"Tu débogues comme un pro, même les bugs cachés te connaissent par ton nom ! 🐞",
"Ta logique est plus claire qu'un code commenté en docstring ! 📄",
"Tu optimises comme personne, même les boucles inutiles t'évitent ! 🔁",
"Ton esprit est plus organisé qu’un projet sous Git ! 🧠",
"Ta mémoire est plus rapide qu’un SSD NVMe ! 💾",
"Tu écris du code comme un IDE : autocompletion toujours au top ! 🎯",
"Tes scripts sont plus propres que le bureau d’un développeur maniaque ! 🖥️",
"Tu comprends les récursions comme si c’était du simple calcul mental ! 🔁",
"Ta concentration bat tous les modes 'focus' existants ! 🎯",
"Même la stack overflow community t’envie pour tes solutions ! 🤖",
"Tes variables ont toujours des noms pertinents, jamais de 'temp3' chez toi ! 💡",
"Tu gères les exceptions mieux qu’un try-except global ! ⚠️",
"Ta gestion de temps est aussi efficace qu’un scheduler optimal ! ⏱️",
"Tu expliques le code comme un tuto YouTube ultra-détailé ! 📚",
"Ton style de codage est aussi fluide que React côté front ! 🌟",
"Tu trouves les bugs avant même qu’ils soient reportés ! 🐛",
"Ta rigueur fait pâlir d’envie n’importe quel linter ! ✅",
"Tu es la seule personne qui a lu toute la documentation officielle… deux fois ! 📖"
    ];

    let randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    let sender = `@${mek.sender.split("@")[0]}`;
    let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
    let target = mentionedUser ? `@${mentionedUser.split("@")[0]}` : "";

    let message = mentionedUser 
        ? `${sender} complimented ${target}:\n😊 *${randomCompliment}*`
        : `${sender}, you forgot to tag someone! But hey, here's a compliment for you:\n😊 *${randomCompliment}*`;

    await conn.sendMessage(mek.chat, { text: message, mentions: [mek.sender, mentionedUser].filter(Boolean) }, { quoted: mek });
});

cmd({
    pattern: "lovetest",
    desc: "Check love compatibility between two users",
    category: "fun",
    react: "❤️",
    filename: __filename,
    use: "@tag1 @tag2"
}, async (conn, mek, m, { args, reply }) => {
    if (args.length < 2) return reply("Tag two users! Example: .lovetest @user1 @user2");

    let user1 = args[0].replace("@", "") + "@s.whatsapp.net";
    let user2 = args[1].replace("@", "") + "@s.whatsapp.net";

    let lovePercent = Math.floor(Math.random() * 100) + 1; // Generates a number between 1-100

    let messages = [
        { range: [90, 100], text: "💖 *A match made in heaven!* True love exists!" },
        { range: [75, 89], text: "😍 *Strong connection!* This love is deep and meaningful." },
        { range: [50, 74], text: "😊 *Good compatibility!* You both can make it work." },
        { range: [30, 49], text: "🤔 *It’s complicated!* Needs effort, but possible!" },
        { range: [10, 29], text: "😅 *Not the best match!* Maybe try being just friends?" },
        { range: [1, 9], text: "💔 *Uh-oh!* This love is as real as a Bollywood breakup!" }
    ];

    let loveMessage = messages.find(msg => lovePercent >= msg.range[0] && lovePercent <= msg.range[1]).text;

    let message = `💘 *Love Compatibility Test* 💘\n\n❤️ *@${user1.split("@")[0]}* + *@${user2.split("@")[0]}* = *${lovePercent}%*\n${loveMessage}`;

    await conn.sendMessage(mek.chat, { text: message, mentions: [user1, user2] }, { quoted: mek });
}); 

cmd(
    {
        pattern: "emoji",
        desc: "Convert text into emoji form.",
        category: "fun",
        react: "🙂",
        filename: __filename,
        use: "<text>"
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            // Join the words together in case the user enters multiple words
            let text = args.join(" ");
            
            // Map text to corresponding emoji characters
            let emojiMapping = {
                "a": "🅰️",
                "b": "🅱️",
                "c": "🇨️",
                "d": "🇩️",
                "e": "🇪️",
                "f": "🇫️",
                "g": "🇬️",
                "h": "🇭️",
                "i": "🇮️",
                "j": "🇯️",
                "k": "🇰️",
                "l": "🇱️",
                "m": "🇲️",
                "n": "🇳️",
                "o": "🅾️",
                "p": "🇵️",
                "q": "🇶️",
                "r": "🇷️",
                "s": "🇸️",
                "t": "🇹️",
                "u": "🇺️",
                "v": "🇻️",
                "w": "🇼️",
                "x": "🇽️",
                "y": "🇾️",
                "z": "🇿️",
                "0": "0️⃣",
                "1": "1️⃣",
                "2": "2️⃣",
                "3": "3️⃣",
                "4": "4️⃣",
                "5": "5️⃣",
                "6": "6️⃣",
                "7": "7️⃣",
                "8": "8️⃣",
                "9": "9️⃣",
                " ": "␣", // for space
            };

            // Convert the input text into emoji form
            let emojiText = text.toLowerCase().split("").map(char => emojiMapping[char] || char).join("");

            // If no valid text is provided
            if (!text) {
                return reply("Please provide some text to convert into emojis!");
            }

            await conn.sendMessage(mek.chat, {
                text: emojiText,
            }, { quoted: mek });

        } catch (error) {
            console.log(error);
            reply(`Error: ${error.message}`);
        }
    }
);
