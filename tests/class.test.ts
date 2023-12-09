import Wole, { LevelType } from '../src';

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

// Define types used in the Wole class
type HeadersInit = { [key: string]: string };
type ObjectType = { [key: string]: any };

const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

describe('Wole class', () => {
    afterEach(() => {
        resetMocks();
        jest.clearAllMocks();
    });

    test('constructor initializes properties correctly', () => {
        // Arrange
        const headers: HeadersInit = { 'X-Custom-Header': 'value' };
        const defaultMeta: ObjectType = { app: 'testApp' };
        const defaultLevel: LevelType = 'debug';

        // Act
        const wole = new Wole(url, headers, defaultMeta, defaultLevel);

        // Assert
        expect(wole).toHaveProperty('url', url);
        expect(wole).toHaveProperty('httpHeaders', headers);
        expect(wole).toHaveProperty('defaultMeta', defaultMeta);
        expect(wole).toHaveProperty('defaultLevel', defaultLevel);
    });

    test('buildRequestInfo constructs correct RequestInit object', () => {
        // Arrange
        const wole = new Wole(url);
        const message = 'Test message';
        const meta: ObjectType = { user: 'testUser' };

        // Act
        const requestInfo = wole['buildRequestInfo'](message, meta);

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
                meta,
            }),
        });
    });

    test('handleErrorResponse throws error on bad response', () => {
        // Arrange
        const wole = new Wole(url);
        const badResponse = {
            ok: false,
            status: 400,
            statusText: 'Bad Request',
        } as Response;

        // Act & Assert
        expect(() => wole['handleErrorResponse'](badResponse)).toThrow('400 Bad Request');
    });

    test('log method sends log message and handles success response', async () => {
        // Arrange
        const wole = new Wole(url);
        const message = 'Test log message';
        const meta: ObjectType = { user: 'testUser' };

        // Act
        await wole['log'](message, meta);

        // Assert
        expect(global.console.log).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);
    });

    test('handleErrorResponse throws error on bad response', () => {
        // Arrange
        const wole = new Wole(url);
        const badResponse = {
            ok: false,
            status: 400,
            statusText: 'Bad Request',
        } as Response;

        // Act & Assert
        expect(() => wole['handleErrorResponse'](badResponse)).toThrow('400 Bad Request');
    });

    it('should handle API error response', async () => {
        const wole = new Wole(url);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
            } as Response)
        );

        await wole.debug('Test message');
        expect(fetch).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
    });

    test('debug method sends log message when default level is set', async () => {
        // Arrange
        const wole = new Wole(url, undefined, undefined, 'debug');
        const message = 'Debug message';
        const meta: ObjectType = { user: 'testUser' };

        // Mock the console.log method
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // Act
        await wole.debug(message, meta);

        // Assert
        expect(fetch).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining(JSON.stringify({ message, meta })),
            })
        );
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);

        // Restore the original console.log method
        consoleLogMock.mockRestore();
    });

    test('warning method sends log message when default level is set', async () => {
        // Arrange
        const wole = new Wole(url, undefined, undefined, 'warning');
        const message = 'Warning message';
        const meta: ObjectType = { user: 'testUser' };

        // Mock the console.log method
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // Act
        await wole.warning(message, meta);

        // Assert
        expect(fetch).toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);

        // Restore the original console.log method
        consoleLogMock.mockRestore();
    });

    test('error method sends log message when default level is set', async () => {
        // Arrange
        const wole = new Wole(url, undefined, undefined, 'error');
        const message = 'Error message';
        const meta: ObjectType = { user: 'testUser' };

        // Mock the console.log method
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // Act
        await wole.error(message, meta);

        // Assert
        expect(fetch).toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);

        // Restore the original console.log method
        consoleLogMock.mockRestore();
    });

    test('critical method sends log message when default level is set', async () => {
        // Arrange
        const wole = new Wole(url, undefined, undefined, 'critical');
        const message = 'Critical message';
        const meta: ObjectType = { user: 'testUser' };

        // Mock the console.log method
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // Act
        await wole.critical(message, meta);

        // Assert
        expect(fetch).toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(`message: "${message}", sent successfully!`);

        // Restore the original console.log method
        consoleLogMock.mockRestore();
    });

    // Additional tests should be written for info, warning, error, and critical methods
    // following the same pattern as the debug method test above.

    // Tests should also cover cases where defaultLevel is not set or is an invalid value,
    // and cases where the fetch call fails due to network issues or other reasons.
});
