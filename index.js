const express = require("express");
const app = express();
var cors = require('cors')
const AWS = require("aws-sdk");
const Fs = require("fs");
var path = require('path');
const port = 4000;

app.use(cors())

const Polly = new AWS.Polly({
  signatureVersion: "v4",
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "ASIA56BE6LIJNGX7OQ4U",
    secretAccessKey: "J74GYqCeK//n85KasuSesB/xTQ0OHe7+d3SKYkM9",
    sessionToken:
      "IQoJb3JpZ2luX2VjEFkaCXVzLWVhc3QtMSJHMEUCIQDfgjftlOTIAaff6/B04keuJrpAFQ9tZ9bpOZEjJgIS5gIgPwvCnSue/Rhp9YumI4yyXEKbNLPoNg6rbLJiNdp+J1oqggMIUhAAGgw5NTc4NTUxOTM2MTgiDKoLaAJnNs91WMiLSSrfAm/Igqh+1eqi0Qfvl3bM2XGybQlOLVU+8nKXV0M3MsxEc0zDM3A6uCW12+mcYEaucIa6e3ldwjy+dA+ceBQu2i9W9a5zW0DgqszUeSYXJqanG1nlUD7t81/bG+iaVyo5zhupfFqeXyFOPiwXBSkoFjsM3vNahWk+Bpacv8GEa3mXX85ZJDIXaJDa/rpQh16qV9MtNW+ZU/gZ8Aokfxm/XOFvBzPcroGRtyHoXnn8bfnEV9b2rvghDr8l+B6cVsxnbpL+Y10q7F+M1hVvkgZsSXDddjlW/OsvN4XrmbfiAn1d9Wh0A4oIebXpwFVUAF4csVTon3lGt7zYisyrMLnJE0+F/wXext7jV0O9oPJhu5Io5nHG1vNd5X6POWekztIe9FGRO0ylPCrjaB3M9eivTvsAO/N1ZGSexisdmxf9JdfltWirvEwTH4IWx4WOqlir3RbA8afs7+5db9L1g4vX0TDq8KubBjqmAQSbeq95z7VWwS5vl4ut3MdKf+0d9zph9Cmx/6fk+oQsVD1oLXNlkOS6vE+ZsyOTbBOudr60t7m6H09dkDMhJ6zfqVD+4g9671uwNqBEW7GIQXVNSMZoX4/8I/Tgh66yQwAQVBC5wvF5ijbq/m0krmXPa4gEOA+LHTgCokL9pkUb1LWkJ5LOqFkAFzRJpMFEYQp1u09Z6sYYixqNmyQTK4NI/l7XVzg=",
  },
});




app.get("/test", async (req, res) => {
  console.log('req.query', req.query.text)
  let params = {
    Text: req.query.text,
    // TextType: 'ssml',
    OutputFormat: "mp3",
    VoiceId: "Hiujin",
    LanguageCode: "yue-CN",
    Engine: 'neural'
  };
  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log(err);
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        Fs.writeFile("./speech.mp3", data.AudioStream, function (err) {
          if (err) {
            return console.log(err);
          }
          const binaryData = Fs.readFileSync('./speech.mp3')
          const base64String =  Buffer.from(binaryData).toString("base64")
          res.json({
            base64: base64String
          })
        });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`);
});
