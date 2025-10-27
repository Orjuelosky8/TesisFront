export const env = {
  FLASK_URL: process.env.FLASK_URL!,
};

if (!env.FLASK_URL) {
  throw new Error("Falta FLASK_URL en .env.local");
}