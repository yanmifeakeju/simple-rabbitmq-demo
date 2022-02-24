const amqp = require('amqplib');
const writeInvoice = require('./create-invoice');

const connectionString = '';

const channelQueue = 'invoice';

if (!connectionString) {
  console.log('Service Folder: Provide a connection string ');
  process.exit(1);
}

async function consume() {
  try {
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertQueue(channelQueue);
    const message = channel.consume(channelQueue, (message) => {
      const invoice = JSON.parse(message.content.toString());
      writeInvoice(invoice);
      // Send an email attached with invoice
      // unlink the pdf (?)
      channel.ack(message); /// on successs
      // channel.nack(message) // on failer
      return;
    });
  } catch (error) {
    console.error(error);
  }
}

consume()
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
