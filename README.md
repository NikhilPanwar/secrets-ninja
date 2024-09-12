<div align="center">

  <img src='https://github.com/NikhilPanwar/secrets-ninja/blob/master/src/assets/logo-t.png' height="160">

  [![Repo Size](https://img.shields.io/github/languages/code-size/NikhilPanwar/secrets-ninja.svg)](https://github.com/NikhilPanwar/secrets-ninja)
  [![LICENSE](https://img.shields.io/github/license/NikhilPanwar/secrets-ninja.svg)](https://github.com/NikhilPanwar/secrets-ninja/blob/master/LICENSE)
  [![Contributors](https://img.shields.io/github/contributors/NikhilPanwar/secrets-ninja.svg)](https://github.com/NikhilPanwar/secrets-ninja/graphs/contributors)
  [![Last Commit](https://img.shields.io/github/last-commit/NikhilPanwar/secrets-ninja.svg)](https://github.com/NikhilPanwar/secrets-ninja)

  <h1>Secrets Ninja</h1>

  [secrets.ninja](https://secrets.ninja) is a tool for validating API keys and credentials discovered during pentesting. 
  <br>It proivdes a unified interface for testing these keys across services

</div>

## Features

- **Multiple Service Support:** Secrets Ninja supports a wide range of services, each with a dedicated module for validating API keys.
- **Extensible Design:** The project is designed to be easily extensible, allowing for the addition of new modules for other services.
- **User-Friendly Interface:** A simple and intuitive interface for inputting API keys and making requests.
- **Clear Feedback:** Provides clear feedback on the validity of the keys and any information retrieved from the API calls.


## Getting Started

To get started with Secrets Ninja, install the dependencies and run the development server. 

- Install dependencies using below command

```bash
$ npm install
$ npm run dev
```

Access the development server at [http://localhost:5173/](http://localhost:5173/)

## Contributing Modules

Contributions are welcome, particularly new modules for validating API keys on additional services. Please note that due to CORS restrictions, some APIs may not be accessible from the browser. In such cases, the project provides workarounds and clear instructions on how to proceed.

Interested in contributing to the project? [Here's](CONTRIBUTING.md) how you can get started.
