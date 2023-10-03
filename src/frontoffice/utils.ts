import jwtDecode from 'jwt-decode';

export function getButton(id: string): HTMLButtonElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLButtonElement)) {
    throw new Error(`Element "${id}" not found or not a button element.`);
  }
  return el;
}

export function getAudio(id: string): HTMLAudioElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLAudioElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}

// Helper function to get an HTML audio element
export function getVideoElement(id: string): HTMLVideoElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLVideoElement)) {
    throw new Error(`Element "${id}" not found or not an audio element.`);
  }
  return el;
}

export function getConnectionObject(document: Document): FOConnectionObject {
  const scriptTag = document.querySelector('script[src*="lib/frontoffice.js"]');
  if (scriptTag) {
    const srcValue = scriptTag.getAttribute('src');

    let url = new URL(srcValue, window.location.href);

    const token = url.searchParams.get('token');

    // Needs error handling

    // Now lets decode the JWT token
    const payload = jwtDecode(token) as { [key: string]: any };

    return {
      aor: payload.aor,
      aorLink: payload.aorLink,
      token,
      signalingServer: payload.signalingServer,
    };
  }
}
