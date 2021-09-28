// getting all required elements
const start_btn = document.querySelector(".start_btn")
const info_box = document.querySelector(".info_box")
const exit_btn = document.querySelector(".quit")
const continue_btn = document.querySelector(".buttons .restart")
const quiz_box = document.querySelector(".quiz_box")
const name = document.querySelector("#name")
const formInput = document.querySelector("form input")
const nameSection = document.querySelector(".candidate-name")
const dateAndTime = document.querySelector(".current-date-and-time")
const option_list = document.querySelector(".option_list")
const timecount = quiz_box.querySelector(".timer_sec")
const timeLine = quiz_box.querySelector(".timer-line")
const result_box = document.querySelector(".result_box")
const restart_box = document.querySelector(".result_box")
const restart_quiz = document.querySelector(".restart")
const quit_quiz = document.querySelector(".end_quiz")

let que_count = 0;
let counter;
let timerValue = 15
let widthValue = 0;
let userScore = 0;

// if start button is clicked

window.addEventListener("load", ()=>{
    quiz_box.classList.add("hide")
    result_box.classList.add("hide")
    info_box.classList.add("hide")

    setInterval(() => {
        dateTime() 
    }, 1000);
})

start_btn.addEventListener("click", ()=>{
    info_box.classList.add("active")
    info_box.classList.remove("hide")
    formInput.classList.add("namePresent")

})


exit_btn.addEventListener("click", ()=>{
    info_box.classList.remove("active")
})

continue_btn.addEventListener("click", ()=>{
    // Timer 
    startTimer(timerValue)
    startTimeLine(0)

    //form validation here
    if(name.value =="" || name.value == null){
        setTimeout(()=>{
            formInput.classList.add("nameMissing")
            setTimeout(()=>{
                alert("Enter your name please")
            },500)
        }, 0000)
    }else{
        info_box.classList.add("hide")
        start_btn.classList.add("hide")
        result_box.classList.add("hide")

        quiz_box.classList.remove("hide")
        nameSection.innerHTML= `${name.value}`
       
      
        showQuestions(que_count)
        quesCounter(que_count)

    }
})

// function date and time
function dateTime (){


    const currentDate = JSON.stringify(new Date())
    console.log(currentDate)
    // let index =0;
    // let empty =[]
    // empty.push(currentDate)
    // dateAndTime.innerText = currentDate
    // index ++;
    // if(index >currentDate.length -1){
    //     index =0;

    // }
}


//getting questions from quest array
function showQuestions(index){
    const ques_text = document.querySelector(".que_text")
    let que_tag = `<span> ${questions[index].num}. ${questions[index].question} </span>`
    let option_tag = `<div class= "option">  ${questions[index].options[0]}   </div>
                        <div class= "option"> ${questions[index].options[1]}   </div>
                        <div class= "option"> ${questions[index].options[2]}   </div>
                        <div class= "option"> ${questions[index].options[3]}   </div>
                 
                          `
    ques_text.innerHTML = que_tag
    option_list.innerHTML = option_tag

    const option = option_list.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
      
            
            option[i].setAttribute("onclick", "optionSelected(this)")         //refer to the function  "optionSelected()" below for the full functionality of this line


            // // or
            //   option[i].setAttribute.addEventListener("click", ()=>{
            // optionSelected(this)  })
       

    }

    
    

}

let tickIcon = `<div class="icon tick"> √</div>`
let crossIcon = `<div class="icon cross"> X</div>`


function optionSelected(value){
    clearInterval(counter)
    clearInterval(counterLine)


    let correctAns = questions[que_count].answer
    let userAns = value.innerText
    let allOptions = option_list.children
    if(userAns == correctAns){
        userScore ++;
        console.log(userScore)
        value.classList.add("correctAnswer")
        value.classList.remove("option")
        value.insertAdjacentHTML("beforeend", tickIcon)

    } else if(userAns != correctAns){
        value.classList.add("incorrectAnswer")
        value.classList.remove("option")
        console.log("let's go there")
        value.classList.remove("option")
        value.insertAdjacentHTML("beforeend", crossIcon)

        //if answer is wrong then automatically select the correct ans
        
        for (let i = 0; i < allOptions.length; i++) {
      
            if(option_list.children[i].innerText == correctAns) {
                option_list.children[i].setAttribute("class", "correctAnswer")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
        

            }     

    }
  }
//   else if (userAns = null || "" && time == "00"){

   
    
//   }   


        //disabling options
        for (let i = 0; i < allOptions.length; i++) {

            option_list.children[i].classList.add("disabled")
        }

        next_btn.style.display = "block"
            
}




//next btn
const next_btn = document.querySelector(".next_btn")
next_btn.addEventListener("click", ()=>{
    if(que_count < questions.length-1){
        que_count ++;
        showQuestions(que_count)
        quesCounter(que_count)
        clearInterval(counter)
        startTimer(timerValue)

        clearInterval(counterLine)
        startTimeLine(widthValue)
        next_btn.style.display= "none"
    } else {
        console.log("questions complete")
        showResultBox()


    }
  
})

function showResultBox(){
quiz_box.classList.add("hide")
result_box.classList.remove("hide")
const scoreText = document.querySelector(".score_text")
if(userScore >= (Math.floor(questions.length)*.8)){

        let scoreTag = ` <span>Congratulations! ${name.value}, you got only <p>${userScore}</p> out of <p>${questions.length}</p></span> `
        scoreText.innerHTML = scoreTag

} else if(userScore >= (Math.floor(questions.length)*.5)){

    let scoreTag = ` <span>Welldone, ${name.value}, you got only <p>${userScore}</p> out of <p>${questions.length}</p></span> `
    scoreText.innerHTML = scoreTag
} else {

    let scoreTag = ` <span>Sorry ${name.value}, you got only <p>${userScore}</p> out of <p>${questions.length}</p></span> `
    scoreText.innerHTML = scoreTag

}


}
function startTimer(time){

    counter = setInterval(timer, 1000)

    function timer(){
        timecount.textContent = time
        time --;
    
        if(time<9){
            timecount.textContent = `0${timecount.textContent}`
        }
        if(time <= 0){
            clearInterval(counter)
            timecount.innerText = "00"

            // let userAns = value.innerText
            let allOptions = option_list.children
            let correctAns = questions[que_count].answer

            for (let i = 0; i < allOptions.length; i++) {
      
                if(option_list.children[i].innerText == correctAns) {
                    option_list.children[i].setAttribute("class", "correctAnswer")
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
            
        
                }     
        
        }

        for (let i = 0; i < allOptions.length; i++) {

            option_list.children[i].classList.add("disabled")
        }

        next_btn.style.display = "block"
            
        }
    }

   
}


function startTimeLine(time){

    counterLine = setInterval(timer, 29)
    function timer(){
        time ++;
    timeLine.style.width = time + "px"
        if(time>549){
        clearInterval(counterLine)

        }
       
    }

   
}


function quesCounter(index){

    const bottom_ques_counter = document.querySelector(".total_que_tag")
    let totalQuesCountTag = `    <span><p>${que_count +1}</p> of <p>  ${questions.length}</p> Question</span>`
    bottom_ques_counter.innerHTML = totalQuesCountTag;

}

quit_quiz.addEventListener("click", ()=>{
    window.location.reload()
})