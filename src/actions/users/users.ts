"use server";

import { db } from "@/app/_lib/db";
import { auth } from "@/auth";
import { unstable_noStore as noStore } from "next/cache";

const writeAllowed = ["PHYSICIAN"];
const getAllowed = ["ADMIN"];

export async function findUser(term: string) {
  noStore();

  // if (!term) return { error: "No search term found!" };

  const session = await auth();

  if (
    !session ||
    !session.user.empRole ||
    !getAllowed.includes(session.user.empRole)
  )
    return { error: "Unauthorized!" };

  try {
    const users = await db.user.findMany({
      where: {
        OR: [
          { id: { contains: term, mode: "insensitive" } },
          {
            email: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            id: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!users || users.length < 1) {
      return { error: "No users found!" };
    } else {
      return { success: "Users found!", data: users };
    }
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function getUserById(id: string) {
  noStore();

  if (!id) return { error: "Missing ID!" };

  const user = await db.user.findUnique({
    where: { id },
    include: { profile: { select: { isEmployee: true, isPatient: true } } },
  });

  if (!user) return { error: "User not found!" };

  return { success: "User data fetched!", data: user };
}

export async function getTotalUsersCount() {
  noStore();
  try {
    const total = await db.user.count();
    return { success: "Success!", data: total };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}

export async function getTotalActiveUser() {
  noStore();
  try {
    const totalActive = await db.user.count({ where: { isActive: true } });
    return { success: "Success!", data: totalActive };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}

export async function getTotalInactiveUser() {
  noStore();
  try {
    const totalActive = await db.user.count({ where: { isActive: false } });
    return { success: "Success!", data: totalActive };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}

export async function toggleUserIsActive(userId: string) {
  if (!userId) return { error: "Missing ID" };
  try {
    const existingUser = await db.user.findUnique({ where: { id: userId } });
    if (!existingUser) return { error: "User not found!" };

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        isActive: !existingUser.isActive,
      },
    });

    if (!updatedUser)
      return { error: "An error has occured. Update unsuccessful!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function getPhysicianIds() {
  noStore();

  try {
    const physicians = await db.user.findMany({
      where: {
        role: "EMPLOYEE",
        profile: { employee: { employeeRoleId: "R1002" } },
      },
      select: {
        profile: {
          select: {
            employee: {
              select: { id: true, fname: true, mname: true, lname: true },
            },
          },
        },
      },
    });

    if (!physicians) return { error: "Fetch unsuccessful!" };

    const processedPhysicians = physicians.map((physician) => {
      return {
        id: physician.profile?.employee?.id!,
        name: `${physician.profile?.employee?.fname} ${physician.profile?.employee?.mname} ${physician.profile?.employee?.lname}`,
      };
    });

    return { success: "Fetch successful!", data: processedPhysicians };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}
