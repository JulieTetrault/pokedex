# Pokédex

Simple Pokédex app for Thirdbridge technical test.

## Getting Started

### Load Node.js
Before running the project, ensure you're using the correct Node.js version specified in the .nvmrc file. Switch to the appropriate Node.js version with: 
```bash
nvm use
```

### Install Dependencies
Make sure you have all the necessary dependencies installed. Run:
```bash
yarn install
```

### Checkstyle
Ensure your code follows the project's coding standards by running the linter:
```bash
yarn lint
```
You can also reformat the code with:
```bash
yarn lint --fix
```

### Run Project
To start the Expo development server, run:
```bash
yarn start
```
If needed, you can start the Expo server with a cleared cache:
```bash
yarn start:c
```
To open the app on an Android device or emulator:
```bash
yarn android
```
To open the app on an IOS device or emulator:
```bash
yarn ios
```
