const video = document.getElementById("vid")
const titles = document.getElementById("title")
const warning = document.querySelectorAll(".warning")[0]
const menu = document.getElementById("menu")
const clockSection = document.querySelectorAll(".clock")[0]
const dateTime = document.getElementById("date")
const xmbMain = document.querySelectorAll(".xmb-main")[0]
const section = document.querySelectorAll(".xmb-title")
const submenuOne = document.querySelectorAll(".submenu.one")
const submenuTwo = document.querySelectorAll(".submenu.two")
const submenuthree = document.querySelectorAll(".submenu.three")
const submenu = [submenuOne, submenuTwo, submenuthree]
const startupSound = document.getElementById("startup")
const navSound = document.getElementById("nav")

let sectionNumber = 0
let subsection = 0
let multiSection
startupSound.play()

let checkLoad = () =>{
    return new Promise((resolve) => {
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
}

let loadMenu = async () =>{
    await loadTitles()
    menu.style.opacity = '1'
    sideClock()
    clockSection.style.opacity = '1'
}

let moveMenu = (hd, ultraHd, fullHd) =>{
    let width = document.body.clientWidth
    if (width < 1400) {
        xmbMain.style.marginRight = hd
    }
    else if (width >= 2560 && width <= 3840) {
        xmbMain.style.marginRight = ultraHd
    }
    else {
        xmbMain.style.marginRight = fullHd
    }
}

let focusSection = (sn, right, left) =>{
    section[sn].classList.add("active")
    if(right === true){
        section[sn-1].classList.remove("active")
    }
    else if(left === true){
        section[sn+1].classList.remove("active")
    }
    switchSection()
}

let switchSection = () =>{
    multiSection = false
    switch (sectionNumber) {
        case 0:
            moveMenu('-40%', 0, 0)
            break
        case 1:
            moveMenu('-10%', '18%', '18%')
            multiSection = true
            break
        case 2:
            moveMenu('22%', '32%', '39%')
            break
        case 3:
            moveMenu('50%', '47%', '60%')
            break
        case 4:
            moveMenu('76%', '62%', '77%')
            break
        case 5:
            moveMenu('100%', '77%', '97%')
            break
    }
}

let focusSubMenu = (sn, sub, down, up) =>{
    switch(sub){
        case 0:
            if(up){
                submenu[sub+1][sn].classList.remove("active")
                submenu[sub][sn].classList.remove("inactive")
            }
            break
        case 1:
            if(down){
                submenu[sub-1][sn].classList.add("inactive")
                submenu[sub][sn].classList.add("active")
            }
            else if(up){
                if(multiSection){
                    submenu[sub+1][sn-1].classList.remove("active")
                    submenu[sub-1][sn].classList.remove("gotop")
                    submenu[sub][sn].classList.add("active")
                }
            }
        case 2:
            if(down){
                if (multiSection) {
                    submenu[sub-2][sn].classList.add("gotop")
                    submenu[sub-1][sn].classList.remove("active")
                    submenu[sub][sn - 1].classList.add("active")
                }
            }
            break
        default:
            break
    }
}

document.body.addEventListener('keydown', (e) =>{
    if(e.key === 'ArrowDown'){
        navSound.play()
        e.preventDefault()
        subsection++
        if(subsection < 0){
            subsection = 0
        }
        else if (subsection > 2){
            subsection = 2
        }
        focusSubMenu(sectionNumber, subsection, true, false)
    }

    else if(e.key === 'ArrowUp'){
        navSound.play()
        e.preventDefault()
        subsection--
        if (subsection < 0) {
            subsection = 0
        }
        else if (subsection > 2) {
            subsection = 2
        }
        focusSubMenu(sectionNumber, subsection, false, true)
    }

    else if(e.key === 'ArrowRight'){
        navSound.play()
        e.preventDefault()
        sectionNumber++
        if(sectionNumber<0){
            sectionNumber = 0
        }
        else if(sectionNumber >5){
            sectionNumber = 5
        }
        focusSection(sectionNumber, true, false)
    }

    else if(e.key === 'ArrowLeft'){
        navSound.play()
        e.preventDefault()
        sectionNumber--
        if (sectionNumber < 0) {
            sectionNumber = 0
        }
        else if (sectionNumber > 5) {
            sectionNumber = 5
        }
        focusSection(sectionNumber, false, true)
    }
})

loadMenu()
