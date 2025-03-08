import prisma from '@/lib/prisma';

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
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { email, name, password } = await req.json();


    if(!email || !name || !password) {
      return Response.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password
      },
    });

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
