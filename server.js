const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors()); // إزالة قيود CORS

// قائمة القنوات
const channels = [
    { name: "AlAoula", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83727.ts" },
    { name: "2M", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83728.ts" },
    { name: "AlMaghribia", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83729.ts" },
    { name: "MD1Arabic", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83730.ts" },
    { name: "MD1Maghreb", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83731.ts" },
    { name: "MD1Afriq", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83732.ts" },
    { name: "Laayoun", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83733.ts" },
    { name: "AlAoula", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83734.ts" },
    { name: "2M", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83735.ts" },
    { name: "AlMaghribia", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83736.ts" },
    { name: "MD1Arabic", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83737.ts" },
    { name: "MD1Maghreb", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83738.ts" },
    { name: "MD1Afriq", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83739.ts" },
    { name: "Laayoun", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83740.ts" },
    { name: "AlAoula", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83741.ts" },
    { name: "2M", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83742.ts" },
    { name: "AlMaghribia", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83743.ts" },
    { name: "MD1Arabic", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83744.ts" },
    { name: "MD1Maghreb", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83745.ts" },
    { name: "MD1Afriq", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83746.ts" },
    { name: "Laayoun", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83747.ts" },
    { name: "AlAoula", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83748.ts" },
    { name: "2M", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83749.ts" },
    { name: "AlMaghribia", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83750.ts" },
    { name: "MD1Arabic", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83751.ts" },
    { name: "MD1Maghreb", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83752.ts" },
    { name: "MD1Afriq", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83753.ts" },
    { name: "Laayoun", url: "http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83754.ts" },
];

// صفحة رئيسية تعرض القنوات
app.get("/", (req, res) => {
    let channelList = channels.map(channel => `<li><a href="/channel/${encodeURIComponent(channel.name)}">${channel.name}</a></li>`).join("");

    res.send(`
        <!DOCTYPE html>
        <html lang="ar">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>قنوات IPTV</title>
        </head>
        <body>
            <h1>🚀 الخادم يعمل بنجاح</h1>
            <h2>القنوات المتاحة:</h2>
            <ul>${channelList}</ul>
        </body>
        </html>
    `);
});

// إنشاء البروكسي لكل قناة
channels.forEach(channel => {
    app.use(`/channel/${encodeURIComponent(channel.name)}`, createProxyMiddleware({
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