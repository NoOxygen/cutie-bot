# Cutie - a general purpose Discord bot

Feel free to fork the repo and modify code according to your requirements.

# How to host

- Install node.js v12.x LTS (make sure you get this right, other versions of Node.js MIGHT break things)

for Windows - https://nodejs.org/dist/v12.18.3/node-v12.18.3-x64.msi

for Linux - https://github.com/nodesource/distributions/blob/master/README.md

- Clone this repo and move to the cloned directory
- Place your "config.json" file in the base/cloned directory. Your Config file MUST be of this format:

```
{
    "token": "<yourToken>",
    "prefix": "<yourPrefix>"
}
```

- Run the following command

```
npm install
```

- Run this final command to get the bot online

```
node index.js
```
