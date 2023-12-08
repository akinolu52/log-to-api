import Wole from '../src';

test('test debug logging', async () => {
    const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

    const logs = new Wole(url);

    await logs.debug("i am a debug logger");
});

test('test info logging', async () => {
    const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

    const logs = new Wole(url);

    await logs.info("i am a info logger");
});

test('test warning logging', async () => {
    const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

    const logs = new Wole(url);

    await logs.warning("i am a warning logger");
});

test('test warning logging', async () => {
    const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

    const logs = new Wole(url);

    await logs.warning("i am a warning logger");
});

test('test debug logging', async () => {
    const url = "https://webhook.site/bfc693e6-36f9-4fcb-8b23-53a8f024ddae";

    const logs = new Wole(url);

    await logs.debug("i am a debug logger");
});

