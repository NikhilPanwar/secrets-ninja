<div align="center">

  <img src='https://github.com/NikhilPanwar/secrets-ninja/blob/master/src/assets/logo-t.png' height="160">

  [![Repo Size](https://img.shields.io/github/languages/code-size/NikhilPanwar/secrets-ninja.svg)](https://github.com/NikhilPanwar/secrets-ninja)
  [![LICENSE](https://img.shields.io/github/license/NikhilPanwar/secrets-ninja.svg)](https://github.com/NikhilPanwar/secrets-ninja/blob/master/LICENSE)
  [![Contributors](https://img.shields.io/github/contributors/NikhilPanwar/secrets-ninja.svg)](https://github.com/NikhilPanwar/secrets-ninja/graphs/contributors)
  [![Last Commit](https://img.shields.io/github/last-commit/NikhilPanwar/secrets-ninja.svg)](https://github.com/NikhilPanwar/secrets-ninja)

  <h1>Secrets Ninja</h1>

</div>

[secrets.ninja](https://secrets.ninja) is a robust tool for validating API keys and credentials discovered during pentesting. 
It proivdes a unified interface for testing these keys across services

## Setup and Run

- Install dependencies using below command

```bash
npm install
```

- Start the application using below command

```bash
npm run dev
```

## Contributing Modules

Interested in contributing to the project? [Here's](CONTRIBUTING.md) how you can get started.

## Upcoming Features

- I understand that the size of `src/data/detectors.json` is getting big, in future will be moving it to database or having individual JSON for each service.
- I understand that creating a different switch case of each service is redundant, and a universal function can be created for most of these, but I wanted the code to be easily contributable as it can be. 
