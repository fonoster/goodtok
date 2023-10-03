import jwtDecode from 'jwt-decode';

export function getConnectionObject(document: Document): GoodTokConnectionObject {
  const scriptTag = document.querySelector('script[src*="unpkg.com/goodtok"], script[src*="lib/client.js"]');
  if (scriptTag) {
    const srcValue = scriptTag.getAttribute('src');

    // Check if srcValue is a fully qualified URL or a relative path
    let fullUrl;
    if (srcValue.startsWith('http://') || srcValue.startsWith('https://')) {
      fullUrl = new URL(srcValue);
    } else {
      // Construct a full URL using window.location as the base for relative paths
      fullUrl = new URL(srcValue, window.location.href);
    }

    // Extract the key and token parameters
    const key = fullUrl.searchParams.get('key');
    const token = fullUrl.searchParams.get('token');

    // Lets decode the base 64 key and obtain the id and server
    const decodedKey = atob(key);
    const keyParts = decodedKey.split(':');

    // Use this parameters to request a token from the server if not token is provided
    // const id = keyParts[0];
    // const server = keyParts[1];

    // Now lets decode the JWT token
    const payload = jwtDecode(token) as { [key: string]: any };

    return {
      aor: payload.aor,
      signalingServer: payload.signalingServer,
      token,
    };
  }
}
