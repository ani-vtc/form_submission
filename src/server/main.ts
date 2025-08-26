import express from "express";
import ViteExpress from "vite-express";


const app = express();
// Add middleware to parse JSON request bodies
app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.post("/form", (req, res) => {
  console.log("form: ", req.body);

  res.send("Form submitted");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
