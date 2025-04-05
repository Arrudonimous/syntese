import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params

    let flashCardDeck = await prisma.flashcardDeck.findUnique({
      where: { id },
    });


    const findCardsByDeckID = async (deckID) => {
      const cards = await prisma.card.findMany({
        where: {
          deckID
        }
      })

      const cardsReadCount = cards.filter(item => item.read === true).length
      const dueCards = cards.length - cardsReadCount

      const progress = (cardsReadCount / cards.length) * 100

      return { cards, progress, dueCards }
    }

    const { cards } = await findCardsByDeckID(flashCardDeck.id)

    flashCardDeck.cards = cards

    return Response.json(
      { type: "success", data: flashCardDeck, message: "FlashCardDeck encontrado" },
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

    const foundDeck = await prisma.flashcardDeck.findUnique({
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

    if (!foundDeck) {
      return Response.json(
        { message: "Resumo não encontrado", type: "error", data: {} },
        { status: 404 }
      )
    }

    if (foundDeck.userID !== userID) {
      return Response.json(
        { message: "Você não pode deletar esse resumo", type: "error", data: {} },
        { status: 400 }
      )
    }

    const deleteAbstract = await prisma.flashcardDeck.delete({
      where: { id },
    })

    await prisma.log.create({
      data: {
        logType: 6,
        description: `Você apagou o deck : ${foundDeck.title}`,
        userID
      },
    })

    return Response.json(
      { type: "success", data: deleteAbstract, message: "Deck apagado" },
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