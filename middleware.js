export const config = {
  matcher: '/:path*',
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const authValue = authHeader.split(' ')[1];
    // Decodes the browser's authentication string
    const [user, pwd] = atob(authValue).split(':');

    // Credentials: admin / aliv2026
    if (user === 'admin' && pwd === 'aliv2026') {
      return new Response(null, {
        status: 200,
        headers: { 'x-middleware-next': '1' },
      });
    }
  }

  return new Response('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}