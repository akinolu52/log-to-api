import Wole, { OptionType } from '../src';

const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";
const httpHeaders = { 'Authorization': 'Bearer abc123' };
const defaultMeta = { environment: 'test' };
const defaultLevel = 'debug';

describe('debug testing with wole logger methods', () => {
    let wole: Wole;

    const options: OptionType = {
        url,
        httpHeaders,
        defaultMeta,
        defaultLevel,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        wole = new Wole(options);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create an instance of Logger', () => {
        expect(wole).toBeInstanceOf(Wole);
    });

    it('should log a message', async () => {
        const message = 'Test message';
        const meta = {
            additionalData: 'test'
        };

        const fetchSpy = jest.spyOn(global, "fetch");
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

        await wole.debug(message, meta);

        expect(fetchSpy).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining(httpHeaders),
                body: expect.stringContaining(
                    JSON.stringify({
                        message,
                        meta: {
                            ...defaultMeta,
                            ...meta,
                        }
                    })
                ),
            })
        );
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);
    });

    it('should not log a message', async () => {
        const message = 'Test message';
        const meta = {
            additionalData: 'test'
        };

        const fetchSpy = jest.spyOn(global, "fetch");
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

        await wole.info(message, meta);

        expect(fetchSpy).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining(httpHeaders),
                body: expect.stringContaining(
                    JSON.stringify({
                        message,
                        meta: {
                            ...defaultMeta,
                            ...meta,
                        }
                    })
                ),
            })
        );
        expect(consoleLogMock).not.toHaveBeenCalledWith(`message: "${message}", sent successfully!`);
    });

    it('should not log a message', async () => {
        const message = 'Test message';
        const meta = {
            additionalData: 'test'
        };

        const fetchSpy = jest.spyOn(global, "fetch");
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

        await wole.warning(message, meta);

        expect(fetchSpy).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining(httpHeaders),
                body: expect.stringContaining(
                    JSON.stringify({
                        message,
                        meta: {
                            ...defaultMeta,
                            ...meta,
                        }
                    })
                ),
            })
        );
        expect(consoleLogMock).not.toHaveBeenCalledWith(`message: "${message}", sent successfully!`);
    });

    it('should not log a message', async () => {
        const message = 'Test message';
        const meta = {
            additionalData: 'test'
        };

        const fetchSpy = jest.spyOn(global, "fetch");
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

        await wole.error(message, meta);

        expect(fetchSpy).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining(httpHeaders),
                body: expect.stringContaining(
                    JSON.stringify({
                        message,
                        meta: {
                            ...defaultMeta,
                            ...meta,
                        }
                    })
                ),
            })
        );
        expect(consoleLogMock).not.toHaveBeenCalledWith(`message: "${message}", sent successfully!`);
    });

    it('should not log a message', async () => {
        const message = 'Test message';
        const meta = {
            additionalData: 'test'
        };

        const fetchSpy = jest.spyOn(global, "fetch");
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

        await wole.critical(message, meta);

        expect(fetchSpy).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining(httpHeaders),
                body: expect.stringContaining(
                    JSON.stringify({
                        message,
                        meta: {
                            ...defaultMeta,
                            ...meta,
                        }
                    })
                ),
            })
        );
        expect(consoleLogMock).not.toHaveBeenCalledWith(`message: "${message}", sent successfully!`);
    });
});
