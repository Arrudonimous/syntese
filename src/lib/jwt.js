import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET;

export async function generateToken(payload) {
  try {
    const encoder = new TextEncoder();
    const secret = encoder.encode(SECRET_KEY);

    const jwt = await new SignJWT(payload)
      .setExpirationTime('10h')
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);

    return jwt;
  } catch (error) {
    return null;
  }
}

export async function verifyToken(token) {
  try {
    const encoder = new TextEncoder();
    const secret = encoder.encode(SECRET_KEY);
    
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
