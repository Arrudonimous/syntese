import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userID = cookieStore.get("userId").value;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const logs = await prisma.log.findMany({
      where: {
        userID,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    return Response.json(
      { type: "success", data: logs, message: "Logs encontrados" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Erro interno", type: "error", data: { error } },
      { status: 500 }
    );
  }
}
