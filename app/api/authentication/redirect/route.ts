/*import { NextResponse } from 'next/server';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { msalConfig, REDIRECT_URI } from '../../../auth/msalConfig';

export async function POST(request: Request) {
  try {
    // Initialize MSAL Confidential Client Application
    const pca = new ConfidentialClientApplication(msalConfig);

    const body = await request.json();
    const code = body.code;

    // Prepare token request
    const tokenRequest = {
      code,
      scopes: ['user.read'],
      redirectUri: REDIRECT_URI,
    };

    // Acquire token by code
    const response = await pca.acquireTokenByCode(tokenRequest);

    return NextResponse.json({
      success: true,
      accessToken: response.accessToken,
      idToken: response.idToken,
    });
  } catch (error) {
    console.error('Error acquiring token:', error);
    return NextResponse.json({ success: false, error: 'Error acquiring token' });
  }
}
*/

export {};