Config system is managed with https://github.com/lorenwest/node-config

This folder will always have default.json and you can create override values in [environment].json

Only default.json goes inside git repo since others contain sensitive passwords.

Q) How does the app decide which override file to use?
$ export NODE_ENV=production
$ node my-app.js