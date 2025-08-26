import express from "express";
import ViteExpress from "vite-express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Add middleware to parse JSON request bodies
app.use(express.json());

// API routes must be defined before the catch-all route
app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.post("/form", (req, res) => {
  console.log("form: ", req.body);

  res.send("Form submitted");
});

// In production, serve built frontend files
if (process.env.NODE_ENV === "production") {
  // Serve static files from dist directory
  const distPath = path.join(__dirname, "../../dist");
  if (!fs.existsSync(distPath)) {
    throw new Error("Dist directory does not exist. Please run 'npm run build' first.");
  }
  app.use(express.static(distPath));
  
  // Handle client-side routing - serve index.html for all routes that don't match API endpoints
  app.get("/", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  
  const port = Number(process.env.PORT) || 5050;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
} else {
  // In development, use ViteExpress for hot reloading
  ViteExpress.listen(app, Number(process.env.PORT) || 5050, () =>
    console.log(`Server is listening on port ${process.env.PORT || 5050}...`),
  );
}
