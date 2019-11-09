const TelegramBot = require('node-telegram-bot-api');
const token = "1014763952:AAGtUxcs2Zy0bW2uPA5NLsFokAZsUZb59BA";
const bot = new TelegramBot(token, { polling: true });
var appeal = {
    type: "",
    subject: "",
    building: "",
    text: "",
    file: null,
    location: null,
    status: "0"
}

bot.onText(/\/start/, (msg) => {

    var text = "Доступные команды:\n/start - команды;\n/sendpic - отправить картинку;\n/contact - номер\n/location - где мы находимся\n/nurali - Самая секретная команда";
    var options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'обратиться', callback_data: '0_1' }],
                [{ text: 'проверить обращение', callback_data: '0_2' }],
                [{ text: 'история обращений', callback_data: '0_3' }],
                [{ text: 'звонок «109»', callback_data: '0_4' }]
            ],
            parse_mode: 'Markdown'
        }
    };
    var chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
    bot.sendMessage(chat, text, options);
});

bot.onText(/\/sendpic/, (msg) => {
    bot.sendPhoto(msg.chat.id, "cat1.jpg", { caption: "Употребление наркотического средства под названием 'сон'." });
});

bot.onText(/\/nurali/, (msg) => {
    bot.sendMessage(msg.chat.id, "Нурали Senior Design Engineer Developer");
});

bot.onText(/\/contact/, (msg) => {
    bot.sendContact(msg.chat.id, "77774183462", "Марипбеков Чингиз");
});

bot.onText(/\/location/, (msg) => {
    bot.sendLocation(msg.chat.id, 43.236838, 76.915051);
    bot.sendMessage(msg.chat.id, "Наш офис..");
});
bot.on('location', (msg) => {
    bot.sendLocation(msg.from.id, msg.location.latitude, msg.location.longitude);
});
bot.on('text', (msg) => {
    if (msg.text.toString().toLowerCase().indexOf('привет') === 0) {
        bot.sendMessage(msg.chat.id, "Здравствуйте, " + msg.from.first_name + "! Вы обратились в информационно-справочную службу 109!\nВнимание, для работы с нашим ботом вам необходимо дать разрешение на передачу контактных данных.");
    }
});
bot.on('callback_query', function (msg) {
    var answer = msg.data.split("_");
    var index = answer[0];
    var btn = answer[1];
    //Кнопка обращения
    if (index == "0") {
        switch (btn) {
            case "1":
                obrazh(msg.from.id, 1);
                break;
            default:
                bot.sendMessage(msg.from.id, 'Как ты это сделал?');
        }
    }
    //Кнопка жалобы
    if (index == "1") {
        appeal.type = btn;
        obrazh(msg.from.id, 2);
    }
    if (index == "2") {
        if (btn != "пропустить")
            appeal.subject = btn;
        obrazh(msg.from.id, 3);

    }
    if (index == "3") {
        if (btn != "пропустить")
            appeal.building = btn;
        obrazh(msg.from.id, 4);
    }
});
//bot.answerCallbackQuery(msg.id, 'Вы выбрали: ' + msg.data, true);


function obrazh(id, step) {

    var text;
    var options;
    switch (step) {
        case 1:
            text = "Выберите тип обращения:";
            options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'жалоба', callback_data: '1_жалоба' }],
                        [{ text: 'предложение', callback_data: '1_предложение' }],
                        [{ text: 'запрос', callback_data: '1_запрос' }],
                        [{ text: 'заявление', callback_data: '1_заявление' }],
                        [{ text: 'отклик', callback_data: '1_отклик' }]
                    ],
                }
            };
            break;
        case 2:
            text = "Выберите тему обращения:";
            options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Спиздили горку', callback_data: '2_Спиздили горку' }],
                        [{ text: 'Маленнькая пенсия', callback_data: '2_Маленнькая пенсия' }],
                        [{ text: 'Нурали не сделал дизайн', callback_data: '2_Нурали не сделал дизайн' }],
                        [{ text: 'Мне плохо', callback_data: '2_Мне плохо' }],
                        [{ text: 'Пропустить', callback_data: '2_пропустить' }]
                    ],
                }
            };
            break;
        case 3:
            text = "Выберите гос. учрждение:";
            options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Заведение 1', callback_data: '3_text' }],
                        [{ text: 'Заведение 2', callback_data: '3_Маленнькая пенсия' }],
                        [{ text: 'Заведение 3', callback_data: '3_Нурали не сделал дизайн' }],
                        [{ text: 'Заведение 4', callback_data: '3_Мне плохо' }],
                        [{ text: 'Пропустить', callback_data: '3_пропустить' }]
                    ],
                }
            };
            break;
        case 4:
            text = "Опишите свою ситуацию:";
            setText();
        case 5:
            text = "Опишите свою ситуацию:";
    }
    bot.sendMessage(id, text, options);
}
function setText() {
    var i = true;
    while (i) {
        bot.on('text', (msg) => {
            if (msg.text.length < 800) {
                appeal.text = msg.text
                obrazh(msg.chat.id, 5)
            }
            else
                bot.sendMessage(msg.chat.id, 'Э слыш,базар фильтруй');

            i = false;
            console.log(i);
        });
        console.log(i);
    }

}


bot.on("polling_error", (err) => console.log(err));