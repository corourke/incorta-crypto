## Incorta Components SDK DevEnv Setup

How to set up your development environment for creating new Incorta SDK components. 

The Incorta SDK presumes knowledge of HTML, CSS, JSON, Javascript, Node, NPM, React, and Typescript. You will also need to be familiar with Incorta, including Incorta Analyzer, and analytics concepts in general. 

### Prerequisites

#### Incorta Account

You'll need access to an Incorta cluster. You can request a free account at: `https://cloud.incorta.com/signup`

> Note: At present access is restricted to Incorta internal development, and must use this cluster:
>
> `https://viz-demo.cloudstaging.incortalabs.com/incorta#/login`

#### Install Visual Studio Code

Even if you have another favorite editor, the Javascript handling with VSC is just that good.

https://code.visualstudio.com

#### Install NodeJS

I highly recommend using a package manager for installs. The one I use is [HomeBrew](https://brew.sh). Once HomeBrew is installed, NodeJS can be simply installed with the command: 

```bash
% brew install node
```

You can also install NodeJS using one of the methods for MacOS per instructions.  

https://nodejs.org/en/download

#### Install NPM

The node package manager allows installation of node packages to projects and commands. 

```bash
% brew install npm
```

Note that after you install commands, you will generally need to open a new terminal to use the command. 

#### Install Git client

While not strictly necessary (you can download Git projects as .zip files) it is better to clone projects from the repository so that you can easily pull updates. 

```brew
% brew install git
```

#### Install the Incorta create-incorta-visual package

This lets you create new Incorta components and run the testing server.

```bash
% npm install -g @incorta-org/create-incorta-visual
```

### Pull a sample component and test

The cryptocurrency price component is a sample project you can try in Incorta. 

```bash
git clone https://github.com/corourke/incorta-crypto.git
```

To test the component in Analyzer:

```bash
cd incorta-crypto
npm install 
create-incorta-visual start
```

Use the test instance:

`https://viz-demo.cloudstaging.incortalabs.com/incorta#/login`

Then open the Incorta Analyzer and choose the Developer Visual plugin

To render the component, drag any measure or dimension into the binding tray. 

### To Create a new Incorta Component

``` bash
% npx create-incorta-visual
```

