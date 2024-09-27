const TelegramBot = require("node-telegram-bot-api");

const token = "6249778436:AAGAbmjMId4R9sppQjYiFTkmLJLgKq9n6sc";
const bot = new TelegramBot(token, { polling: true });

//   bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const messageText = msg.text;

//     // Greet the user with a welcome message
//     const welcomeMessage = 'Welcome...';
//     bot.sendMessage(chatId, welcomeMessage);

//     const tokensAndQuantities = messageText.split(' ');
//     let totalAmount = 0;

//     for (let i = 0; i < tokensAndQuantities.length; i += 2) {
//       const token = parseInt(tokensAndQuantities[i]);
//       const quantity = parseInt(tokensAndQuantities[i + 1]);

//       totalAmount += quantity;
//     }

//     const responseMessage = `Total Amount: ${totalAmount}`;
//     bot.sendMessage(chatId, responseMessage);
//   });

// Handle forwarded messages
// Enable event-based updates
// Handle forwarded messages
bot.onText(/(.+)/, (msg, match) => {
    const forwardedMessage = match[1];
    const tokens = forwardedMessage.split(' ');
  
    let totalQuantity = 0;
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === 'x') {
        const quantity = parseInt(tokens[i + 1]);
        totalQuantity *= quantity;
        break;
      } else {
        const tokenNumber = parseInt(token);
        totalQuantity += tokenNumber;
      }
    }
  
    const totalAmount = totalQuantity * 1; // Assuming 1 Rs per quantity
  
    const reply = `Total amount: ${totalAmount} Rs`;
    bot.sendMessage(msg.chat.id, reply);
  });