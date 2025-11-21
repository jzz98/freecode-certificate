// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = 3000
function getUnixDate(date) {
  return new Date(date * 1000)
}
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date_string?", (req, res) => {
  let dateString = req.params.date_string;

  // Si no hay parámetro, devolvemos fecha actual
  if (!dateString) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  let date;

  // Si solo son dígitos, es un timestamp en milisegundos
  if (/^\d+$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    // Si no, tratamos como string de fecha
    date = new Date(dateString);
  }

  // Fecha inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta correcta
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});