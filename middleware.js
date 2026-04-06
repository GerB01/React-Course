import { next } from '@vercel/edge';

export const config = {
  // This ensures the password applies to the entire site
  matcher: '/:path*', 
};

export default function middleware(req) {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const authValue = authHeader.split(' ')[1];
    // This decodes the "User:Pass" string from the browser
    const [user, pwd] = atob(authValue).split(':');

    // SET YOUR CHOSEN CREDENTIALS HERE
    if (user === 'admin' && pwd === 'aliv2026') {
      return next();
    }
  }

  // If not authenticated, trigger the browser's native login popup
  return new Response('Protected Area', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}