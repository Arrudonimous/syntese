import { generateToken } from "@/lib/jwt";
import { comparePassword } from "@/lib/utils";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import model from "@/lib/gemini";

export async function POST(req) {
  try {
    const { prompt, abstractType, abstractSize, includeKeyPoints } = await req.json();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId").value

    const textPrompt = `Olá gemini, seguindo um estilo ${abstractType} resuma até ${abstractSize}% o texto a seguir :${prompt}. Sempre gere como se estivesse escrevendo o texto, nunca se referindo a ele, sem estilizações`
    const textResult = await model.generateContent(textPrompt)
    const textResponse = textResult.response.text()

    const titlePrompt = `Gere somente um titulo mais direto para o seguinte texto sem estilizações: ${textResponse}`
    const titleResult = await model.generateContent(titlePrompt)
    const titleResponse = titleResult.response.text()


    if(includeKeyPoints){
      const keyPointsPrompt = `Gere somente e retorne diretamente, sem nenhum espaço em branco(Somente com espaço entre as palavras) e nem quebra de linha ao final, e os separando por ** os pontos chave em relação ao texto a seguir: ${textResponse}`
      const keyPointsResult = await model.generateContent(keyPointsPrompt)
      const keyPointsResponse = keyPointsResult.response.text()
      console.log(keyPointsResponse.split('**'))
    }
    

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