import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // charge le .env

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Connecté à Supabase avec succès !");
  } catch (e) {
    console.error("❌ Erreur de connexion :", e.message);
    console.error(e); // affiche plus de détails
  } finally {
    await prisma.$disconnect();
  }
}

main();
