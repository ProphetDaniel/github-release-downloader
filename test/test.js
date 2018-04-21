var assert = require('assert');
import {GetLatestGitHubReleaseInfo} from "../src/GetLatestGitHubReleaseInfo"

describe('Array', function() {
  it('should get repo info', async function() {
    let info = await GetLatestGitHubReleaseInfo("ethereumproject/go-ethereum")
    assert(info.releaseName.startsWith('Ethereum Classic Geth'))
    let matchesPattern = (url) => {
      return url.endsWith("tar.gz") && url.includes("linux");
    };
    let selectedDownload = info.downloadList.filter(download => matchesPattern(download.url)).pop()
    console.log(selectedDownload.url + " was updated " + selectedDownload.timeAgo + " and downloaded " + selectedDownload.count.toLocaleString() + " times.")
  });
});