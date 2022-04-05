let puppeteer = require('puppeteer')

console.log('before');

let browserWillBeLaunchedPromise = puppeteer.launch({
    headless : false,
    rgs: ['--start-fullscreen' , '--start-maximized'],
    defaultViewport : null
});

browserWillBeLaunchedPromise.then(function(browserInstance){
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;        
}).then(function(newTab){
    console.log('new tab opened')
    let pageWillBeOpenedPromise = newTab.goto('https://www.pepcoding.com/resources/')
    return pageWillBeOpenedPromise    
}).then(function(){
    console.log('website opened');
})

console.log('after')