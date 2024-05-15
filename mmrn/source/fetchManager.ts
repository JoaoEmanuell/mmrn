import { FetchManagerInterface } from './interfaces/fetchManagerInterface'

export class FetchManager implements FetchManagerInterface {
    defaultPath: string
    requestInit: RequestInit
    timeout: number
    controller: AbortController = new AbortController()
    abort: NodeJS.Timeout

    constructor(
        defaultPath: string,
        requestInit: RequestInit,
        timeout: number = 3000
    ) {
        this.defaultPath = defaultPath
        this.requestInit = requestInit
        this.timeout = timeout
    }

    setAbort() {
        this.abort = setTimeout(() => {
            this.controller.abort()
        }, this.timeout)
    }

    async get(path: String = ''): Promise<Response> {
        const headers = this.requestInit
        headers['method'] = 'GET'
        this.setAbort()
        const response = await fetch(`${this.defaultPath}${path}`, {
            ...this.requestInit,
            signal: this.controller.signal,
        })
        clearTimeout(this.abort)
        return response
    }
    post?(path: String, body: Object): Promise<Response> {
        throw new Error('Method not implemented.')
    }
    put?(path: String, body: Object): Promise<Response> {
        throw new Error('Method not implemented.')
    }
    delete?(path: String): Promise<Response> {
        throw new Error('Method not implemented.')
    }
}
