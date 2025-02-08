const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors()); // إزالة قيود CORS

// قائمة القنوات (يمكنك تعديل الروابط هنا)
const channels = [
    { name: 'AlAoula', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83728.ts' },
    { name: '2M', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83727.ts' },
    { name: '2M HD', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83726.ts' },
    { name: 'AlMaghribia', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83729.ts' },
    { name: 'M24', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83730.ts' },
    { name: 'Md1 Arabic', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83731.ts' },
    { name: 'MD1 Maghreb', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83732.ts' },
    { name: 'MD1 Afric', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83733.ts' },
    { name: 'Laayoun', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83734.ts' },
    { name: 'Arriyadia HD', url: 'http://app.upsdo.me:8080/live/PCYXRYCVGSBR/718188917877/83735.ts' },
];

// إنشاء صفحة رئيسية تعرض القنوات المتاحة
app.get("/", (req, res) => {
    let channelList = channels.map(channel => <li><a href="/${channel.name}">${channel.name}</a></li>).join('');
    res.send(`
        <h1>🚀 الخادم يعمل بنجاح!</h1>
        <h2>القنوات المتاحة:</h2>
        <ul>${channelList}</ul>
    `);
});

// إنشاء البروكسي لكل قناة تلقائيًا
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
    console.log((`🚀 الخادم يعمل على المنفذ ${PORT}(`);
});