import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params

    const abstract = await prisma.abstract.findUnique({
      where: { id },
    });

    return Response.json(
      { type: "success", data: abstract, message: "Resumo encontrado" },
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

export async function DELETE(req, { params }) {
  try {
    const { id } = await params

    const foundAbstract = await prisma.abstract.findUnique({
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

    if (!foundAbstract) {
      return Response.json(
        { message: "Resumo não encontrado", type: "error", data: {} },
        { status: 404 }
      )
    }

    if (foundAbstract.userID !== userID) {
      return Response.json(
        { message: "Você não pode deletar esse resumo", type: "error", data: {} },
        { status: 400 }
      )
    }

    const deleteAbstract = await prisma.abstract.delete({
      where: { id },
    })

    await prisma.log.create({
      data: {
        logType: 2,
        description: `Você apagou o resumo : ${foundAbstract.title}`,
        userID
      },
    })

    return Response.json(
      { type: "success", data: deleteAbstract, message: "Resumo apagado" },
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