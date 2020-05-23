Commands:

```
{
  "scripts": {
    "build": "bundle exec bridgetown build",
    "serve": "bundle exec bridgetown serve",
    "webpack-build": "webpack --mode production",
    "webpack-dev": "webpack --mode development -w",
    "deploy": "yarn webpack-build && yarn build",
    "sync": "node sync.js",
    "start": "node start.js"
  }
}
```

Two main commands:

# For development

`yarn start`: calls `node start.js`
Uses `concurrently` to run 3 commands simultaneously.

`start.js`

```bash
yarn webpack-dev &
yarn serve &
yarn sync
```

3 ports get taken up.

localhost:4000 - Viewable locally and externally (go to localhost:4002 to view how
to share, uses [BrowserSync] to accomplish this)
localhost:4001 - Viewable only locally.
localhost:4002 - Browser sync

# For Production build

`yarn deploy`

```bash
yarn webpack-build && bundle exec bridgetown build
```

### Docker

```bash
Dockerfile
docker-compose.yml
docker.env
.dockerignore
Gemfile
Gemfile.lock
package.json
yarn.lock

# make sure if opening a new terminal, you set this
source ./docker.env
docker-compose run --rm web bridgetown new . --force

docker-compose up --build
# visit localhost:4000
```
