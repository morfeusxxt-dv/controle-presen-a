import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
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
        // Usando um ID de usuário padrão ou nulo, dependendo do seu esquema
        // Se o campo for obrigatório, você precisará criar um usuário padrão
        userId: '00000000-0000-0000-0000-000000000000',
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
