import { domain, clientId, audience, serverUrl, scope } from '../../auth_config.json';

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience,
    scope
  },
  dev: {
    serverUrl, mapsApiKey: 'AIzaSyA7ghP0Vl3u0QWtS8loJwMI-rqFGSHg8pA'
  },
};
