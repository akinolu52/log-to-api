type ObjectType = Record<string, any>;
export type LevelType = "debug" | "info" | "warning" | "error" | "critical";

export type OptionType = {
    url: string; 
    httpHeaders?: HeadersInit; 
    defaultMeta?: ObjectType; 
    defaultLevel?: LevelType
}

const levelTypeToNumber: Record<LevelType, number> = {
    "debug": 0,
    "info": 1,
    "warning": 2,
    "error": 3,
    "critical": 4,
}

/**
 * Represents a logging utility class for sending log messages to a specified URL.
 */
class Wole {
    private url: string;
    private httpHeaders?: HeadersInit;
    private defaultMeta?: ObjectType;
    private defaultLevel?: LevelType;

    /**
    * Creates an instance of the Wole class.
    * @param {string} url - The URL to send the log messages to.
    * @param {HeadersInit} [httpHeaders] - The optional HTTP headers to include in the request.
    * @param {ObjectType} [defaultMeta] - The optional default metadata to include in the log messages.
    * @param {LevelType} [defaultLevel] - The optional default log level for the log messages.
    */
    constructor(options: OptionType) {
        this.url = options.url;
        this.httpHeaders = options.httpHeaders;
        this.defaultMeta = options.defaultMeta;
        this.defaultLevel = options.defaultLevel;
    }

    /**
     * Builds the request information object for sending a log message.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     * @returns {RequestInit} The request information object.
     * @private
     */
    private buildRequestInfo(message: string, meta?: ObjectType): RequestInit {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': this.url,
            ...(this.httpHeaders || {}),
        };

        const body = JSON.stringify({
            message,
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
     * Sends a log message to the specified URL.
     * @param {string} message - The log message to send.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     * @returns {Promise<void>} A promise that resolves when the log message is sent successfully.
     * @private
     */
    private async log(message: string, meta?: ObjectType): Promise<void> {
        try {
            const requestInfo = this.buildRequestInfo(message, meta);
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
        const check = this?.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            await this.log(message, meta);
        }
    }

    /**
    * Sends a log message with the info level.
    * @param {string} message - The log message.
    * @param {ObjectType} [meta] - The optional metadata to include in the log message.
    */
    info(message: string, meta?: ObjectType) {
        const check = this?.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

    /**
     * Sends a log message with the warning level.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     */
    warning(message: string, meta?: ObjectType) {
        const check = this.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

    /**
     * Sends a log message with the error level.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     */
    error(message: string, meta?: ObjectType) {
        const check = this?.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

    /**
     * Sends a log message with the critical level.
     * @param {string} message - The log message.
     * @param {ObjectType} [meta] - The optional metadata to include in the log message.
     */
    critical(message: string, meta?: ObjectType) {
        const check = this?.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

}

export default Wole;
