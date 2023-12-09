import LogToApi from '../src';

const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

describe('testing the logToApi logger methods', () => {
    const logToApi = new LogToApi({ url });

    test('test debug logging', async () => {
        await logToApi.debug("i am a debug logger");
    });

    test('test info logging', async () => {
        await logToApi.info("i am a info logger");
    });

    test('test warning logging', async () => {
        await logToApi.warning("i am a warning logger");
    });

    test('test error logging', async () => {
        await logToApi.error("i am a error logger");
    });

    test('test critical logging', async () => {
        await logToApi.critical("i am a critical logger");
    });
});
