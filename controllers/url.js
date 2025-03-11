const Url = require("../models/Url"); // ✅ Remove curly braces { }

const shortid = require("shortid"); // ✅ Use require

const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();

  const shortUrl = `http://localhost:5050/${shortCode}`;

  // save to database
  const newUrl = new Url({ shortCode, longUrl });
  await newUrl.save();

  console.log("short saved = ", newUrl);

  res.render("index.ejs", { shortUrl });
};

const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  // find on database
  const originalUrl = await Url.findOne({ shortCode });

  if (originalUrl) {
    res.redirect(originalUrl.longUrl);
  } else {
    res.json({ message: "Invalid shortcode" });
  }
};

module.exports = { shortUrl, getOriginalUrl }; // ✅ Use module.exports
