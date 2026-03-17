// dữ liệu giả
const data = {
    questions:112,
    score:75,
    flashcards:113
}

document.getElementById("questionDone").innerText = data.questions
document.getElementById("avgScore").innerText = data.score + "%"
document.getElementById("flashcard").innerText = data.flashcards


// hiệu ứng menu
const menuItems = document.querySelectorAll(".menu li") //Tìm li trong .menu

menuItems.forEach(item=>{
    item.addEventListener("click",function(){

        menuItems.forEach(i=>i.classList.remove("active"))
        this.classList.add("active")

    })
})