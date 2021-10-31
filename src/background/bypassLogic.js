function setTwitterHeader(details) {
    //requestHeaders is of type webRequest.HttpHeaders
    details.requestHeaders = details.requestHeaders.filter(function(header) {
        return header.name !== "Referer"          
    })
    details.requestHeaders.push({
        "name": "Referer",
        "value": "https://t.co/"
    })
}

chrome.webRequest.onBeforeSendHeaders.addListener(setTwitterHeader, {
    urls: ["<all_urls>"],
    types: ["main_frame"], },
    ["requestHeaders", "blocking", "extraHeaders"]
);