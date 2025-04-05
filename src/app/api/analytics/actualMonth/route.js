import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

import { Zap, BookOpen, Brain, Mail } from "lucide-react";

export async function GET() {
  try {
    const cookieStore = cookies();
    const userID = cookieStore.get("userId")?.value;

    if (!userID) {
      return Response.json(
        { type: "error", message: "Usuário não autenticado", data: null },
        { status: 401 }
      );
    }

    const now = new Date();

    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const logs = await prisma.log.findMany({
      where: {
        userID,
        createdAt: {
          gte: startOfPreviousMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    const logTypeMap = {
      1: "resumo",
      3: "citacao",
      5: "flashcard",
      7: "email",
    };

    const countByType = (logs, start, end) => {
      const result= {
        resumo: 0,
        citacao: 0,
        flashcard: 0,
        email: 0,
      };

      for (const log of logs) {
        if (log.createdAt >= start && log.createdAt <= end) {
          const typeLabel = logTypeMap[log.logType];
          if (typeLabel) {
            result[typeLabel]++;
          }
        }
      }

      return result;
    };

    const getChange = (current, previous) => {
      if (previous === 0) {
        return {
          change: current > 0 ? "+100%" : "0%",
          trend: current > 0 ? "up" : "neutral",
        };
      }

      const percent = ((current - previous) / previous) * 100;
      const trend = percent >= 0 ? "up" : "down";
      const change = `${percent > 0 ? "+" : ""}${percent.toFixed(0)}%`;

      return { change, trend };
    };

    const currentMonth = countByType(logs, startOfCurrentMonth, endOfCurrentMonth);
    const previousMonth = countByType(logs, startOfPreviousMonth, endOfPreviousMonth);

    const metrics = [
      {
        title: "Resumos Criados",
        value: `${currentMonth.resumo}`,
        ...getChange(currentMonth.resumo, previousMonth.resumo),
        icon: <Zap className="h-4 w-4" />,
      },
      {
        title: "Citações Geradas",
        value: `${currentMonth.citacao}`,
        ...getChange(currentMonth.citacao, previousMonth.citacao),
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        title: "Flashcards Estudados",
        value: `${currentMonth.flashcard}`,
        ...getChange(currentMonth.flashcard, previousMonth.flashcard),
        icon: <Brain className="h-4 w-4" />,
      },
      {
        title: "E-mails Criados",
        value: `${currentMonth.email}`,
        ...getChange(currentMonth.email, previousMonth.email),
        icon: <Mail className="h-4 w-4" />,
      },
    ];

    return Response.json(
      { type: "success", data: metrics, message: "Métricas geradas com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Erro interno", type: "error", data: { error } },
      { status: 500 }
    );
  }
}
