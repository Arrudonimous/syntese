import { verifyToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({
          message: "Token é obrigatório",
          type: "error",
          data: {}
        }),
        { status: 400 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return new Response(
        JSON.stringify({
          message: "Token inválido ou expirado",
          type: "error",
          data: {}
        }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Token verificado com sucesso",
        type: "success",
        data: { user: payload }
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Erro interno do servidor",
        type: "error",
        data: {}
      }),
      { status: 500 }
    );
  }
}
