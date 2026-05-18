import { env } from '../config/env.js';

export async function getDerivIntegrationStatus() {
  return {
    configured: Boolean(env.deriv.appId && env.deriv.apiToken),
    message: 'Placeholder service. Add Deriv API calls here when credentials are available.'
  };
}

