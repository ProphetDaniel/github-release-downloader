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
  let info = await uGetLatestGitHubReleaseInfo("ethereumproject/go-ethereum");
  console.log(info.releaseName + " was updated " + info.timeAgo + " and downloaded " + info.downloadCount.toLocaleString() + " times.",);
  console.log(info.downloadUrl);
})();
```