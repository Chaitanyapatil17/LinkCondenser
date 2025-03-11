const express = require('express');
const mongoose = require('mongoose');
const { shortUrl, getOriginalUrl } = require('./controllers/url'); // lowercase "c"



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // ✅ Use express.static

mongoose
  .connect(
    "mongodb+srv://codesnippet02:nq0sdJL2Jc3QqZba@cluster0.zmf40.mongodb.net/",
    {
      dbName: "Nodejs",
    }
  )
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));

// rendering the ejs file
app.get('/', (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

// shorting url logic
app.post('/short', shortUrl);

// redirect to original url using short code
app.get("/:shortCode", getOriginalUrl);

const port = 5050;
app.listen(port, () => console.log(`server is running on port ${port}`));
