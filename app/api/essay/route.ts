import { NextRequest, NextResponse } from 'next/server';
import createDB from '@/data';

/**
 * 新增八股文
 * @param req 请求体
 * @returns 响应体
 */
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("essay data", data);
  const db = createDB('essay.json');
  db.addItem({
    id: Date.now().toString(32).slice(-8),
    time: new Date().toLocaleString(),
    ...data,
  });
  return NextResponse.json({ success: true });
}

/**
 * 获取所有八股文
 * @returns 响应体
 */
export async function GET() {
  const db = createDB('essay.json');
  const items = db.getAllItems();
  return NextResponse.json(items);
}
