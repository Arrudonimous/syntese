import model from "@/lib/gemini";

export async function POST(req) {
  try {
    const { 
      descriptionByIA,
      cardsGenerateQTD,
      cardsGenerateDifficulty 
    } = await req.json();

    const textPrompt = `Gere ${cardsGenerateQTD} flashcards com dificuldade ${cardsGenerateDifficulty}. Cada flashcard deve conter: front: Uma pergunta, conceito ou palavra-chave relacionada ao conteúdo. back: A resposta correspondente, explicação ou definição baseada no seguinte texto: ${descriptionByIA}. Retorne os flashcards no seguinte formato JSON:

    [
      { "front": "Texto da frente do card", "back": "Texto do verso do card" },
      { "front": "Outro front", "back": "Outro back" }
    ]`;

    const textResult = await model.generateContent(textPrompt);
    let textResponse = textResult.response.text();

    textResponse = textResponse.replace(/```json|```/g, '').trim()

    let flashcards = JSON.parse(textResponse)

    flashcards = flashcards.map((card, index) => ({
      ...card,
      id: index
    }))

    return Response.json(
      { type: "success", data: flashcards, message: "Cards gerados por IA" },
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