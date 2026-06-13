import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const authHeader = request.headers.get('Authorization');
    const url = role 
      ? `${process.env.NEXT_BASE_URL}/api/admin/users?role=${role}`
      : `${process.env.NEXT_BASE_URL}/api/admin/users`;
    
    const response = await fetch(url, {
      headers: { Authorization: authHeader || '' },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Error al conectar con el servidor' }, { status: 500 });
  }
}