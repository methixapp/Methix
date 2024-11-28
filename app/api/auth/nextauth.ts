import NextAuth from 'next-auth';
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';

// Ensure environment variables are defined
const clientId = process.env.AZURE_AD_B2C_CLIENT_ID!;
const clientSecret = process.env.AZURE_AD_B2C_CLIENT_SECRET!;
const tenantId = process.env.AZURE_AD_B2C_TENANT_NAME!;
const secret = process.env.NEXTAUTH_SECRET!;

if (!clientId || !clientSecret || !tenantId || !secret) {
  throw new Error('Missing required environment variables for Azure AD B2C.');
}

export default NextAuth({
  providers: [
    AzureADB2CProvider({
      clientId,
      clientSecret,
      tenantId,
      primaryUserFlow: 'B2C_1_signin', // Replace with your user flow name
    }),
  ],
  secret, // Set a strong secret
});
