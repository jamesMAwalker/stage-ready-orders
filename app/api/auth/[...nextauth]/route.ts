// @ts-nocheck

import { auth } from './auth';

import { handlers } from '@/auth';

export const { GET, POST } = handlers;

import { ShopifyCustomerAccountProvider } from '@/auth/shopify-provider';
import NextAuth from 'next-auth';

const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;
const shopId = process.env.SHOPIFY_SHOP_ID;
const shopScopes = process.env.SHOPIFY_API_SCOPES;
const appDomain = process.env.NEXT_PUBLIC_BASE_URL;
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;


export const {  }  = NextAuth({
  providers: [ShopifyCustomerAccountProvider({
    shopId,
    shopDomain,
    clientId,
    clientSecret
  })],
});
