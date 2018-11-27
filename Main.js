
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      console.log(request.source)

      var gui = ui(safe(request.source))

      chrome.browserAction.setBadgeText({
        text: gui["text"],
        //tabId: tab.id
      })
    
      chrome.browserAction.setBadgeBackgroundColor({
        color: gui["color"],
        //tabId: tab.id
      })

    }
  });

  function safe(arr){
    console.log('entre')
    var links = arr;
    console.log(links.length)
    
    for(var i=0; i<links.length; i++) {
        if(!check(links[i],i)){
            console.log(links[i])
            return false;
        }
      
    }
    return true; 
}

function check(url,i){
    url = url.match(/[\w\-]+(\.[\w\-]+)+/)[0];
    console.log(url)
    console.log(i)
    return window.top_sites.includes(url);
}

function ui(safe){
  if (safe){
      return {text:"safe", color: "green"};
  }else {
      return {text:"risky", color: "red"};
  }
}

/*
chrome.tabs.onUpdated.addListener(function(id, info, tab){

 
  if (info.status !== "complete"){
    console.log('hola')
      return;
  }

  chrome.tabs.executeScript(null, {
    file: "doc.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });


  console.log('entre')
  var gui = ui(link(document))

  chrome.browserAction.setBadgeText({
    text: gui["text"],
    tabId: tab.id
  })

  chrome.browserAction.setBadgeBackgroundColor({
    color: gui["color"],
    tabId: tab.id
  })

});

*/


function onWindowLoad() {
  var message = document.querySelector('#message');
  
  chrome.tabs.executeScript(null, {
    file: "doc.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

  //message.innerText = DOMtoString(document)
  console.log('entre')
}

window.onload = onWindowLoad;