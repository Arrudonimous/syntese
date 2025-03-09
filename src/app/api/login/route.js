import { generateToken } from "@/lib/jwt";
import { comparePassword } from "@/lib/utils";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma"; // Certifique-se de importar corretamente o Prisma

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { message: "Usuário não encontrado", type: "error", data: {} },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return Response.json(
        { message: "Senha inválida", type: "error", data: {} },
        { status: 401 }
      );
    }

    const token = await generateToken({ userId: user.id, email: user.email });

    // Agora chamamos cookies() com await antes de set()
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      sameSite: "Strict",
    });

    return Response.json(
      { type: "success", data: { token }, message: "Logado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Erro interno", type: "error", data: {} },
      { status: 500 }
    );
  }
}
