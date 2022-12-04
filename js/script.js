const video = document.getElementById("vid")
const titles = document.getElementById("title")
const warning = document.querySelectorAll(".warning")[0]
const menu = document.getElementById("menu")
const xmbMain = document.querySelectorAll(".xmb-main")[0]
const homeSection = document.querySelectorAll(".xmb-title.homeMenu")[0]
const projectsSection = document.querySelectorAll(".xmb-title.settings")[0]
const submenuOne = document.querySelectorAll(".submenu.one")
const submenuTwo = document.querySelectorAll(".submenu.two")
const projectImage = document.querySelectorAll(".infowrapper")
// const projectInfo = document.querySelectorAll(".projectinfo")
const closeButton = document.getElementById("close") 
const contactSection = document.querySelectorAll(".xmb-title.messages")[0]
const section = document.querySelectorAll(".xmb-title")
const startupSound = document.getElementById("startup")
const navSound = document.getElementById("nav")

let isHome = true
let isProjects = false
let isContact = false
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
    console.log(homeSection)
}

let focusHome =  () =>{
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
}

let focusProjects = () => { 
    isHome = false
    isProjects = true
    projectsSection.classList.add("active")
    homeSection.classList.add("inactive")
    contactSection.style.marginLeft = '75px'
    if(isContact){
        contactSection.classList.remove("active")
    }
    console.log("in projects")
}

let focusContacts = () => {
    isHome = false
    isProjects = false
    isContact = true
    projectsSection.classList.remove("active")
    contactSection.classList.add("active")
    console.log("in Contacts")
}

document.body.addEventListener('keydown', (e) =>{
    if(e.key === 'ArrowDown'){
        navSound.play()
        e.preventDefault()
        submenuOne.forEach(sub => {
            sub.classList.toggle("inactive")
        });

        submenuTwo.forEach(sub =>{
            sub.classList.toggle("active")
        })
        e.stopPropagation()
    }

    else if(e.key === 'ArrowUp'){
        navSound.play()
        e.preventDefault()
        submenuOne.forEach(sub => {
            sub.classList.remove("inactive")
        });
        submenuTwo.forEach(sub => {
            sub.classList.remove("active")
        })
        e.stopPropagation()
    }

    else if(e.key === 'ArrowRight'){
        navSound.play()
        e.preventDefault()
        if(isHome && !isProjects){
            focusProjects()
            xmbMain.style.marginRight = '58%'
        }
        else if(isProjects && !isHome){
            focusContacts()
            xmbMain.style.marginRight = '78%'
            projectsSection.style.marginLeft = '70px'
            contactSection.style.marginLeft = '50px'
        }
    }

    else if(e.key === 'ArrowLeft'){
        navSound.play()
        e.preventDefault()
        if(isContact && !isProjects){
            focusProjects()
            xmbMain.style.marginRight = '58%'
            projectsSection.style.marginLeft = null
        }

        else if(isProjects){
            focusHome()
            homeSection.classList.remove("inactive")
            xmbMain.style.marginRight = '40%'
        }
    }
})


// projectImage[1].addEventListener('click', () =>{
//     projectInfo[0].classList.toggle("active")
//     section.forEach(ele => {
//         ele.style.zIndex = 'auto'
//     });
//     // document.querySelectorAll(".xmb-title")[0].style.zIndex = 'auto'
//     console.log("clicked")
// })

// closeButton.addEventListener('click', () =>{
//     projectInfo.forEach(project => {
//         project.classList.remove("active")
//     });

//     section.forEach(ele =>{
//         ele.style.zIndex = '2'
//     })
// })

loadMenu()
