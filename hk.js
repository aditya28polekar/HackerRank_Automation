const codeFile = require('./code')

const loginLink = "https://www.hackerrank.com/auth/login";
const puppeteer = require('puppeteer')

let email = 'baberiw307@whwow.com'
let password = 'baberiw307@whwow.com'

let page

let BrowserOpenPromise = puppeteer.launch({
    headless : false,
    defaultViewport : null,
    args: ["--start-maximized"]
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
}).then(function(){
    let algoWillBeClickedPromise = WaitAndClick('div[data-automation="algorithms"]' , page)
    return algoWillBeClickedPromise
}).then(function(){
    let warmUpWillBeClickedPromise= WaitAndClick('input[value="warmup"]' , page)
    return warmUpWillBeClickedPromise;
}).then(function(){
    // $$ is query selector all in puppeteer
    let ChallengesArrPromise = page.$$(
        ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
        { delay: 100 }
    );
  
    return ChallengesArrPromise;
}).then(function(questionsArr){
    console.log("No of Questions" + questionsArr.length);

    let questionWillBeSolvedPromise = questionSolver(
      page,
      questionsArr[0],
      codeFile.answers[0]
    )
    return questionWillBeSolvedPromise
})


function WaitAndClick(selector , cpage){
    return new Promise(function(resolve , reject){
        let waitForModalPromise = cpage.waitForSelector(selector)   
        waitForModalPromise.then(function(){
            let clickModalPromise = cpage.click(selector , {delay : 50})
            return clickModalPromise
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
}

function questionSolver(page , question , answer){
    return new Promise(function(resolve , reject){
        let queWillBeClickedPromise = question.click()
        queWillBeClickedPromise.then(function(){
            console.log('question clicked')
            let editor_in_focus = WaitAndClick('.monaco-editor.no-user-select.vs' , page);    
            return editor_in_focus             
        }).then(function(){
            return WaitAndClick('.checkbox-input' , page)
        }).then(function(){
            return page.waitForSelector('.text-area.custominput')           
        }).then(function(){
            return page.type('.text-area.custominput' , answer , {delay : 10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let AisPressed = page.keyboard.press('A' , {delay : 100})
            return AisPressed;
        }).then(function(){
            let XisPressed = page.keyboard.press('X' , {delay : 100})
            return XisPressed;
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed 
        }).then(function(){
            let main_editor_in_focus = WaitAndClick('.monaco-editor.no-user-select.vs' , page)
            return main_editor_in_focus 
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function(){
            let AisPressed = page.keyboard.press('A' , {delay : 100})
            return AisPressed;
        }).then(function(){
            let VisPressed = page.keyboard.press('V' , {delay : 100})
            return VisPressed;
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed 
        }).then(function(){
            page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled' , {delay : 50})
        }).then(function(){
            resolve();
        }).then(function(){
            reject();
        })  
        
    })
}




