// src/environments/environment.ts

import { domain, clientId, audience, serverUrl, scope } from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience,
    scope
  },
  dev: {
    serverUrl,
  },
};
