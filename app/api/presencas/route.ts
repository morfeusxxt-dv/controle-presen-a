import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth.config'; // Corrected import path
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const presencas = await prisma.presenca.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(presencas);
  } catch (error) {
    console.error('Erro ao buscar presenças:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar presenças' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Removendo a verificação de sessão para permitir registro sem autenticação
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Não autorizado' },
    //     { status: 401 }
    //   );
    // }

    const { nome, email, telefone, data } = await request.json();

    if (!nome || !email || !telefone) {
      return NextResponse.json(
        { error: 'Nome, email e telefone são obrigatórios' },
        { status: 400 }
      );
    }

    const presenca = await prisma.presenca.create({
      data: {
        nome,
        email,
        telefone,
        data: data ? new Date(data) : new Date(),
        // userId is now optional based on schema.prisma
        // If you want to link to a user, ensure the user exists and provide a valid ID.
        // For now, it's omitted as it's optional and not provided by the form.
      },
    });

    return NextResponse.json(presenca, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar presença:', error);
    return NextResponse.json(
      { error: 'Erro ao criar presença' },
      { status: 500 }
    );
  }
}