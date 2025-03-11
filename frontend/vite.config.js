import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access
    allowedHosts: [
      "0977-2401-4900-8841-6e7c-ec87-5eb3-996-407e.ngrok-free.app", // Add your ngrok domain here
    ],
  },
});
