import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import DoorDashClient from '@doordash/sdk';

const app = express();
const port = 2000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error('ERROR', err);
    return;
  }
  console.log(`App listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/get-delivery-rate', async (req, res) => {
  try {
    const client = new DoorDashClient.DoorDashClient({
      developer_id: 'b148ecaf-b0a9-47ca-8a7d-a810c407dbb8',
      key_id: '19049875-a1c3-40f9-b338-d042caf1ae07',
      signing_secret: 'qooAbChQBZKXNrIoWZqhFOfzBFXS4DVst3C370uBgmc'
    });
    const response = await client.deliveryQuote({
      external_delivery_id: '6c09e57e-aa33-4f43-9a7a-b5660cad581470',
      pickup_address: '1140 holloway ave  , san francisco ,94132',
      pickup_phone_number: '+16505555569',
      dropoff_address: '548 ramsell st , san francisco ,94132',
      dropoff_phone_number: '+16505555569',
    });
    res.json(response); // Sending JSON response
    console.log('QUOTE', response);
  } catch (error) {
    console.error('Error fetching delivery rate:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/create-delivery', async (req, res) => {
  try {
    const client = new DoorDashClient.DoorDashClient({
      developer_id: 'b148ecaf-b0a9-47ca-8a7d-a810c407dbb8',
      key_id: '19049875-a1c3-40f9-b338-d042caf1ae07',
      signing_secret: 'qooAbChQBZKXNrIoWZqhFOfzBFXS4DVst3C370uBgmc'
    });
    const response = await client.deliveryQuoteAccept(
      '1c09e57e-aa33-4f43-9a7a-b5660cad581471'
    );
    res.json(response); // Sending JSON response
    console.log('ACCEPT', response);
  } catch (error) {
    console.error('Error creating delivery:', error);
    res.status(500).send('Internal Server Error');
  }
});
