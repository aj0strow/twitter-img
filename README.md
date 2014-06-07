# twitter-img

> I wish Twitter had dynamic profile pics. 

Twitter is infurating to work with because there is no way to ensure a user's profile image is still valid. Twitter advises to cache the image, but if a user changes her Twitter picture it results in a stale url, and the image won't show up on the client. 

One way to fix this is to store the image on a cloud file host, and periodically fetch new data from twitter. That involves background jobs and storage though. 

Instead I prefer how Facebook does it using a dynamic image `src` returning the actual image. 

### How It Works

You request an image.

```
GET /users/image?screen_name=aj0strow
```

The server checks redis to get the most recent image url. If the screen\_name or user\_id has never been requested before, it fetches the user profile using the Twitter REST API v1.1 and updates the url store.

Next it requests the image from Twitter's image server. If the image has changed (404 response code) it fetches the user profile to get the new url, and requests that image. 

Finally it streams the image from Twitter with the exact same headers. Simply put, it's a careful proxy that fixes broken links. 

### Install

This isn't a library so much as a ready-to-go service. Clone the repository, put your credentials in `/config` and put it on a server with redis.


```
$ clone aj0strow twitter-img
$ npm install
$ redis-server
````

Test and run the server with npm scripts.

```
$ npm test
$ npm start
```

### Notes

The server is an express app, so you can mount it as middleware. Redis keys are namespaced with `twitter-img` so should be safe to incorporate in a larger app. 

After benchmarking I discovered it chokes on high concurrency Apache Bench tests. I think it has something to do with Twitter not appreciating tons of requests for the same image ignoring cache headers, because the stream is unexpectedly cut off mid-request. It also might be a slow internet connection at home, or that I simply wrote a shitty server. 

There doesn't seem to be any memory leaks. Tested with `memwatch`. 

Next step is to cache the image file itself in the tmp folder to depend on Twitter as little as possible. Hopefully that's the bottleneck.

License: **MIT**
