# GitHub Release Info Downloader

## How to install
```bash
npm install github-release-downloader
```

## How to use
```javascript
import {GetLatestGitHubReleaseInfo} from 'github-release-info-downloader';
require('babel-polyfill');
require('babel-register');

(async () => {
    let info = await GetLatestGitHubReleaseInfo("ethereumproject/go-ethereum")
    assert(info.releaseName.startsWith('Ethereum Classic Geth'))
    let matchesPattern = (url) => {
      return url.endsWith("tar.gz") && url.includes("linux");
    };
    let selectedDownload = info.downloadList.filter(download => matchesPattern(download.url)).pop()
    console.log(selectedDownload.url + " was updated " + selectedDownload.timeAgo + " and downloaded " + selectedDownload.count.toLocaleString() + " times.")
})();
```