# Dameez3D

Dameez3D is a project to view and manage/organize and share your .stl and .obj 3d printer files. 

###  Client

The basic app uses features available in modern browsers.

### Server

Serves the client app and handles the sharing of your projects with others.

### desktop app

an electron based app that uses the built in node capabilities to scan your computer for files, it uses the client app but also adds features not available to the browser.


____

See the individual package readme.md files for how each package works. 

This project uses npm workspaces and lerna for organizing the packages and publishing them.

Folder/App structure is as follows: 
```
root
 - packages
   -  client
      server
      desktop
```

## Getting started
You will need Nodejs installed on your machine to run this project with npm version 7 as minimum to use the workspaces feature.
```
npm install
```

Now you can run the development servers:

```
npm run dev
```
In your browser check:

 http://localhost:3000 for the client

 http://localhost:3001 for the server

 The desktop app should start.

## Testing

```
npm run test
```