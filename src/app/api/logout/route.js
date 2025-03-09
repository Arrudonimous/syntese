import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();

    cookieStore.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
      sameSite: "Strict",
    });

    cookieStore.set("userId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
      sameSite: "Strict",
    })

    cookieStore.set("userName", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
      sameSite: "Strict",
    })

    return Response.json({ message: "Logout bem-sucedido" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Erro interno", type: 'error', data: {} }, { status: 500 });
  }
}
