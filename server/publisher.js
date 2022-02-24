const amqp = require('amqplib');
const connectionString =
  'amqps://zyndfozh:jRa8bzHtm6Ta_nvLOcJtxPjx16NmMFuh@gull.rmq.cloudamqp.com/zyndfozh';

const channelQueue = 'invoice';

if (!connectionString) {
  console.log('Server Folder: Provide a connection string ');
  process.exit(1);
}

async function publish(invoice) {
  try {
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertQueue(channelQueue);
    channel.sendToQueue(channelQueue, Buffer.from(JSON.stringify(invoice)));
    return 1;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = publish;
