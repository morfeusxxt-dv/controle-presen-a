import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [total, todayCount] = await Promise.all([
      prisma.presenca.count(),
      prisma.presenca.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),
    ]);

    return NextResponse.json({
      total,
      today: todayCount,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}
