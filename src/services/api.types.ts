export interface ApiConfig {
    /**
     * The URL of the api.
     */
    url: string;

    /**
     * Milliseconds before we timeout the request.
     */
    timeout: number;
}

export interface ApiResponse {
    status: number;
    data: any;
}
