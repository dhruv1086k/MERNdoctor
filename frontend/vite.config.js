import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access
    allowedHosts: [
      "7d37-2401-4900-8841-6e7c-6c53-56ee-5b62-70a5.ngrok-free.app", // Add your ngrok domain here
    ],
  },
});
