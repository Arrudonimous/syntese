import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { title, description, category, cards } = await req.json();

    

    const cookieStore = await cookies();
    const userID = cookieStore.get("userId").value
    
    console.log({
      title,
      description,
      userID: userID,
      category
    })

    const createdDeck = await prisma.flashcardDeck.create({
      data: {
        title,
        description,
        userID: userID,
        category,
        lastUpdated: new Date()
      },
    })

    const mappedCards = cards.map(item => ({ front: item.front, back: item.back, deckID: createdDeck.id, read: false }))

    await prisma.card.createMany({
      data: mappedCards,
    })

    await prisma.log.create({
      data: {
        logType: 1,
        description: `Você criou um deck com titulo: ${title}`,
        userID
      },
    })

    return Response.json(
      { type: "success", data: {}, message: "Deck gerado" },
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

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const userID = cookieStore.get("userId").value

    const flashcardDecks = await prisma.flashcardDeck.findMany({
      where: {
        userID,
      }
    })

    const findCardsByDeckID = async (deckID) => {
      const cards = await prisma.card.findMany({
        where: {
          deckID,
        }
      })

      const cardsReadCount = cards.filter(item => item.read === true).length
      const dueCards = cards.length - cardsReadCount

      const progress = (cardsReadCount / cards.length) * 100

      return { cards, progress, dueCards }
    }
    
    const decksWithCards = await Promise.all(
      flashcardDecks.map(async (deck) => {
        const { cards, progress, dueCards } = await findCardsByDeckID(deck.id);
        
        return { ...deck, cards, cardCount: cards.length, progress, dueCards };
      })
    )

    return Response.json(
      { type: "success", data: decksWithCards, message: "Decks encontrados" },
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