type ObjectType = Record<string, any>;
type LevelType = "debug" | "info" | "warning" | "error" | "critical";

const levelTypeToNumber: Record<LevelType, number> = {
    "debug": 0,
    "info": 1,
    "warning": 2,
    "error": 3,
    "critical": 4,
}

class Luger {
    private url: URL;
    private httpHeaders?: HeadersInit;
    private defaultMeta?: ObjectType;
    private defaultLevel?: LevelType;

    constructor(url: URL, httpHeaders?: HeadersInit, defaultMeta?: ObjectType, defaultLevel?: LevelType) {
        this.url = url;
        this.httpHeaders = httpHeaders;
        this.defaultMeta = defaultMeta;
        this.defaultLevel = defaultLevel;
    }

    private async hasNetworkConnection(): Promise<boolean> {
        return navigator.onLine;
    }

    private buildRequestInfo(message: string, meta?: ObjectType): RequestInit {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': this.url.toString(),
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

    private handleErrorResponse(response: Response): void {
        // network error in the 4xx–5xx range
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    }

    private async log(message: string, meta?: ObjectType): Promise<void> {
        try {
            const hasNetworkConnection = await this.hasNetworkConnection();

            if (!hasNetworkConnection) {
                console.log("You're not connected to the internet; cannot send log!");
                return;
            }

            const requestInfo = this.buildRequestInfo(message, meta);
            const response = await fetch(this.url, requestInfo);

            this.handleErrorResponse(response);
        } catch (error) {
            console.log(error);
        }
    }

    debug(message: string, meta?: ObjectType) {
        const check = this.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

    info(message: string, meta?: ObjectType) {
        const check = this.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

    warning(message: string, meta?: ObjectType) {
        const check = this.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

    error(message: string, meta?: ObjectType) {
        const check = this.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

    critical(message: string, meta?: ObjectType) {
        const check = this.defaultLevel && levelTypeToNumber[this.defaultLevel];
        if (!Number.isNaN(check)) {
            this.log(message, meta);
        }
    }

}

export { Luger };
