import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get('Authorization');
    const response = await fetch(`${process.env.NEXT_BASE_URL}/api/sellers/${id}/qr`, {
      headers: { Authorization: authHeader || '' },
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
