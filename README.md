<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">SIAFRENCH API README</h3>
  <p align="center">
    An API to transfer data from HDFS storage to IPFS distributed storage
    <br />
    <a href="https://github.com/kttm25/Junkstora-v2/blob/master/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/kttm25/Junkstora-v2/blob/master/README.md">View Demo</a>
    ·
    <a href="https://github.com/kttm25/Junkstora-v2/issues">Report Bug</a>
    ·
    <a href="https://github.com/kttm25/Junkstora-v2/issues">Request Feature</a>
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

JUNKSTORA-V2 is a database storage library for building decentralized applications in Javascript, currently focused on Filecoin's IPFS platform.

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

Now the API is available using `http://localhost:3000`

### Available Scripts

Before starting the project, it is necessary to create an .env file based on the .env.temp file.


After that, in the project directory, you can run:

#### `npm start`

Runs the app in the production mode.<br>
Use [http://localhost:3000](http://localhost:3000) to access to plugin.

You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

Before using this API, you must install ipfs node to contact ipfs network ([Installation instruction](https://docs.ipfs.tech/install/command-line/#system-requirements)) and HDFS node ([Installation instruction](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/SingleCluster.html)). 

Then use the following endpoints before accessing the plugins : 

### POST /hdfs/savedata
Save an file in HDFS storage

**Parameters**

|  Name | Required |  Type   | Description                                                                                                                                               |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `file` | required | file  | File to save                             |

```
//Example
 curl --location --request POST 'localhost:3000/hdfs/savedata' \
--form 'file=@"/C:/Users/HDFS/Pictures/test.txt"'
```

**Response**

```
{
    "success": true,
    "link": "hdfs://0.0.0.0:19000/new/test.txt"
}
```

### GET /hdfs/getdata
Get content of file in HDFS

**Parameters**

|  Name | Required |  Type   | Description                                                                                                                                               |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `filelink` | required | string  | Link to file in HDFS storage                                         |


```
//Example
curl --location --request GET 'localhost:3000/hdfs/getdata' \
--header 'Content-Type: application/json' \
--data-raw '{
    "filelink" : "/new/test.txt"
}'
```

**Response**

```
{
    "success": true
    "data": "tzazd"
}
```

### GET /hdfs/getlistfile
Retrieve the file tree on the hdfs storage


```
//Example
curl --location --request GET 'localhost:3000/hdfs/getlistfile'
```

**Response**
```
{
    "success": true,
    "listFile": [
        {
            "fullpath": "/new/test.txt",
            "owner": "webuser",
            "fileId": 16408,
            "type": "FILE"
        },
        {
            "fullpath": "/test/file.txt",
            "owner": "webuser",
            "fileId": 16402,
            "type": "FILE"
        },
        {
            "fullpath": "/test/file1.txt",
            "owner": "webuser",
            "fileId": 16390,
            "type": "FILE"
        },
        {
            "fullpath": "/test/sub/file.txt",
            "owner": "webuser",
            "fileId": 16406,
            "type": "FILE"
        }
    ]
}
```

### POST /hdfs/transferttoipfs
Transfer file from HDFS to IPFS

**Parameters**

|  Name | Required |  Type   | Description                                                                                                                                               |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `filelink` | required | string  | Link to file in HDFS storage                                         |
```
//Example
curl --location --request POST 'localhost:3000/hdfs/transferttoipfs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "filelink" : "/test/sub/file.txt"
}'
```

**Response**

```
{
    "success": true,
    "CID": "QmYtcPaZaD792iX4gLNk9g7uhoKkQpaATFXMFKAaKK19B4",
    "ipfslink": "http://35.93.63.122:8000/ipfs/bafybeibjbq3tmmy7wuihhhwvbladjsd3gx3kfjepxzkq6wylik6wc3whzy/#/ipfs/QmYtcPaZaD792iX4gLNk9g7uhoKkQpaATFXMFKAaKK19B4"
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add back to top links
- [ ] Add Changelog

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## References

- Documentation:
  - [IPFS CONFIG](https://github.com/ipfs/js-ipfs/blob/master/docs/CONFIG.md)
  - [IPFS HTTP CLIENT](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#readme)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are 

**greatly appreciated**.

1. Fork the Mintrand Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -a -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
