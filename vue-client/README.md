# Patient file Vue-Client

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# What is the UI patten for changing data?

Goal: Allow doctor to keep eye contact with patient.

Every box has

1.  A multi change in the header.
2.  Change for each individual row.

For multi change there are 2 possibilities:

1.  There is a single field.
    In this case the history is shown at the bottom
2.  There are multiple fields.
    In this case the history is shown as a drawer

For Change of individual row:

1.  History is shown.

Q1) How to run the test?
vue-client> npm run test-inside-cli

Q2) How to run a single test?
vue-client> npx jest tests/google-title.test.js

Q3) How to run with GUI?
vue-client> npm run test-inside-gui

Q4) How to install and use?
Tutorial -> https://medium.com/touch4it/end-to-end-testing-with-puppeteer-and-jest-ec8198145321
https://github.com/smooth-code/jest-puppeteer

# Code format guidelines

1. Tell VS Code to auto format the code on save
   Code -> preferences -> Settings -> "Format on save"
   (This is not set by default)

2. Code -> preferences -> Settings -> HTML › Format: Wrap Line Length
   120 (This is default no need to change)

3. Editor: Insert Spaces -> Insert spaces when pressing Tab
   On (This is default no need to change)
