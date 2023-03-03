import { NextResponse, NextRequest, userAgent } from 'next/server';

export const config = {
  matcher: '/',
};

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const time = Date.now();
  const timeStr = new Date(time).toLocaleDateString();
  const { device } = userAgent(request);
  // const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

  const logData = {
    time: timeStr,
    url: request.url,
    ip: request.ip,
    device: device,
    geo: request.geo,
  };

  console.log(logData);
  return response;
}
