type ObjectType = Record<string, any>;
export type LevelType = "debug" | "info" | "warning" | "error" | "critical";

export type OptionType = {
    url: string;
    httpHeaders?: HeadersInit;
    defaultMeta?: ObjectType;
}

/**
 * Represents a logging utility class for sending log messages to a specified URL.
 */
class LogToApi {
    private url: string;
    private httpHeaders?: HeadersInit;
    private defaultMeta?: ObjectType;

    /**
    * Creates an instance of the LogToApi class.
    * @param {string} url - The URL to send the log messages to.
    * @param {HeadersInit} [httpHeaders] - The optional HTTP headers to include in the request.
    * @param {ObjectType} [defaultMeta] - The optional default metadata to include in the log messages.
    */
    constructor(options: OptionType) {
        this.url = options.url;
        this.httpHeaders = options.httpHeaders;
        this.defaultMeta = options.defaultMeta;
    }

    /**
     * Builds the request information object for sending a log message.
     * @param {LevelType} type - The log level type to send.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     * @returns {RequestInit} The request information object.
     * @private
     */
    private buildRequestInfo(type: LevelType, message: string, meta?: ObjectType): RequestInit {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': this.url,
            ...(this.httpHeaders || {}),
        };

        const body = JSON.stringify({
            message,
            type,
            meta: {
                ...this.defaultMeta,
                ...meta,
            },
        });

        return {
            method: "POST",
            headers,
            body,
        };
    }

    /**
    * Handles the error response from the server.
    * @param {Response} response - The response object.
    * @private
    */
    private handleErrorResponse(response: Response): void {
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    }

    /**
     * Checks if there is a network connection.
     * 
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if there is a network connection.
     */
    private async hasNetworkConnection(): Promise<boolean> {
        return window?.navigator?.onLine;
    }

    /**
     * Sends a log message to the specified URL.
     * @param {LevelType} type - The log level type to send.
     * @param {string} message - The log message to send.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     * @returns {Promise<void>} A promise that resolves when the log message is sent successfully.
     * @private
     */
    private async log(type: LevelType, message: string, meta?: ObjectType): Promise<void> {
        try {
            const requestInfo = this.buildRequestInfo(type, message, meta);
            const hasNetworkConnection = await this.hasNetworkConnection();

            if (!hasNetworkConnection) {
                console.log("You're not connected to the internet; cannot send log!");
                return;
            }

            const response = await fetch(this.url, requestInfo);

            this.handleErrorResponse(response);

            if (response.ok) {
                console.log(`message: "${message}", sent successfully!`)
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Sends a log message with the debug level.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     * @returns {Promise<void>} A promise that resolves when the log message is sent successfully.
     */
    async debug(message: string, meta?: ObjectType) {
        await this.log("debug", message, meta);
    }

    /**
    * Sends a log message with the info level.
    * @param {string} message - The log message.
    * @param {ObjectType} [meta] - The optional metadata to include in the log message.
    */
    async info(message: string, meta?: ObjectType) {
        await this.log("info", message, meta);
    }

    /**
     * Sends a log message with the warning level.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     */
    async warning(message: string, meta?: ObjectType) {
        await this.log("warning", message, meta);
    }

    /**
     * Sends a log message with the error level.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     */
    async error(message: string, meta?: ObjectType) {
        await this.log("error", message, meta);
    }

    /**
     * Sends a log message with the critical level.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     */
    async critical(message: string, meta?: ObjectType) {
        await this.log("critical", message, meta);
    }

}

export default LogToApi;
