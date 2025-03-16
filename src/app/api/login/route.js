import { generateToken } from "@/lib/jwt";
import { comparePassword } from "@/lib/utils";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

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

    const cookieStore = await cookies();

    // Configuração dos cookies para melhor compatibilidade com o Safari
    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      sameSite: "Lax", // Melhor compatibilidade no Safari
    };

    // O token deve ser HTTP-only por segurança
    cookieStore.set("token", token, { ...cookieOptions, httpOnly: true });

    // Outros cookies podem ser acessíveis pelo frontend
    cookieStore.set("userId", user.id, { ...cookieOptions, httpOnly: false });
    cookieStore.set("userEmail", user.email, { ...cookieOptions, httpOnly: false });
    cookieStore.set("userName", user.name, { ...cookieOptions, httpOnly: false });

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
