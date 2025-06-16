import { auth } from "@clerk/nextjs/server";

export async function getAuthUser() {
  const { userId, user } = await auth();
  if (!userId) return null;
  return {
    id: userId,
    email: user?.emailAddresses[0]?.emailAddress,
    name: user?.fullName,
  };
}
