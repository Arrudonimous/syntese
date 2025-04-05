import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userID = cookieStore.get("userId").value;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    const logs = await prisma.log.findMany({
      where: {
        userID,
        createdAt: {
          gte: startOfYear,
        },
      },
    });

    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const data = Array.from({ length: 12 }, (_, i) => ({
      name: monthNames[i],
      resumos: 0,
      citacoes: 0,
      flashcards: 0,
      emails: 0,
    }));

    logs.forEach((log) => {
      const date = new Date(log.createdAt);
      const month = date.getMonth(); // 0 = Jan, 1 = Fev, ...

      if (month >= 0 && month <= 11) {
        switch (log.logType) {
          case 1:
            data[month].resumos++;
            break;
          case 3:
            data[month].citacoes++;
            break;
          case 5:
            data[month].flashcards++;
            break;
          case 7:
            data[month].emails++;
            break;
        }
      }
    });

    return Response.json(
      { type: "success", data: data, message: "Logs encontrados" },
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