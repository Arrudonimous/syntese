import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/utils';

export async function GET(req) {
  const { searchParams } = req.nextUrl
  const email = searchParams.get("email")

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return Response.json(user);
  } catch (error) {
    return Response.json({ message: error }, { status: 500 }, { data: {} }, { type: 'sucess'});
  }
}

export async function POST(req) {
  try {
    const { email, name, password } = await req.json();


    if(!email || !name || !password) {
      return Response.json({ message: "Todos os campos são obrigatórios.", type: 'error', data: {} }, { status: 400 });
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (foundUser) return Response.json({ message: "Usuário já cadastrado", type: 'error', data: {} }, { status: 400 })

    const parsedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: parsedPassword
      },
    });

    return Response.json({ message: "Usuário criado com sucesso", type: 'sucess', data: user }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message, type: 'error', data: {} }, { status: 500 });
  }
}
