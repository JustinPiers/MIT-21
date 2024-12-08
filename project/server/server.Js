const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;


app.get('/api/crypto-rate', async (req, res) => {                   // Додатковий API для отримання курсу криптовалют
    const { currency } = req.query;                                                           
    if (!currency) return res.status(400).json({ error: 'Необхідно вказати валюту.' });

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`);
        const rate = response.data[currency]?.usd;
        if (!rate) return res.status(404).json({ error: 'Криптовалюта не знайдена.' });
        res.json({ rate });
    } catch (error) {
        res.status(500).json({ error: 'Помилка отримання курсу криптовалют.' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
