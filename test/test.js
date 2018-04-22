var assert = require('assert');
var ghReleaseInfo = require('../dist/ghReleaseInfo.min');

describe('Get release info suite', function() {
  it('should get repo info', async function() {
    let info = await ghReleaseInfo.get("ethereumproject/go-ethereum")
    let matchesPattern = (url) => {
      return url.endsWith("tar.gz") && url.includes("linux");
    };
    let downloadName = (url) => {
      return url.slice(url.lastIndexOf('/')+1)
    };
    let selectedDownload = info.downloadList.filter(download => matchesPattern(download.url)).pop()
    let downloadFileName = downloadName(selectedDownload.url)
    // console.log(downloadFileName+ " was updated " + selectedDownload.timeAgo + " and downloaded " + selectedDownload.count.toLocaleString() + " times.")
    assert(downloadFileName.startsWith('geth-classic-linux'))
  });
});