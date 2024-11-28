import { NextResponse } from 'next/server';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { msalConfig, REDIRECT_URI } from '../../../auth/msalConfig';

export async function GET() {
  const pca = new ConfidentialClientApplication(msalConfig);

  const authCodeUrlParameters = {
    scopes: ['user.read'],
    redirectUri: REDIRECT_URI,
  };

  try {
    const authCodeUrl = await pca.getAuthCodeUrl(authCodeUrlParameters);
    return NextResponse.redirect(authCodeUrl);
  } catch (error) {
    console.error('Error generating Auth Code URL:', error);
    return NextResponse.json({ success: false, error: 'Error redirecting to Azure AD' });
  }
}
