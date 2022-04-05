const loginLink = "https://www.hackerrank.com/auth/login";
const puppeteer = require('puppeteer')

let email = 'baberiw307@whwow.com'
let password = 'baberiw307@whwow.com'

let page

let BrowserOpenPromise = puppeteer.launch({
    headless : false,
    defaultViewport : null
})

BrowserOpenPromise.then(function(browserInstance){
    let newTabPromise = browserInstance.newPage();
    return newTabPromise
}).then(function(newTab){
    page = newTab;
    let pageWillbeopenedPromiese = newTab.goto(loginLink);
    return pageWillbeopenedPromiese
}).then(function(){
    let typeEmailPromise = page.type("input[id='input-1']" , email , {delay : 50})    
    //type expects 3 arguements -> selector , text , delay(in ms)
    return typeEmailPromise
}).then(function(){
    let typePassPromise = page.type("input[id='input-2']" , password , {delay : 50})
    return typePassPromise
}).then(function(){
    let loginPromise = page.click('button[data-analytics="LoginPassword"]' , {delay : 50})
    return loginPromise;
})



