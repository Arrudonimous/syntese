import model from '@/lib/gemini';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { title, author, year, publisher, url, doi, format, includeAccessDate } = await req.json();


    const textPrompt = `Gere uma citação completa no formato solicitado e retorne somente a citação, sem mais nada (ABNT, APA, MLA ou Vancouver) a partir das seguintes informações:

    Título: ${title}
    Autor: ${author}
    Ano: ${year}
    Editora/Periódico: ${publisher}
    URL (opcional): ${url}
    DOI (opcional): ${doi}
    Incluir data de acesso: ${includeAccessDate ? "Sim" : "Não"}
    Formato da citação: ${format}
    
    Se a data de acesso for necessária no formato escolhido e uma URL for fornecida, inclua a data de acesso corretamente formatada.`;

    const textResult = await model.generateContent(textPrompt);
    let textResponse = textResult.response.text()

    console.log(textResponse)

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
