const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors()); // إزالة قيود CORS

// صفحة ترحيبية عند فتح الرابط الأساسي "/"
app.get("/", (req, res) => {
    res.send("🚀 الخادم يعمل بنجاح! يمكنك الوصول إلى البث عبر <a href='/stream'>/stream</a>");
});

// إعداد بروكسي للبث المباشر
app.use('/stream', createProxyMiddleware({
    target: 'http://app.upsdo.me:8080/live/PCYXRYCVG5BR/718188917877/83728.ts',
    changeOrigin: true,
    secure: false
}));

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
});