<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">SIAFRENCH API README</h3>
  <p align="center">
    An API build to help you to interact with Sia network without deploy node
    <br />
    <a href="https://github.com/kttm25/siafrench-api/blob/master/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/kttm25/siafrench-api/blob/master/README.md">View Demo</a>
    ·
    <a href="https://github.com/kttm25/siafrench-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/kttm25/siafrench-api/issues">Request Feature</a>
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
See the section about [running tests](https://github.com/kttm25/siafrench-api/README.MD) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

Before using this API, you must install and Sia node to contact Sia network ([Installation instruction](https://sia.tech/get-started)) 

Then use the following endpoints before accessing the plugins : 

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
        "numberactiveshosts": 22,
        "numberactivestoragesACC": 22,
        "currentblockchainheight": 98999,
        "timestamp": 1678878228767
    }
}
```

### GET /networkpower/activeshostslist
Retrieve Active hosts list on the network


```
//Example
curl --location 'localhost:4000/networkpower/activeshostslist'
```

**Response**
```
{
    "request_id": "8848642c-41da-408f-ae71-f77c87e53d20",
    "code": 0,
    "message": "success.",
    "data": {
        "hostslist": [
            {
                "netaddress": "justanotherhost.ddns.net:9882",
                "unlockhash": "f1922aa35f5aa2abc9eca0b0fae93eb79a55932eecf61f3af1c11c717660aeba381c54584240",
                "acceptingcontracts": true
            },
            {
                "netaddress": "193.149.164.242:9882",
                "unlockhash": "11d68c52e67a800d0ca99867e410cfa9c0c3f5bc1726aa90e88f40b7ad0825c91841904dae10",
                "acceptingcontracts": true
            },
            {
                "netaddress": "51.81.242.140:9882",
                "unlockhash": "3c04215cbc22584f03bccdbbe40c6e1f3ecf0810e6a72661e65b1a1219e32195dc7717c4ee1c",
                "acceptingcontracts": true
            }
        ],
        "timestamp": 1733197934747
    }
}
```

### GET /networkpower/allhostslist
Retrieve All hosts list on the network


```
//Example
curl --location 'localhost:4000/networkpower/allhostslist'
```

**Response**
```
{
    "request_id": "8848642c-41da-408f-ae71-f77c87e53d20",
    "code": 0,
    "message": "success.",
    "data": {
        "hostslist": [
            {
                "netaddress": "justanotherhost.ddns.net:9882",
                "unlockhash": "f1922aa35f5aa2abc9eca0b0fae93eb79a55932eecf61f3af1c11c717660aeba381c54584240",
                "acceptingcontracts": true
            },
            {
                "netaddress": "193.149.164.242:9882",
                "unlockhash": "11d68c52e67a800d0ca99867e410cfa9c0c3f5bc1726aa90e88f40b7ad0825c91841904dae10",
                "acceptingcontracts": true
            },
            {
                "netaddress": "51.81.242.140:9882",
                "unlockhash": "3c04215cbc22584f03bccdbbe40c6e1f3ecf0810e6a72661e65b1a1219e32195dc7717c4ee1c",
                "acceptingcontracts": true
            }
        ],
        "timestamp": 1733197934747
    }
}
```

### GET /networkpower/hostshistory
Retrieve hosts history and last top sia hosts


```
//Example
curl --location 'localhost:4000/networkpower/hostshistory'
```

**Response**
```
{
    "request_id": "b3c94344-dd20-4f2e-b06b-107aea34cacb",
    "code": 0,
    "message": "success.",
    "data": {
        "topSiaHosts": {
            "N1": {
                "totalstorage": 22999994466304,
                "netaddress": "siabucket4711.ddns.net"
            },
            "N2": {
                "totalstorage": 10752001835008,
                "netaddress": "sia-test.kuriyasu.net"
            },
            "N3": {
                "totalstorage": 10000000876544,
                "netaddress": "185.200.116.131"
            }
        },
        "hostsHistory": [
            [
                {
                    "activeHostsNumber": 23,
                    "timestamp": 1713118200543
                }
            ]
        ]
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

### GET /networkeconomics/miningprofitability
Get network mining profitability of your node

```
//Example
 curl --location 'localhost:4000/networkeconomics/miningprofitability'
```

**Response**

```
{
    "request_id": "77eabb6d-f89b-4cb4-b0f4-7bd8c3b9b20a",
    "code": 0,
    "message": "success.",
    "data": {
        "currentprofitabilitybymhs": 165009189.502976,
        "currentblockchainheight": 434136,
        "timestamp": 1694089570717,
        "latestminingblockrewards": [
            {
                "value": "30001742610000000000000000000",
                "unlockhash": "9fbe5e0e17cbaab13a8d0a56c33f32222fc48c9512565184401dea648e786db4cc078b90d8f5"
            }
        ]
    }
}
```

### GET /networkeconomics/totalsupply
Get network totalsupply of your node

```
//Example
 curl --location 'localhost:4000/networkeconomics/totalsupply'
```

**Response**

```
{
    "request_id": "9568e540-f9fc-4eec-9401-68a19c73aa9c",
    "code": 0,
    "message": "success.",
    "data": {
        "totalsiacoinincirculation": 9.465600819904237e+33,
        "totalburntsiacoin": 8.339849238018064e+30,
        "currentblockchainheight": 31553,
        "timestamp": 1692662358837
    }
}
```

### GET /networkeconomics/profitspaidbyrenters
Get network profits paid by renters of your node

```
//Example
 curl --location 'localhost:4000/networkeconomics/profitspaidbyrenters'
```

**Response**

```
{
    "request_id": "48458aec-dd4e-4c85-95fe-5eaf318932a6",
    "code": 0,
    "message": "success.",
    "data": {
        "Network_profits_24hrs": 1.1267912515097893e+24,
        "Network_profits_7days": 2.0912262247755924e+28,
        "Network_profits_30days": 1.4152292097427778e+29,
        "timestamp": 1692662358837
    }
}
```

### GET /networkeconomics/siafundprofitability
Get network Siafund profitability of your node

```
//Example
 curl --location 'localhost:4000/networkeconomics/siafundprofitability'
```

**Response**

```
{
    "request_id": "48458aec-dd4e-4c85-95fe-5eaf318932a6",
    "code": 0,
    "message": "success.",
    "data": {
        "Network_profits_24hrs": 1.1267912515097893e+24,
        "Network_profits_7days": 2.0912262247755924e+28,
        "Network_profits_30days": 1.4152292097427778e+29,
        "timestamp": 1692662358837
    }
}
```

### GET /networkmining/miningtotalhashrate
Get network mining total hash rate of your node

```
//Example
 curl --location 'localhost:4000/networkmining/miningtotalhashrate'
```

**Response**

```
{
    "request_id": "b3582a0c-0eab-4a52-a5dc-c3e1e9bf133a",
    "code": 0,
    "message": "success.",
    "data": {
        "currentnetworkmininghashrate": 1.3285950102336483e+26,
        "currentnetworkdifficulty": "16543376526631299275",
        "currentaverageblocktime": 534.8,
        "currentheight": 434136,
        "timestamp": 1694091301459
    }
}
```

### GET /networkmining/topminers
Get network list of top miners

```
//Example
 curl --location 'localhost:4000/networkmining/topminers'
```

**Response**

```
{
    "request_id": "b3582a0c-0eab-4a52-a5dc-c3e1e9bf133a",
    "code": 0,
    "message": "success.",
    "data": {
        "topMiners": [
            {
                "minerHash": "000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69",
                "iteration": 42053,
                "_id": "674e5b72cd8b155696b6ba48"
            },
            {
                "minerHash": "fe3a0558966434ad5cda98559cf19782ee824eb93be312ed99a8f946f67a3bb136481a8f2b6f",
                "iteration": 338,
                "_id": "674e5b72cd8b155696b6ba49"
            },
            {
                "minerHash": "fb1025a60e1ac25199aad4e48819c5003b455b33e2eb53ee550f0f2a63cd1ae390c218e5bad2",
                "iteration": 245,
                "_id": "674e5b72cd8b155696b6ba4a"
            }
        ],
        "timestamp": "1733187809019"
    }
}
```

### GET /networkmining/miningdifficulty
Get network mining difficulty of your node

```
//Example
 curl --location 'localhost:4000/networkmining/miningdifficulty'
```

**Response**

```
{
    "request_id": "ec63dcb1-99f8-4550-b5dc-c748ed4bed8e",
    "code": 0,
    "message": "success.",
    "data": {
        "currentminingdifficulty": "16543376526631299275",
        "currentminingblockreward": "30001742610000000000000000000",
        "currentheight": 434136,
        "timestamp": 1694091355736
    }
}
```

### GET /networkstoragemarketplace/storagepricing
Get network mining difficulty of your node

```
//Example
 curl --location 'localhost:4000/networkstoragemarketplace/storagepricing'
```

**Response**

```
{
    "request_id": "be1a9708-7ce6-411a-b5b8-c6939ce8ee80",
    "code": 0,
    "message": "success.",
    "data": {
        "storagepriceperTbpermonth": null,
        "uploadpriceperTB": null,
        "dowloadpriceperTB": null,
        "timestamp": 1694092002789
    }
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add back to top links
- [ ] Add Changelog
- [ ] Add new features
    - [x] Add Network Storage State route
    - [x] Add Network Actives Hosts route
    - [x] Add Network Usage Ratio route
    - [x] Add Network Mining Profitability
    - [x] Add Network Profits paid by renters route
    - [x] Add Network Total Supply route
    - [x] Add Network Siafund Profitability route
    - [x] Add Network Siafund Distribution route
    - [x] Add Network Storage Pricing route
    - [ ] Add Network Storage contract route
    - [ ] Add Network Curent distribution route



See the [open issues](https://github.com/kttm25/siafrench-api/issues) for a full list of proposed features (and known issues).

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
