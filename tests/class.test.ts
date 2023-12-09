import LogToApi from '../src';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: () => Promise.resolve({}),
    })
) as jest.Mock;

// Helper function to reset mocks
const resetMocks = () => {
    (global.fetch as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockImplementation(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: () => Promise.resolve({}),
        })
    );
};

// Mock for console.log to verify outputs
global.console = {
    log: jest.fn(),
} as any;

// Mock for console.error to verify error outputs
global.console.error = jest.fn();

// Define types used in the LogToApi class
type HeadersInit = { [key: string]: string };
type ObjectType = { [key: string]: any };

const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

describe('LogToApi class', () => {
    afterEach(() => {
        resetMocks();
        jest.clearAllMocks();
    });

    test('constructor initializes properties correctly', () => {
        // Arrange
        const httpHeaders: HeadersInit = { 'X-Custom-Header': 'value' };
        const defaultMeta: ObjectType = { app: 'testApp' };

        // Act
        const logToApi = new LogToApi({ url, httpHeaders, defaultMeta });

        // Assert
        expect(logToApi).toHaveProperty('url', url);
        expect(logToApi).toHaveProperty('httpHeaders', httpHeaders);
        expect(logToApi).toHaveProperty('defaultMeta', defaultMeta);
    });

    test('buildRequestInfo constructs correct RequestInit object', () => {
        // Arrange
        const logToApi = new LogToApi({ url });
        const message = 'Test message';
        const meta: ObjectType = { user: 'testUser' };

        // Act
        const requestInfo = logToApi['buildRequestInfo']("info", message, meta);

        // Assert
        expect(requestInfo).toEqual({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': url,
            },
            body: JSON.stringify({
                message,
                type: "info",
                meta,
            }),
        });
    });

    test('handleErrorResponse throws error on bad response', () => {
        // Arrange
        const logToApi = new LogToApi({ url });
        const badResponse = {
            ok: false,
            status: 400,
            statusText: 'Bad Request',
        } as Response;

        // Act & Assert
        expect(() => logToApi['handleErrorResponse'](badResponse)).toThrow('400 Bad Request');
    });

    test('log method sends log message and handles success response', async () => {
        // Arrange
        const logToApi = new LogToApi({ url });
        const message = 'Test log message';
        const meta: ObjectType = { user: 'testUser' };

        // Act
        await logToApi['log']("info", message, meta);

        // Assert
        expect(global.console.log).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);
    });

    test('handleErrorResponse throws error on bad response', () => {
        // Arrange
        const logToApi = new LogToApi({ url });
        const badResponse = {
            ok: false,
            status: 400,
            statusText: 'Bad Request',
        } as Response;

        // Act & Assert
        expect(() => logToApi['handleErrorResponse'](badResponse)).toThrow('400 Bad Request');
    });

    it('should handle API error response', async () => {
        const logToApi = new LogToApi({ url });

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
            } as Response)
        );

        await logToApi.debug('Test message');
        expect(fetch).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
    });

    test('debug method sends log message when default level is set', async () => {
        // Arrange
        const logToApi = new LogToApi({ url });
        const message = 'Debug message';
        const meta: ObjectType = { user: 'testUser' };

        // Mock the console.log method
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // Act
        await logToApi.debug(message, meta);

        // Assert
        expect(fetch).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining(JSON.stringify({ message, type: "debug", meta })),
            })
        );
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);

        // Restore the original console.log method
        consoleLogMock.mockRestore();
    });

    test('warning method sends log message when default level is set', async () => {
        // Arrange
        const logToApi = new LogToApi({ url });
        const message = 'Warning message';
        const meta: ObjectType = { user: 'testUser' };

        // Mock the console.log method
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // Act
        await logToApi.warning(message, meta);

        // Assert
        expect(fetch).toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);

        // Restore the original console.log method
        consoleLogMock.mockRestore();
    });

    test('error method sends log message when default level is set', async () => {
        // Arrange
        const logToApi = new LogToApi({ url });
        const message = 'Error message';
        const meta: ObjectType = { user: 'testUser' };

        // Mock the console.log method
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // Act
        await logToApi.error(message, meta);

        // Assert
        expect(fetch).toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);

        // Restore the original console.log method
        consoleLogMock.mockRestore();
    });

    test('critical method sends log message when default level is set', async () => {
        // Arrange
        const logToApi = new LogToApi({ url });
        const message = 'Critical message';
        const meta: ObjectType = { user: 'testUser' };

        // Mock the console.log method
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // Act
        await logToApi.critical(message, meta);

        // Assert
        expect(fetch).toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);

        // Restore the original console.log method
        consoleLogMock.mockRestore();
    });
});
