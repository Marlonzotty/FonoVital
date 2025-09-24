// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.set('trust proxy', true); // se houver proxy, permite pegar o IP real

const PORT = 3001;
const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

app.post('/api/meta/capi/purchase', async (req, res) => {
  const {
    value,
    currency,
    contents,
    event_id,
    event_source_url,
    user_data = {}, // <-- receber do front (fbc/fbp)
  } = req.body;

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source: 'website',
        user_data: {
          // repassa o que veio do front (sem hash)
          fbc: user_data.fbc,              // <-- ESSENCIAL p/ fbc
          fbp: user_data.fbp,              // <-- bom p/ match
          client_user_agent: req.headers['user-agent'],
          client_ip_address: req.ip,       // melhora match server-side
        },
        custom_data: {
          value,       // number
          currency,    // 'BRL'
          contents,    // opcional (ideal ter content_ids e content_type)
          // ex.: content_ids: ['sku-123'], content_type: 'product'
        },
      },
    ],
  };

  try {
    const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const fbRes = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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
