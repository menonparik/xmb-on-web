const video = document.getElementById("vid")
const titles = document.getElementById("title")
const warning = document.querySelectorAll(".warning")[0]
const menu = document.getElementById("menu")
const clockSection = document.querySelectorAll(".clock")[0]
const dateTime = document.getElementById("date")
const xmbMain = document.querySelectorAll(".xmb-main")[0]
const homeSection = document.querySelectorAll(".xmb-title.homeMenu")[0]
const settingsSection = document.querySelectorAll(".xmb-title.settings")[0]
const photoSection = document.querySelectorAll(".xmb-title.messages")[0]
const musicSection = document.querySelectorAll(".xmb-title.music")[0]
const videoSection = document.querySelectorAll(".xmb-title.videos")[0]
const gameSection = document.querySelectorAll(".xmb-title.games")[0]
const submenuOne = document.querySelectorAll(".submenu.one")
const submenuTwo = document.querySelectorAll(".submenu.two")
const submenuThree = document.querySelectorAll(".submenu.three")
const projectImage = document.querySelectorAll(".infowrapper")
const closeButton = document.getElementById("close") 
const section = document.querySelectorAll(".xmb-title")
const startupSound = document.getElementById("startup")
const navSound = document.getElementById("nav")

let isHome = true
let isSettings = false
let isPhotos = false
let isMusic = false
let isVideo = false
let isGame = false
let isSubOne = true
let isSubTwo = false
let isSubThree = false
let sectionNumber = 0
let multiSection = 0
photoSection.style.marginLeft = '90px'
startupSound.play()


let checkLoad = () =>{
    return new Promise((resolve, reject) => {
        window.onload = resolve
    })
}

let titlesTimeOut = () =>{
    return new Promise(resolve => {
        setTimeout(resolve, 10000)
    }
    )
}

let warningTimeOut = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 7000)
    }
    )
}

let warningDisplay = async () =>{
    await titlesTimeOut();
    titles.remove()
    warning.style.opacity = '1'
    setTimeout( () =>{
        warning.style.opacity = '0'
        warning.remove()
    }, 6000)
    await warningTimeOut();
}

let sideClock = () => {
    let d  = new Date()
    let clock = `${d.getDate()}/${d.getMonth()+1} ${d.getHours()}:${d.getMinutes()}`
    dateTime.innerText = clock
    setTimeout(sideClock, 1000)
}

let loadTitles = async () =>{
    await checkLoad()
    video.play()
    video.style.opacity = '1'
    titles.style.opacity = '1'
    await warningDisplay();
    // await titlesTimeOut()
}

let loadMenu = async () =>{
    await loadTitles()
    menu.style.opacity = '1'
    sideClock()
    clockSection.style.opacity = '1'
    console.log(homeSection)
}

let focusHome =  () =>{
    sectionNumber = 0
    isHome = true
    isSettings = false
    settingsSection.classList.remove("active")
    homeSection.classList.remove("inactive")
    photoSection.style.marginLeft = '65px'
    if(isSettings){
        settingsSection.classList.remove("active")
        homeSection.classList.remove("inactive")
    }
    else if(isPhotos){
        homeSection.classList.add("inactive")
    }
    console.log("in home")
    console.log("section number is now 0")
}

let focusSettings = () => { 
    sectionNumber = 1
    multiSection = 0
    isHome = false
    isSettings = true
    settingsSection.classList.add("active")
    homeSection.classList.add("inactive")
    
    if (document.body.clientWidth < 1400) {
        xmbMain.style.marginRight = '1%'
    }
    else {
        xmbMain.style.marginRight = '18%'
    }
    photoSection.style.marginLeft = '75px'
    
    if(isPhotos){
        photoSection.classList.remove("active")
    }
    console.log("in projects")
    console.log("section number is now 1")
}

let focusPhotos = () => {
    sectionNumber = 2
    isHome = false
    isSettings = false
    isPhotos = true
    settingsSection.classList.remove("active")
    photoSection.classList.add("active")
    
    if (document.body.clientWidth < 1400) {
        xmbMain.style.marginRight = '32%'
    }
    else {
        xmbMain.style.marginRight = '35%'
    }

    if(isMusic){
        musicSection.classList.remove("active")
    }
    console.log("in Contacts")
    console.log("section number is now 2")
}

let focusMusic = () =>{
    sectionNumber = 3
    isHome = false
    isSettings = false
    isPhotos = false
    isMusic = true
    photoSection.classList.remove("active")
    musicSection.classList.add("active")
    
    if (document.body.clientWidth < 1400) {
        xmbMain.style.marginRight = '56%'
    }
    else if(document.body.clientWidth >= 2560 && document.body.clientWidth <= 3840){
        xmbMain.style.marginRight = '47%'
    }
    else {
        xmbMain.style.marginRight = '57%'
    }

    if(isVideo){
        videoSection.classList.remove("active")
    }
    console.log("in Music")
}

let focusVideo = () =>{
    sectionNumber = 4
    isHome = false
    isSettings = false
    isPhotos = false
    isMusic = false
    isVideo = true
    musicSection.classList.remove("active")
    videoSection.classList.add("active")
    
    if (document.body.clientWidth < 1400) {
        xmbMain.style.marginRight = '85%'
    }
    else if (document.body.clientWidth >= 2560 && document.body.clientWidth <= 3840){
        xmbMain.style.marginRight = '62%'
    }
    else {
        xmbMain.style.marginRight = '77%'
    }

    if(isGame){
        gameSection.classList.remove("active")
    }
    console.log("in video")
}

let focusGame = () =>{
    sectionNumber = 5
    isHome = false
    isSettings = false
    isPhotos = false
    isMusic = false
    isVideo = false
    isGame = true
    videoSection.classList.remove("active")
    gameSection.classList.add("active")
    
    if (document.body.clientWidth < 1400) {
        xmbMain.style.marginRight = '100%'
    }
    else if (document.body.clientWidth >= 2560 && document.body.clientWidth <= 3840) {
        xmbMain.style.marginRight = '77%'
    }
    else {
        xmbMain.style.marginRight = '97%'
    }
    
    console.log("in video")
}

let focusSubOne = () =>{
    isSubOne = true
    isSubTwo = false
    isSubThree = false
    submenuTwo[sectionNumber].classList.remove("active")
    submenuOne[sectionNumber].classList.remove("inactive")
    console.log(isSubOne)
}

let focusSubTwo = () =>{
    if(sectionNumber === 1){
        if (isSubThree) {
            submenuThree[multiSection].classList.remove("active")
            submenuOne[sectionNumber].classList.remove("gotop")
        }
    }
    isSubOne = false
    isSubTwo = true
    isSubThree = false
    submenuTwo[sectionNumber].classList.add("active")
    submenuOne[sectionNumber].classList.add("inactive")
    console.log(isSubOne)
}

let focusSubThree = () =>{
    if(sectionNumber === 1){
        isSubThree = true
        isSubOne = false
        isSubTwo = false
        submenuThree[multiSection].classList.add("active")
        submenuTwo[sectionNumber].classList.remove("active")
        submenuOne[sectionNumber].classList.add("gotop")
        console.log(isSubOne)
    }
}

document.body.addEventListener('keydown', (e) =>{
    if(e.key === 'ArrowDown'){
        navSound.play()
        e.preventDefault()
        isSubOne = false
        if(!isSubTwo){
            focusSubTwo()
        }

        else if(sectionNumber === 1){
            if (isSubTwo && !isSubOne) {
                focusSubThree()
            }
        } 
    }

    else if(e.key === 'ArrowUp'){
        navSound.play()
        e.preventDefault()
        if(isSubThree && !isSubOne){
            focusSubTwo()
        }

        else if(isSubTwo && !isSubOne){
            focusSubOne()
        }
    }

    else if(e.key === 'ArrowRight'){
        navSound.play()
        e.preventDefault()
        if(isHome && !isSettings){
            focusSettings()
        }
        else if(isSettings && !isHome){
            focusPhotos()
        }

        else if(isPhotos && !isSettings){
            focusMusic()
        }

        else if(isMusic && !isPhotos){
            focusVideo()
        }

        else if(isVideo && !isMusic){
            focusGame()
        }
    }

    else if(e.key === 'ArrowLeft'){
        navSound.play()
        e.preventDefault()
        if(isGame && !isVideo){
            focusVideo()
        }

        else if(isVideo && !isMusic){
            focusMusic()
        }

        else if(isMusic && !isPhotos){
            focusPhotos()
        }

        else if(isPhotos && !isSettings){
            focusSettings()
            settingsSection.style.marginLeft = null
        }

        else if(isSettings && !isHome){
            focusHome()
            homeSection.classList.remove("inactive")
            xmbMain.style.marginRight = null;
        }
    }
})

loadMenu()
