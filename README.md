# LogToApi

1. Requirement -> log to an http endpoint

2. initialize -> 
    > url (where you want to send the logs to)
    > http-header -> for authentication (bearer token, api key, token)
    > merging // not for now
    > defaultMeta -> object (what you want to send at all time, user agent, os info etc)
    > defaultLevel -> debug | info | or 0 | 1

3. debug - 0, info - 1, warning - 2, error - 3, critical - 4,

4. each method in (3.) accept, message (string) and a meta (object)

5. log -> where you handle all sending to http endpoint
        -> accept level, message (string) and a meta (object)

<!-- private async hasNetworkConnection(): Promise<boolean> {
  return window ? window?.navigator?.onLine : true;
} -->

// const hasNetworkConnection = await this.hasNetworkConnection();

// if (!hasNetworkConnection) {
//     console.log("You're not connected to the internet; cannot send log!");
//     return;
// }

<!-- if (response.ok) {
 console.log(`message: "${message}", sent successfully!`)
} -->