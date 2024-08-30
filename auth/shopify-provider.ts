// @ts-nocheck

/**
 * * NOT IN USE *
 * This provider setup is used to login with Auth.js which is currently a WIP.
 * Kept in place for future use.
 */

import type { OAuthConfig } from 'next-auth/providers';

export function ShopifyCustomerAccountProvider({
  shopId,
  shopDomain,
  clientId,
  clientSecret,
}: {
  shopId: string;
  clientId: string;
  clientSecret: string;
}): OAuthConfig<{
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  auth_time: number;
  device_uuid: string;
  sid: string;
  dest: string;
  email: string;
  email_verified: boolean;
}> {
  const shopifyBasePath = `https://shopify.com/${shopId}/auth/oauth`;
  const authorizationHeader = btoa(`${clientId}:${clientSecret}`);
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/shopify`;

  return {
    id: 'shopify',
    name: 'Shopify',
    type: 'oidc',
    // version: "2.0",
    clientId,
    clientSecret,
    issuer: `https://${shopDomain}/admin/oauth/authorize`,
    authorization: {
      url: `${shopifyBasePath}/authorize`,
      params: {
        scope: 'openid email https://api.customers.com/auth/customer.graphql',
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
      },
    },
    token: {
      url: `${shopifyBasePath}/token`,
      async request(context) {
        try {
          const response = await fetch(`${shopifyBasePath}/token`, {
            method: 'POST',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${authorizationHeader}`,
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: clientId,
              redirect_uri: redirectUri,
              code: context.params.code || '',
            }),
          });
          const body = await response.json();
          return { tokens: body };
        } catch (err: any) {
          throw new Error(err);
        }
      },
      conform: async (response: Response) => {
        if (response.status === 401) return response;

        const newHeaders = Array.from(response.headers.entries())
          .filter(([key]) => key.toLowerCase() !== "www-authenticate")
          .reduce((headers, [key, value]) => (headers.append(key, value), headers), new Headers());

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      },
    },
    idToken: true,
    checks: ['pkce', 'state'],
    profile(profile): {
      id: string;
      email: string;
    } {
      return {
        id: profile.sub,
        email: profile.email,
      };
    },
    callbacks: {
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
      }
    }
  };
}