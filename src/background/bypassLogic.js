function setTwitterHeader(details) {
    //requestHeaders is of type webRequest.HttpHeaders
    details.requestHeaders = details.requestHeaders.filter(function(header) {
        return header.name !== "Referer"          
    })
    details.requestHeaders.push({
        "name": "Referer",
        "value": "https://t.co/"
    })

    return {requestHeaders: details.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(setTwitterHeader, {
    urls: ["<all_urls>"],
    types: ["main_frame"], },
    ["requestHeaders", "blocking", "extraHeaders"]
);

function crawlerSpoofer(details) {
    var google_adbot_UA = "AdsBot-Google (+http://www.google.com/adsbot.html)"
    details.requestHeaders = details.requestHeaders.filter(function(header) {
        if(header.name === "User-Agent" || header.name === "X-Forwarded-  For") return false;
        return true
    })

    details.requestHeaders.push({
        "name": "User-Agent",
        "value": google_adbot_UA
    })
    details.requestHeaders.push({
        "name": "X-Forwarded-For",
        "value": "66.102.0.0"
    })
    
    return {requestHeaders: details.requestHeaders};    
}

// chrome.webRequest.onBeforeSendHeaders.addListener(crawlerSpoofer, {
//     urls: ["<all_urls>"],
//     types: ["main_frame"], },
//     ["requestHeaders", "blocking", "extraHeaders"]
// );

// todo -> make crawlerSpoofer conditional and add cookie blocking too