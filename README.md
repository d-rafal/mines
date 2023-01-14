# Mines App

This **SPA** is a web clone of linux ubuntu mines app.

It's based on **Create React App** environment configuration, written in Typescript and uses following libraries:

- react
- redux (Redux Toolkit)
- react-hook-form
- react-router

Enjoy!

### Analyzing a code, you may find some useless comments. Normally I do not leave such things in production code, but this project I treat as a playground and own repository of some useful code.

If you don't have node.js installed you can run this app in docker container, below some useful commands:

- `docker compose -f ./docker-compose.prod.yml up -d`
- `docker compose -f ./docker-compose.prod.yml up -d --build`
- `docker compose -f ./docker-compose.prod.yml logs -f server`
