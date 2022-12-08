const video = document.getElementById("vid")
const titles = document.getElementById("title")
const warning = document.querySelectorAll(".warning")[0]
const menu = document.getElementById("menu")
const clockSection = document.querySelectorAll(".clock")[0]
const dateTime = document.getElementById("date")
const xmbMain = document.querySelectorAll(".xmb-main")[0]
const homeSection = document.querySelectorAll(".xmb-title.homeMenu")[0]
const projectsSection = document.querySelectorAll(".xmb-title.settings")[0]
const contactSection = document.querySelectorAll(".xmb-title.messages")[0]
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
let isProjects = false
let isContact = false
let isMusic = false
let isVideo = false
let isGame = false
let isSubOne = true
let isSubTwo = false
let isSubThree = false
let sectionNumber = 0
let multiSection = 0
contactSection.style.marginLeft = '90px'
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
    let clock = `${new Date().getDate()}/${new Date().getMonth()+1} ${new Date().getHours()}:${new Date().getMinutes()}`
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
    isProjects = false
    projectsSection.classList.remove("active")
    homeSection.classList.remove("inactive")
    contactSection.style.marginLeft = '65px'
    if(isProjects){
        projectsSection.classList.remove("active")
        homeSection.classList.remove("inactive")
    }
    else if(isContact){
        homeSection.classList.add("inactive")
    }
    console.log("in home")
    console.log("section number is now 0")
}

let focusProjects = () => { 
    sectionNumber = 1
    multiSection = 0
    isHome = false
    isProjects = true
    projectsSection.classList.add("active")
    homeSection.classList.add("inactive")
    contactSection.style.marginLeft = '75px'
    if(isContact){
        contactSection.classList.remove("active")
    }
    console.log("in projects")
    console.log("section number is now 1")
}

let focusContacts = () => {
    sectionNumber = 2
    isHome = false
    isProjects = false
    isContact = true
    projectsSection.classList.remove("active")
    contactSection.classList.add("active")
    if(isMusic){
        musicSection.classList.remove("active")
    }
    console.log("in Contacts")
    console.log("section number is now 2")
}

let focusMusic = () =>{
    sectionNumber = 3
    isHome = false
    isProjects = false
    isContact = false
    isMusic = true
    contactSection.classList.remove("active")
    musicSection.classList.add("active")
    if(isVideo){
        videoSection.classList.remove("active")
    }
    console.log("in Music")
}

let focusVideo = () =>{
    sectionNumber = 4
    isHome = false
    isProjects = false
    isContact = false
    isMusic = false
    isVideo = true
    musicSection.classList.remove("active")
    videoSection.classList.add("active")
    if(isGame){
        gameSection.classList.remove("active")
    }
    console.log("in video")
}

let focusGame = () =>{
    sectionNumber = 5
    isHome = false
    isProjects = false
    isContact = false
    isMusic = false
    isVideo = false
    isGame = true
    videoSection.classList.remove("active")
    gameSection.classList.add("active")
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
        if(isHome && !isProjects){
            focusProjects()
            xmbMain.style.marginRight = '18%'
        }
        else if(isProjects && !isHome){
            focusContacts()
            xmbMain.style.marginRight = '35%'
        }

        else if(isContact && !isProjects){
            focusMusic()
            xmbMain.style.marginRight = '57%'
        }

        else if(isMusic && !isContact){
            focusVideo()
            xmbMain.style.marginRight = '77%'
        }

        else if(isVideo && !isMusic){
            focusGame()
            xmbMain.style.marginRight = '97%'
        }
    }

    else if(e.key === 'ArrowLeft'){
        navSound.play()
        e.preventDefault()
        if(isGame && !isVideo){
            focusVideo()
            xmbMain.style.marginRight = '77%'
        }

        else if(isVideo && !isMusic){
            focusMusic()
            xmbMain.style.marginRight = '57%'
        }

        else if(isMusic && !isContact){
            focusContacts()
            xmbMain.style.marginRight = '35%'
        }

        else if(isContact && !isProjects){
            focusProjects()
            xmbMain.style.marginRight = '18%'
            projectsSection.style.marginLeft = null
        }

        else if(isProjects && !isHome){
            focusHome()
            homeSection.classList.remove("inactive")
            xmbMain.style.marginRight = null
        }
    }
})

loadMenu()
