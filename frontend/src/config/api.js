const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const { headers = {}, body, ...rest } = options;

  // n'ajoute pas Content-Type pour les FormData, le navigateur le gère tout seul
  const isFormData = body instanceof FormData;
  const defaultHeaders = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(!isFormData && body ? { "Content-Type": "application/json" } : {}),
    ...headers,
  };

  const res = await fetch(`${BASE}${path}`, {
    headers: defaultHeaders,
    ...(body ? { body } : {}),
    ...rest,
  });

  if (res.status === 401 || res.status === 403) {
    // clone avant de lire le body pour que le composant puisse aussi lire res.json()
    const data = await res.clone().json().catch(() => ({}));
    if (
      data.message === "Token invalide ou expiré." ||
      data.message === "Token manquant."
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return res;
    }
  }

  return res;
}
