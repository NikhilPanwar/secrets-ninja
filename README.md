
# secrets.ninja

secrets.ninja is a robust tool for validating API keys and credentials discovered during pentesting. 
It proivdes a unified interface for testing these keys across services

## Setup and Run

- Instal dependencies using below command

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
