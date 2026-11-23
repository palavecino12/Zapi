
const TOKEN_KEY = "zapi_token";

export const authFetch = async (
    input: RequestInfo | URL,
    init: RequestInit = {}
): Promise<Response> => {

    const token = sessionStorage.getItem(TOKEN_KEY);

    if (!token) {
        throw new Error("No hay una sesión activa. Iniciá sesión nuevamente.");
    }

    // Conservamos los headers que ya tenga la petición.
    const headers = new Headers(init.headers);

    // Agregamos el JWT.
    headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(input, {
        ...init,
        headers
    });

    // Si el servidor rechaza el token, notificamos al AuthProvider.
    if (response.status === 401) {
        window.dispatchEvent(new Event("auth:unauthorized"));
    }

    return response;
};
