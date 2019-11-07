const TelegramBot = require('node-telegram-bot-api')
const token = "1014763952:AAGtUxcs2Zy0bW2uPA5NLsFokAZsUZb59BA";
const telegram = new TelegramBot(token, { polling: true });

telegram.on("text", (message) => {
    telegram.sendMessage(message.chat.id, "Я найду тебя и всех кого ты любишь..");
});