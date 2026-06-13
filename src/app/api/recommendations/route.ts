import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const response = await fetch(`${process.env.NEXT_BASE_URL}/api/recommendations`, {
      headers: { Authorization: authHeader || '' },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Error al conectar con el servidor' }, { status: 500 });
  }
}