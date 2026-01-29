import { PrismaClient, Role, EmailType } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("ChangeMe123!", 10);

  const school = await prisma.school.create({
    data: { name: "Escuela de Ingeniería" }
  });

  const program = await prisma.program.create({
    data: { name: "Ingeniería de Sistemas", schoolId: school.id }
  });

  const coord = await prisma.user.create({
    data: {
      primaryEmail: "coord@universidad.edu",
      passwordHash,
      role: Role.COORD,
      emails: {
        create: [
          {
            email: "coord@universidad.edu",
            type: EmailType.INSTITUTIONAL,
            verifiedAt: new Date(),
            isPrimary: true
          }
        ]
      }
    }
  });

  await prisma.staffScope.create({
    data: {
      userId: coord.id,
      schoolId: school.id
    }
  });

  await prisma.practiceCase.create({
    data: {
      student: {
        create: {
          primaryEmail: "estudiante@correo.com",
          passwordHash,
          role: Role.STUDENT,
          emails: {
            create: [
              {
                email: "estudiante@correo.com",
                type: EmailType.PERSONAL,
                isPrimary: true
              },
              {
                email: "estudiante@universidad.edu",
                type: EmailType.INSTITUTIONAL,
                verifiedAt: new Date()
              }
            ]
          }
        }
      },
      schoolId: school.id,
      programId: program.id
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
