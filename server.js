const express = require("express");
const fetch = require("node-fetch"); // نستعمل v2
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    const target = req.query.u;
    if (!target) return res.status(400).send("missing ?u=");

    const response = await fetch(target, {
      headers: {
        "User-Agent": "SmartX2/1.0",
        "Accept": "*/*"
      }
    });

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    res.set("Content-Type", contentType);

    if (!response.ok || !response.body) {
      return res.status(response.status).end("error");
    }

    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("proxy error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port " + PORT));
