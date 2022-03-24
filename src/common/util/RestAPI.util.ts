export const DOMAIN: string = "https://kidspainting.herokuapp.com/api/v1/";

export function getDomain(subPath: string) {
    return DOMAIN + subPath
}

export function fetchRestApi(path: string, method: string | undefined = undefined, body: BodyInit | null | undefined = undefined, headers: HeadersInit | undefined = undefined): Promise<Response> {
    return fetch(path,
        {
            headers: headers,
            method: method,
            body: body,
        });
}

export function getRestApiWithToken(path: string, token: string): Promise<Response> {
    return fetchRestApi(path,
        'GET',
        undefined,
        new Headers({
            Authorization: `Bearer ${token}`,
        }),
    );
}

export function postRestApiWithToken(path: string, body: BodyInit): Promise<Response> {
    return fetchRestApi(path,
        'POST',
        body,
        new Headers({
            'Content-Type': 'application/json',
        }),
    );
}
