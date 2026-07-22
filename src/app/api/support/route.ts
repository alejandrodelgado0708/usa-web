import { NextRequest, NextResponse } from 'next/server';

interface SupportTicket {
  name: string;
  email: string;
  phone: string;
  category: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SupportTicket = await request.json();

    if (!body.name || !body.email || !body.phone || !body.category || !body.description) {
      return NextResponse.json(
        { message: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'El correo electrónico no es válido' },
        { status: 400 }
      );
    }

    const ticket = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      ...body,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
    };

    console.log('=== NUEVO TICKET DE SOPORTE ===');
    console.log(JSON.stringify(ticket, null, 2));
    console.log('===============================');

    // TODO: Persistir el ticket en base de datos o enviar por email/webhook
    // Por ejemplo:
    // await db.collection('support_tickets').insert(ticket);
    // await sendEmail({ to: 'soporte@usaallbenefitsgroup.com', ... });

    return NextResponse.json(
      { message: 'Reporte recibido exitosamente', ticketId: ticket.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Error al procesar el reporte' },
      { status: 500 }
    );
  }
}
