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
    { name: 'channel10', url: 'http://example.com/live/channel10.m3u8' },
    { name: 'channel11', url: 'http://example.com/live/channel11.m3u8' },
    { name: 'channel12', url: 'http://example.com/live/channel12.m3u8' },
    { name: 'channel13', url: 'http://example.com/live/channel13.m3u8' },
    { name: 'channel14', url: 'http://example.com/live/channel14.m3u8' },
    { name: 'channel15', url: 'http://example.com/live/channel15.m3u8' },
    { name: 'channel16', url: 'http://example.com/live/channel16.m3u8' },
    { name: 'channel17', url: 'http://example.com/live/channel17.m3u8' },
    { name: 'channel18', url: 'http://example.com/live/channel18.m3u8' },
    { name: 'channel19', url: 'http://example.com/live/channel19.m3u8' },
    { name: 'channel20', url: 'http://example.com/live/channel20.m3u8' },
    { name: 'channel21', url: 'http://example.com/live/channel21.m3u8' },
    { name: 'channel22', url: 'http://example.com/live/channel22.m3u8' },
    { name: 'channel23', url: 'http://example.com/live/channel23.m3u8' },
    { name: 'channel24', url: 'http://example.com/live/channel24.m3u8' },
    { name: 'channel25', url: 'http://example.com/live/channel25.m3u8' },
    { name: 'channel26', url: 'http://example.com/live/channel26.m3u8' },
    { name: 'channel27', url: 'http://example.com/live/channel27.m3u8' },
    { name: 'channel28', url: 'http://example.com/live/channel28.m3u8' }
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