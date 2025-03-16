import model from '@/lib/gemini';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { title, author, year, publisher, url, doi, format, includeAccessDate, accessDate } = await req.json();

    const cookieStore = await cookies();
    const userID = cookieStore.get("userId").value

    const textPrompt = `Gere uma citação completa no formato solicitado e retorne somente a citação, sem mais nada (ABNT, APA, MLA ou Vancouver) a partir das seguintes informações:

    Título: ${title}
    Autor: ${author}
    Ano: ${year}
    Editora/Periódico: ${publisher}
    URL (opcional): ${url}
    DOI (opcional): ${doi}
    Incluir data de acesso: ${includeAccessDate ? "Sim" : "Não"}
    Data de acesso: ${accessDate}
    Formato da citação: ${format}
    
    Se a data de acesso for necessária no formato escolhido e uma URL for fornecida, inclua a data de acesso corretamente formatada.`;

    const textResult = await model.generateContent(textPrompt);
    let textResponse = textResult.response.text()


    const titlePrompt = `Gere somente um título mais direto para o seguinte texto sem estilizações: ${textResponse}`;
    const titleResult = await model.generateContent(titlePrompt);
    const titleResponse = titleResult.response.text()


    const tagsPrompt = `Gere um array de strings com tags relacionadas ao conteúdo da citação abaixo. As tags devem ser curtas, concisas e representativas do conteúdo principal. As tags devem ser separadas por vírgulas, sendo no maximo de 3 tags. Não adicione nenhuma explicação, apenas as tags.
  
    Citação gerada:
    ${textResponse}`;

    const tagsResult = await model.generateContent(tagsPrompt);
    const tagsResponse = tagsResult.response.text();
    const tagsArray = tagsResponse.split(',').map(tag => tag.trim())


    const createdQuote = await prisma.quote.create({
      data: {
        title: titleResponse,
        description: textResponse,
        userID,
        tags: tagsArray,
        quoteType: format
      }
    })

    await prisma.log.create({
      data: {
        logType: 3,
        description: `Você criou uma citação para o titulo : ${title}`,
        userID
      },
    })

    // console.log(createdQuote)

    return Response.json(
      { type: "success", data: textResponse, message: "Citação gerada" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Erro interno", type: "error", data: error },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const userID = cookieStore.get("userId").value

    const quotes = await prisma.quote.findMany({
      where: {
        userID,
      }
    })

    return Response.json(
      { type: "success", data: quotes, message: "Citações encontradas" },
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