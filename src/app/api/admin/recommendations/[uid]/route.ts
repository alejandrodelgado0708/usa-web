import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;
    const authHeader = request.headers.get('Authorization');
    const backendUrl = `${process.env.NEXT_BASE_URL}/api/admin/recommendations/${uid}`;
    console.log('Proxy DELETE to:', backendUrl);
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers: { Authorization: authHeader || '' },
    });
    const data = await response.json();
    console.log('Backend response:', response.status, data);
    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Error', debug: { uid, backendUrl, status: response.status } }, { status: response.status });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ message: 'Error al conectar con el servidor', error: String(err) }, { status: 500 });
  }
}