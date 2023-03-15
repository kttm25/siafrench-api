<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">SIAFRENCH API README</h3>
  <p align="center">
    An API build to help you to interact with Sia network without deploy node
    <br />
    <a href="https://github.com/kttm25/siafrench/blob/master/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/kttm25/siafrench/blob/master/README.md">View Demo</a>
    ·
    <a href="https://github.com/kttm25/siafrench/issues">Report Bug</a>
    ·
    <a href="https://github.com/kttm25/siafrench/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation-and-running-example">Installation and Running example</a></li>
        <li><a href="#available-scripts">Available Scripts</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#references">References</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>


## About The Project

Siafrench APIs provide a way for different software systems to interact with the SIA Network and easily retrieve Data without depoying a new node. It’s allowing developers to build new applications and services on top of the Sia Network. APIs can be used to access onchain data, file managing fonctionnality, or services from other applications, and can be built using a variety of programming languages and technologies.

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation and Running example

```console
> npm install
> npm start
```

<p align="right">(<a href="#top">back to top</a>)</p>

Now the API is available using `http://localhost:4000`

### Available Scripts

Before starting the project, it is necessary to create an .env file based on the .env.temp file.


After that, in the project directory, you can run:

#### `npm start`

Runs the app in the production mode.<br>
Use [http://localhost:4000](http://localhost:4000) to access to plugin.

You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://github.com/kttm25/siafrench/README.MD) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

Before using this API, you must install and Sia node to contact Sia network ([Installation instruction](https://sia.tech/get-started)) 

Then use the following endpoints before accessing the plugins : 

### GET /networkeconomics/miningprofitability
Get network mining profitability of your node

```
//Example
 curl --location 'localhost:4000/networkeconomics/miningprofitability'
```

**Response**

```
{
    "request_id": "1e9b6603-1b35-4496-83fa-f2efe26f1ec4",
    "code": 0,
    "message": "error.",
    "data": "Error: Client network socket disconnected before secure TLS connection was established"
}
```

### GET /networkpower/storagestate
Get all storage state

```
//Example
curl --location 'localhost:4000/networkpower/storagestate'
```

**Response**

```
{
    "request_id": "f1c9f510-bb22-4cdb-83c2-f501506cacab",
    "code": 0,
    "message": "success.",
    "data": {
        "totalnetworkstorage": 35190546104320,
        "usednetworkstorage": 35188700610560,
        "currentblockchainheight": 7450,
        "timestamp": 1678878089759
    }
}
```

### GET /networkpower/activeshosts
Retrieve Active hosts on the network


```
//Example
curl --location 'localhost:4000/networkpower/activeshosts'
```

**Response**
```
{
    "request_id": "e4e6fa8e-8ca6-499c-a4e9-3f778959e0a2",
    "code": 0,
    "message": "success.",
    "data": {
        "numberactivestorage": 11,
        "numberactivestorageACC": 11,
        "currentblockchainheight": 7450,
        "timestamp": 1678878228767
    }
}
```

### GET /networkpower/usageratio
Get current usage ratio of the network

```
//Example
curl --location 'localhost:4000/networkpower/usageratio'
```

**Response**

```
{
    "request_id": "79a703e3-b126-41c2-9416-0fffa001cbd5",
    "code": 0,
    "message": "success.",
    "data": {
        "storageusagepercentage": 1,
        "averagestoragesizeperhost": 3199140554938.1816,
        "currentblockchainheight": 7450,
        "timestamp": 1678878309701
    }
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add back to top links
- [ ] Add Changelog
- [ ] Add new features
-   [x] Add Network Storage State route
-   [x] Add Network Actives Hosts route
-   [x] Add Network Usage Ratio route
-   [x] Add Network Mining Profitability
-   [ ] Add Network Profits paid by renters route
-   [ ] Add Network Total Supply route
-   [ ] Add Network Siafund Profitability route
-   [ ] Add Network Siafund Distribution route
-   [ ] Add Network Storage Pricing route
-   [ ] Add Network Storage contract route
-   [ ] Add Network Curent distribution route



See the [open issues](https://github.com/kttm25/siafrench/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## References

- Documentation:
  - [SIA API](https://api.sia.tech/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are 

**greatly appreciated**.

1. Fork the SiaFrench Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -a -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
