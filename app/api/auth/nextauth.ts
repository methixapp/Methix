/*import NextAuth from 'next-auth';
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';

export default NextAuth({
  providers: [
    AzureADB2CProvider({
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME, // Your tenant name
      primaryUserFlow: 'B2C_1_signin', // Replace with your user flow name
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Set a strong secret
});
*/