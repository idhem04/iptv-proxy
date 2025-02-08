const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors()); // إزالة قيود CORS

// قائمة القنوات (تأكد من أن الروابط صحيحة)
const channels = [
    { name: "AlAoula", url: "http://app.upsdo.me:8080/live/PCYXYRCVGSBR/718188917877/83728.ts" },
    { name: "2M", url: "http://app.upsdo.me:8080/live/PCYXYRCVGSBR/718188917877/83727.ts" },
    { name: "M24", url: "http://app.upsdo.me:8080/live/PCYXYRCVGSBR/718188917877/83726.ts" },
    { name: "Medi1 TV", url: "http://app.upsdo.me:8080/live/PCYXYRCVGSBR/718188917877/83729.ts" },
    { name: "Arryadia HD", url: "http://app.upsdo.me:8080/live/PCYXYRCVGSBR/718188917877/83735.ts" }
];

// صفحة رئيسية تعرض القنوات المتاحة
app.get("/", (req, res) => {
    let channelList = channels.map(channel => <li><a href="/${channel.name}">${channel.name}</a></li>).join('');
    res.send(`
        <h1>🚀 الخادم يعمل بنجاح!</h1>
        <h2>📺 القنوات المتاحة:</h2>
        <ul>${channelList}</ul>
    `);
});

// إنشاء البروكسي لكل قناة
channels.forEach(channel => {
    app.use(/${channel.name}, createProxyMiddleware({
        target: channel.url,
        changeOrigin: true,
        secure: false
    }));
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
});