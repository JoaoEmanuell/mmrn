export interface FetchManagerInterface {
    defaultPath: string
    requestInit: RequestInit
    timeout: number

    get?(path: String): Promise<Response>
    post?(path: String, body: Object): Promise<Response>
    put?(path: String, body: Object): Promise<Response>
    delete?(path: String): Promise<Response>
}
