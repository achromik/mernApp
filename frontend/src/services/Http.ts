import omit from 'lodash/omit';

// import { config } from 'src/config/config';

export class Http {
    public GET<R>(path: string): Promise<R> {
        return this.makeRequest<R>('GET', path);
    }

    public POST<P, R = P>(path: string, body: P): Promise<R> {
        return this.makeRequest<P, R>('POST', path, body);
    }

    public PUT<P, R = P>(path: string, body: P): Promise<R> {
        return this.makeRequest<P, R>('PUT', path, body);
    }

    public PATCH<P, R = P>(path: string, body: P): Promise<R> {
        return this.makeRequest<P, R>('PATCH', path, body);
    }

    // public formDataPATCH<P, R = P>(path: string, body: P): Promise<R> {
    //     return this.makeRequest<P, R>('PATCH', path, this.prepareFormData<P>(body), true);
    // }

    public DELETE<R>(path: string): Promise<R> {
        return this.makeRequest<R>('DELETE', path);
    }

    private makeRequest<P, R = P>(
        method: string,
        path: string,
        data: P | FormData | null = null,
        useFormData?: boolean,
    ): Promise<R> {
        const body = useFormData || method === 'GET' ? data : JSON.stringify(data);

        const jwt = localStorage.getItem('jwt');

        const headers = omit(
            {
                Authorization: jwt && `JWT ${JSON.parse(jwt)}`,
                'Content-Type': 'application/json',
            },
            useFormData ? 'Content-Type' : '',
        );

        const options = {
            // credentials: 'include',
            body,
            headers,
            method,
        } as RequestInit;

        return fetch('/api/' + path, options).then(async (res: Response) => {
            if (res.ok) {
                return res.json();
            }

            const err: any = new Error(res.statusText);
            err.body = await res.json();
            err.code = res.status;

            throw err;
        });
    }
}
