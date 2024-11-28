import { NextResponse } from 'next/server';
import { POST_LOGOUT_REDIRECT_URI } from '../../../auth/msalConfig';

export async function GET() {
  const logoutUrl = `${process.env.CLOUD_INSTANCE}${process.env.TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}`;
  return NextResponse.redirect(logoutUrl);
}
