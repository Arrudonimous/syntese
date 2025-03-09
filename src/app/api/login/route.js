import { generateToken } from "@/lib/jwt";
import { comparePassword } from "@/lib/utils";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) return Response.json({ error: "Usuário não encontrado" }, { status: 401 }, { data: {} }, { type: 'error'});

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return Response.json({ error: "Senha inválida" }, { status: 401 }, { data: {} }, { type: 'error'});

    const token = generateToken({ userId: user.id, email: user.email });
    return Response.json({ token }, { status: 200 }, { data: {} }, { type: 'sucess'});

  } catch (error) {
    return Response.json({ error: "Erro interno" }, { status: 500 }, { data: {} }, { type: 'error' });
  }
}
