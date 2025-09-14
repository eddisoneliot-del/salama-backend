import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const hashed = await import("bcrypt").then(m => m.hash("password", 10));
  const doctorUser = await prisma.user.create({ data: { email: "doc1@local", password: hashed, name: "Dr Test", role: "DOCTOR" }});
  await prisma.doctor.create({ data: { userId: doctorUser.id, specialty: "General" }});
  // créer patients...
}
main().catch(e => console.error(e)).finally(()=>prisma.$disconnect());
