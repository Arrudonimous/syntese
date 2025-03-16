import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params

    const foundQuote = await prisma.quote.findUnique({
      where: { id },
    });

    if (!id) {
      return NextResponse.json(
        { message: "ID não informado", type: "error", data: {} },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const userID = cookieStore.get("userId").value

    if (!foundQuote) {
      return Response.json(
        { message: "Citação não encontrada", type: "error", data: {} },
        { status: 404 }
      )
    }

    if (foundQuote.userID !== userID) {
      return Response.json(
        { message: "Você não pode deletar esse resumo", type: "error", data: {} },
        { status: 400 }
      )
    }

    const deleteQuote = await prisma.quote.delete({
      where: { id },
    })

    await prisma.log.create({
      data: {
        logType: 4,
        description: `Você apagou a citação : ${foundQuote.title}`,
        userID
      },
    })

    return Response.json(
      { type: "success", data: deleteQuote, message: "Citação apagada" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return Response.json(
      { message: "Erro interno", type: "error", data: { error } },
      { status: 500 }
    );
  }
}