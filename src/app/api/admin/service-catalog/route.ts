import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const response = await fetch(`${process.env.NEXT_BASE_URL}/api/admin/service-catalog`, {
      headers: { Authorization: authHeader || '' },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Error al conectar con el servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const body = await request.json();
    const response = await fetch(`${process.env.NEXT_BASE_URL}/api/admin/service-catalog`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: authHeader || '',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error' }, { status: response.status });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Error al conectar con el servidor' }, { status: 500 });
  }
}