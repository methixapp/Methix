/*import { LogLevel } from '@azure/msal-node'; // Import only LogLevel explicitly

// Ensure required environment variables are present
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.CLOUD_INSTANCE || !process.env.TENANT_ID) {
  throw new Error('Missing required environment variables for MSAL configuration');
}

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `${process.env.CLOUD_INSTANCE}${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Verbose, // Correctly use LogLevel here
    },
  },
};

// Check if optional environment variables are set
const REDIRECT_URI = process.env.REDIRECT_URI || '';
const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI || '';
const GRAPH_ME_ENDPOINT = `${process.env.GRAPH_API_ENDPOINT || 'https://graph.microsoft.com/'}v1.0/me`;

export { msalConfig, REDIRECT_URI, POST_LOGOUT_REDIRECT_URI, GRAPH_ME_ENDPOINT };
*/ 