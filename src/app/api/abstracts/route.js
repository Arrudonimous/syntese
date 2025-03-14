import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import model from "@/lib/gemini";
import wordsCount from "@/utils/wordsCount";

export async function POST(req) {
  try {
    const { prompt, abstractType, abstractSize, includeKeyPoints } = await req.json();

    const cookieStore = await cookies();
    const userID = cookieStore.get("userId").value

    const textPrompt = `Resuma o seguinte texto de forma direta, sem títulos.
    Tipo de resumo: ${abstractType.label}.
    Deve conter aproximadamente ${abstractSize}% do tamanho do texto original.
    
    Texto:
    ${prompt}`;

    const textResult = await model.generateContent(textPrompt);
    let textResponse = textResult.response.text();

    const titlePrompt = `Gere somente um título mais direto para o seguinte texto sem estilizações: ${textResponse}`;
    const titleResult = await model.generateContent(titlePrompt);
    const titleResponse = titleResult.response.text();

    const tagsPrompt = `Gere um array de strings com tags relacionadas ao conteúdo do texto abaixo. As tags devem ser curtas, concisas e representativas do conteúdo principal. As tags devem ser separadas por vírgulas, sendo no maximo de 3 tags. Não adicione nenhuma explicação, apenas as tags.
  
    Texto resumido:
    ${textResponse}`;

    const tagsResult = await model.generateContent(tagsPrompt);
    const tagsResponse = tagsResult.response.text();
    const tagsArray = tagsResponse.split(',').map(tag => tag.trim())
    console.log(tagsArray)

    if (includeKeyPoints) {
      const keyPointsPrompt = `Gere somente os pontos-chave do seguinte texto, separados por duas quebras de linha. Cada ponto deve começar com '• '. Não adicione espaços extras no final:
    
    ${textResponse}`;

      const keyPointsResult = await model.generateContent(keyPointsPrompt);
      const keyPointsResponse = keyPointsResult.response.text().trim();

      textResponse += `\n\n${keyPointsResponse.replace(/• /g, '•  ')}`;
    }
    
    const replacedTextResponse = textResponse.replace(/\n/g, ' ');

    const wordsCountQTD = wordsCount(replacedTextResponse)

    await prisma.abstract.create({
      data: {
        title: titleResponse,
        abstractTypeID: abstractType.value,
        description: replacedTextResponse,
        userID,
        wordsCount: wordsCountQTD,
        tags: tagsArray
      },
    })

    return Response.json(
      { type: "success", data: textResponse, message: "Resumo Gerado" },
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

    const abstracts = await prisma.abstract.findMany({
      where: {
        userID,
      }
    })

    console.log(abstracts)

    return Response.json(
      { type: "success", data: abstracts, message: "Resumos achados" },
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