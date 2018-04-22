# GitHub Release Info Downloader

## How to install
```bash
npm install github-release-downloader
```

## How to use
```html
<script src="../dist/ghReleaseInfo.min.js" type="text/javascript"></script>
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