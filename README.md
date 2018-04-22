# GitHub Release Info Downloader

## How to install
```bash
npm install github-release-downloader
```

## How to use
### From html page
```html
<script src="https://rawgit.com/ProphetDaniel/github-release-info-downloader/master/dist/ghReleaseInfo.min.js" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script type="text/javascript">
  // use the ghReleaseInfo.js libary
  ghReleaseInfo.get("ethereumproject/go-ethereum").then(function(info){
    let matchesPattern = (url) => {
      return url.endsWith("tar.gz") && url.includes("linux");
    };
    let downloadName = (url) => {
      return url.slice(url.lastIndexOf('/')+1)
    };
    let selectedDownload = info.downloadList.filter(download => matchesPattern(download.url)).pop()
    $(".download").attr("href", selectedDownload.url);
    $(".release-info").text(downloadName(selectedDownload.url) + " was updated " + selectedDownload.timeAgo + " and downloaded " + selectedDownload.count.toLocaleString() + " times.");
    $(".release-info").fadeIn("slow");
  });
</script>

<a class="download">Download</a>
<p class="release-info"></p>
```

[![Run Code Snippet Badge](https://img.shields.io/badge/run-code--snippet-green.svg?longCache=true&style=for-the-badge)](https://rawgit.com/ProphetDaniel/github-release-info-downloader/master/test/index.html)

### From javascript
For the jquery part to work (last 3 statements with $ sign)
Provide a minimum html file as follows:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="../dist/main.js" type="text/javascript"></script>

<a class="download">Download</a>
<p class="release-info"></p>
``` 

where `main.js` is the resulting bundle from webpack with the following `webpack.config.js`
```javascript
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

#### Legacy Javascript `index.js`
```javascript
var ghReleaseInfo = require('github-release-info-downloader');

// use the ghReleaseInfo.js libary
ghReleaseInfo.get("ethereumproject/go-ethereum").then(function(info){
  let matchesPattern = (url) => {
    return url.endsWith("tar.gz") && url.includes("linux");
  };
  let downloadName = (url) => {
    return url.slice(url.lastIndexOf('/')+1)
  };
  
  let selectedDownload = info.downloadList.filter(download => matchesPattern(download.url)).pop()
  $(".download").attr("href", selectedDownload.url);
  $(".release-info").text(downloadName(selectedDownload.url) + " was updated " + selectedDownload.timeAgo + " and downloaded " + selectedDownload.count.toLocaleString() + " times.");
  $(".release-info").fadeIn("slow");
});
```

#### with async/await `index.js`
```javascript
import * as ghReleaseInfo from 'github-release-info-downloader';

(async () => {
  let matchesPattern = (url) => {
    return url.endsWith("tar.gz") && url.includes("linux");
  };
  let downloadName = (url) => {
    return url.slice(url.lastIndexOf('/')+1)
  };
  
  // use the ghReleaseInfo.js libary
  let info = await ghReleaseInfo.get("ethereumproject/go-ethereum");
  let selectedDownload = info.downloadList.filter(download => matchesPattern(download.url)).pop()
  $(".download").attr("href", selectedDownload.url);
  $(".release-info").text(downloadName(selectedDownload.url) + " was updated " + selectedDownload.timeAgo + " and downloaded " + selectedDownload.count.toLocaleString() + " times.");
  $(".release-info").fadeIn("slow");
})()
```