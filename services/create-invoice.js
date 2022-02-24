const fs = require('fs');
const PDFDocument = require('pdfkit-table');

async function writeInvoice(invoice) {
  try {
    const doc = new PDFDocument({
      margin: 30,
      size: 'A4'
    });
    doc.pipe(fs.createWriteStream(`${invoice.no}.pdf`));

    const { items } = invoice;
    const rows = [];

    for (let key in items) {
      rows.push([key, items[key]]);
    }

    const table = {
      title: 'Invoice',
      subtitle: `Sent to ${invoice.email}`,
      headers: ['Item(s)', 'Price'],
      rows,
      options: {
        align: 'center'
      }
    };
    await doc.table(table, {
      width: 300
    });

    doc.end();
    return 1;
  } catch (error) {
    console.log(error);
  }
}

module.exports = writeInvoice;
