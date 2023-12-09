import Wole from '../src';

const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

describe('testing the wole logger methods', () => {
    const wole = new Wole({ url });

    test('test debug logging', async () => {
        await wole.debug("i am a debug logger");
    });

    test('test info logging', async () => {
        await wole.info("i am a info logger");
    });

    test('test warning logging', async () => {
        await wole.warning("i am a warning logger");
    });

    test('test error logging', async () => {
        await wole.error("i am a error logger");
    });

    test('test critical logging', async () => {
        await wole.critical("i am a critical logger");
    });
});
