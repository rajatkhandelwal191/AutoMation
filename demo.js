const puppeteer = require('puppeteer');

console.log('Before');

let browserWillBeLaunchedPromise = puppeteer.launch({ // puppeteer will return a PROMISE, launch is used to launch the browser
    headless : false, //By default puppeteer is headless(means code will run but no shown to us)
    defaultViewport : null //to maximize screen of website
})

browserWillBeLaunchedPromise.then(function(browserInstance){ //pending se bachne ke liye "then" lgaya//browser khola

    let newTabPromise = browserInstance.newPage() //browser ka new tab khola
     return newTabPromise;
}).then(function(newTab){
    console.log('New tab opened')
    let pageWillBeOpenedPromise = newTab.goto('https://www.pepcoding.com/') //site kholi
    return pageWillBeOpenedPromise

}).then(function(webPage){
    console.log('website opened')
})


console.log('After')
