import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('=== 中间件开始执行 ===');
  console.log('请求URL:', request.url);
  console.log('请求方法:', request.method);
  
  const { pathname } = request.nextUrl;
  console.log('----pathname---', pathname);
  
  if (pathname !== "/login" && pathname !== "/register") {
    const token = request.cookies.get("token")?.value;
    console.log('----token---', token);
    if (!token) {
      console.log('没有token，重定向到登录页面');
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  
  console.log('=== 中间件执行完成 ===');
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 匹配所有页面路由，排除API路由和静态文件
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
