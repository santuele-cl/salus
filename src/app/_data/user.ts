import { db } from "@/app/_lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            employee: { include: { employeeRole: true } },
            patient: true,
          },
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};
