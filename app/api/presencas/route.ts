import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth.config';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    
    const presencas = await prisma.presenca.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit ? parseInt(limit, 10) : undefined, // Aplicar limite se fornecido
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