import { NextResponse } from 'next/server';

export async function GET() {
  const cloudInstance = process.env.CLOUD_INSTANCE;
  const tenantId = process.env.TENANT_ID;
  const postLogoutRedirectUri = process.env.POST_LOGOUT_REDIRECT_URI;

  // Validate that all required variables are present
  if (!cloudInstance || !tenantId || !postLogoutRedirectUri) {
    console.error('Missing required environment variables for logout.');
    return NextResponse.json(
      { success: false, error: 'Environment variables are not configured.' },
      { status: 500 }
    );
  }

  const logoutUrl = `${cloudInstance}${tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`;
  return NextResponse.redirect(logoutUrl);
}
