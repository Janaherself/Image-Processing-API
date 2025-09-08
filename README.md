## 🖼️ Image Processing API

#### Resize and cache images effortlessly! This Node.js API allows you to resize images on the fly, cache the results, and serve them quickly for subsequent requests — all written in TypeScript with clean architecture and best practices.

<br>

### ⚡ Features

<ul>
  <li>Resize images <i><b>of any extention</b></i> via URL query parameters.</li>
  <li>Automatic caching of resized images (no duplicates).</li>
  <li>Error handling for missing/invalid parameters.</li>
  <li>TypeScript + ES Modules, with full linting & formatting.</li>
  <li>Fully tested with Jasmine & SuperTest.</li>
</ul>

<br>

### 📁 Project Structure

<pre>
ImageProcessingAPI/
├─ src/                # Source code
│  ├─ index.ts         # Express app
│  ├─ server.ts        # Server entry point
│  ├─ tests/           # Unit & API tests
│  └─ utils/
│      └─ imageProcessor.ts
├─ images/             # Original images
├─ cache/              # Resized images cache
├─ package.json
├─ tsconfig.json
└─ other config files..
</pre>

<br>

### 🚀 Setup

<ol>
  <li>Clone the repository:</li>
  <pre>git clone https://github.com/Janaherself/Image-Processing-API/new/Development <br>cd ImageProcessingAPI</pre>
  
  <li>Install dependencies:</li>
  <pre>npm install</pre>
  
  <li>Build the project for production:</li>
  <pre>npm run build <br>npm start</pre>

  
  <li>Run the tests</li>
  <pre>npm run build <br>npm run jasmine</pre>
  <p>or simply</p>
  <pre>npm run test</pre>
</ol>

<br>

### 📜 Scripts

<code>npm run build</code>: &nbsp; Compile TypeScript to JavaScript <br>
<code>npm run start</code>:	&nbsp; Start compiled JS server from dist/ <br>
<code>npm run lint</code>: &nbsp;	Run ESLint and check code style <br>
<code>npm run format</code>: &nbsp;	Run Prettier to auto-format code <br>
<code>npm run jasmine</code>: &nbsp;	Run tests <br>
<code>npm test</code>: &nbsp; Compile the project &	Run Jasmine + SuperTest tests <br>

<br>

### 🌐 API Endpoints

GET <code>/resize</code> – Resize an image

<table>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>path</td>
    <td>string</td>
    <td>✅</td>
    <td>Name of the original image</td>
  </tr>
  <tr>
    <td>width</td>
    <td>number</td>
    <td>✅</td>
    <td>Target width in pixels</td>
  </tr>
  <tr>
    <td>height</td>
    <td>number</td>
    <td>✅</td>
    <td>Target height in pixels</td>
  </tr>
</table>

<p>Example request: <br></p>
<pre>GET http://localhost:3000/resize?filename=lily.jpg&width=200&height=300</pre>
<p>Responses: <br></p>
<ul>
  <li>200 OK → Returns resized image (also cached).</li>
  <li>400 Bad Request → Missing/invalid parameters.</li>
  <li>404 Not Found → File not found.</li>
</ul>

<br>

<i><p>That's basically it, but it could have more features on the way (who knows!) 🌦️</p></i>

<hr>

> *<p>it might look basic, but remember, it's my first typescript project ever 🥳</p>*
