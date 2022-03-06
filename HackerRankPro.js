const loginLink = 'https://www.hackerrank.com/auth/login'
const mail = 'topaca2139@goonby.com'
const password = 'Hacker123@'


let puppeteer = require('puppeteer');
let codeFile = require('./code');  //codeFile has been get 

let page;  // iss  page me jo bhi nya tab bnega vo jaega,  

let BrowserPromise = puppeteer.launch({
    headless : false,
    defaultViewport : null
})

BrowserPromise.then(function(browserInstance){

    let newTabPromise = browserInstance.newPage();
    return newTabPromise

}).then(function(newTab){
    console.log('New tab Opened');

    page = newTab;  //page me newTab Dal diya; 
    
    let pageWillBeOpenedPromise = newTab.goto(loginLink);
    return pageWillBeOpenedPromise;

}).then(function(){

    console.log('Website Opened')

    let typedMailPromise = page.type("input[id='input-1']", mail, {delay : 100,}) //type -- what we want to type in that area

    return typedMailPromise;
    

}).then(function(){

    let typedPasswordPromise = page.type("input[id='input-2']", password, {delay : 100,})

    return typedPasswordPromise;
}).then(function(){

    let LoginButton = page.click("button[type='submit']", {delay : 50,})  //click = what we want to click in that area

    return LoginButton;
}).then(function(){
    let algoWillBeClickedPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]', page); //ALgorithm will be clicked after log in 
                                                                                                //and there is a loader at log in so to remove that wait for log in
                                                                                                //we have made "waitAndClick" function which will first load the 
                                                                                                //log in than it will wait for sel;ector to be picked up
    return algoWillBeClickedPromise;
}).then(function(){
    // console.log('Algorithm is clicked')

    let warmupWillBeClicked = waitAndClick('input[value="warmup"]', page) //again when selecting 'warmup' ..loader starts tfor 'waitAndClick' function again
    return warmupWillBeClicked;

}).then(function(){ //$ = query selector, $$ = querySelector all --> it will take all the values in an array where selector is same
    let ChallengerArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled' , {delay : 100}) 
    //will take array or all the question which comed on first page
    return ChallengerArrPromise  

}).then(function(ChallengerQuestionArr){
    console.log('No of questions = ' + ChallengerQuestionArr.length)  //9

    let questionsWillBeSolvedPromise = questionSolver(page, ChallengerQuestionArr[0], codeFile.answers[0] ) //it will take all the questions from
                                                                                                        // the array and its answers from codeFile 

});



function waitAndClick(selector, currPage){ //currpage will  take current page html

    return new Promise(function(resolve, reject){ //to make new promise

        let waitForModalPromise = currPage.waitForSelector(selector); //waitForSelector is a inbuilt function given by JS
        waitForModalPromise.then(function(){

         let clickForAlgoPromise = currPage.click(selector, {delay : 100}) 
         return clickForAlgoPromise;

        }).then(function(){
            resolve()
        }).catch(function(){
            reject()
        })
    })
}


function questionSolver(page, question, answer){

    return new Promise(function(resolve, reject){
        let questionsWillBeClickedPromise = question.click() //QUESTION CLICKD from question array and so answer will be given from codeFile
        
        questionsWillBeClickedPromise.then(function(){
            let waitForEditorPromise = waitAndClick('.monaco-editor.no-user-select.vs', page); //this selector is used because the code was not working
            //and showing timeout error when selecting quesyions from challengers array
            return waitForEditorPromise;

        }).then(function(){
            // console.log('Questions clicked')
            return waitAndClick('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('.text-area.custominput')
        }).then(function(){
            return page.type('.text-area.custominput', answer, {delay : 15})
        }).then(function(){
            // console.log('Answer typed')

            //now keyboard input to select the text from text editor and pasting it in main editor and then submit

            let ctrlToHoldPromise = page.keyboard.down('Control') //ctrl key pressed
            return ctrlToHoldPromise;

        }).then(function(){
            //now select the text
            let AllKeyIsPressed = page.keyboard.press('A', {delay : 20})
            return AllKeyIsPressed;

        }).then(function(){

            //Now cut the text
            let XkeyIsPressed = page.keyboard.press('X', {delay : 20})
            return XkeyIsPressed;
        }).then(function(){

            //now hold up the ctrl key
            let ctrlKeyIsReleased = page.keyboard.up('Control');
            return ctrlKeyIsReleased;

        }).then(function(){
            //now wait for editor promise beacause its loading tfor waitAndClick function is used

            // console.log('aNSWER SELECTEd')

            let waitForEditorPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return waitForEditorPromise;

        }).then(function(){

            // console.log('Editor selected')
            
            let ctrlToHoldPromise = page.keyboard.down('Control') //ctrl key pressed
            return ctrlToHoldPromise;
        }).then(function(){

            //All elect on editor than paste
            let AllKeyIsPressed = page.keyboard.press('A', {delay : 20})
            return AllKeyIsPressed;

        }).then(function(){

            //Now paste the selected TEXT in the main editor

            let VisPressed = page.keyboard.press('V', {delay : 20})
            return VisPressed;

        }).then(function(){

            let ctrlKeyIsReleased = page.keyboard.up('Control');
            return ctrlKeyIsReleased;
        }).then(function(){
            // now click the run key to submit the code
            return page.click('.hr-monaco__run-code', {delay : 20});
        }).then(function(){
            resolve()
        }).catch(function(err){
            console.log(err);
        })
    })
}


console.log('after')