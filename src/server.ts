import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI manquant dans le fichier .env");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB :", err);
    process.exit(1);
  });

// Routes
import userRoutes from './routes/user.routes';
app.use('/api/users', userRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
// trigger redeploy
