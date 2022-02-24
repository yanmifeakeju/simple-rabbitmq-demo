const express = require('express');
const crypto = require('crypto');
const publish = require('./publisher');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.route('/invoice').post(async (req, res) => {
  try {
    const { items, email } = req.body;

    if (!items || Object.keys(items).length <= 0)
      return res.status(400).json({ status: false, message: 'empty cart' });

    if (!email)
      return res.status(400).json({
        status: false,
        message: 'Please provide an email to send the invoice'
      });

    const invoice = {
      items,
      email,
      no: crypto.randomBytes(8).toString('hex')
    };

    console.log(invoice);
    const p = await publish(invoice);

    console.log(p);

    res
      .status(201)
      .json({ status: true, message: 'Invoice sent to your email' });
  } catch (error) {
    console.error(error);
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Oti gbera' });
});

app.listen(PORT, () => console.log('Lati 4:30 ' + PORT));
