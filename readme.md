# Whatsapp API
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Whatsapp API with feature OpenAI

## Server Requirement
- NPM / Yarn
- Node v18.6.0

## Development
Want to contribute? Great! Whatsapp API use typescript for fast developing.
Make a change in your file and instantaneously see your updates!

### Configuration .env
Before production, you must be configuration .env, follow this step.

Open your favorite Terminal and run these commands.
```sh
cp .env.example .env
```

Get your OpenAI Key and Organization ID in [OpenAI](https://beta.openai.com/account/api-keys)

Then open this .env file and custom this data.
```sh
PORT=
OPENAI_API_KEY=
OPENAI_ORGANIZATION_ID=
WHATSAPP_CLIENT_URL=
```

Then open your favorite Terminal and run these commands.

```sh
- npm install
- npm run build
- npm run start
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:3000
```

## License
MIT