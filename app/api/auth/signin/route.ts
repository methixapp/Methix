import { NextResponse } from 'next/server';

export async function GET() {
  const tenantName = '<y3e43f4cf-a559-415e-8bf6-97011f08303c>'; // e.g., mytenant
  const policy = '<your-sign-in-policy>'; // e.g., B2C_1_signin
  const clientId = '<your-client-id>'; // From Azure AD B2C App Registration
  const redirectUri = '<your-redirect-uri>'; // e.g., http://localhost:3000/api/auth/callback

  const authUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policy}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=openid`;

  return NextResponse.redirect(authUrl);
}
