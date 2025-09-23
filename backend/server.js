// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001; 
const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

app.post('/api/meta/capi/purchase', async (req, res) => {
  const { value, currency, contents, event_id, event_source_url } = req.body;

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source: 'website',
        user_data: {
         
          client_user_agent: req.headers['user-agent'],
        },
        custom_data: {
          value,
          currency,
          contents,
        },
      },
    ],
    access_token: ACCESS_TOKEN,
  };

  try {
    const fbRes = await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await fbRes.json();
    res.status(200).json(result);
  } catch (err) {
    console.error('Erro ao enviar para Meta:', err);
    res.status(500).json({ error: 'Erro no envio ao Facebook' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
