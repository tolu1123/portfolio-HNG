let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0 ,0.25, 0.5, 0.75, 1],
};

// setting the intersection observer api to automatically detect section elements as they enter
// the viewport

  
let sectionsObserver = new IntersectionObserver(sectionCallBack, options);
function sectionCallBack(entries) {
    entries.forEach(entry => {
        const scrollDistance = scrollY;
        const topDistance = entry.target.offsetTop - 60;
        const elementHeight = entry.target.offsetHeight;


        if(entry.isIntersecting && scrollDistance >= topDistance && scrollDistance < topDistance + elementHeight) {
            // remove the style that indicates that the links are active    
            removeActiveClass();

            // get the id of the of the entry
            let id = entry.target.getAttribute('id');
            console.log(id)

            //find the related links in the DOM
            let links = document.querySelectorAll(`a[href = '#${id}']`);
            links.forEach(link => {
                link.classList.add('underline');
            })
        }
    })
}
// function to remove the active class
// get the link elements
let navLinks = document.querySelectorAll('nav a');

function removeActiveClass() {
    navLinks.forEach(link => {
        link.classList.remove('underline');
    })
}

let sections = document.querySelectorAll('.section');
console.log(sections, 'sections')
sections.forEach((ele) => {
    sectionsObserver.observe(ele);
})

// Setting the modal
let navSm = document.querySelector('.nav-sm');
let hamburger = document.querySelector('.hamburger');
let dropDown = document.querySelector('.dropDown');
let state = false;

// Adding the event listener
hamburger.addEventListener('click', () => {
    if(state) {
        // if state is true (meaning that the drop down is opened) we will close it
        hamburger.innerHTML = '<i class="fa-sharp fa-solid fa-bars"></i>';
        dropDown.classList.add('hide');
        // We remove the dropDown-visible class
        dropDown.classList.remove('dropDown-visible');
        // change the state of the drop down
        state = !state;
    } else {
        // If state is false(meaning that the drop down is closed)
        hamburger.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>';
        dropDown.classList.remove('hide');
        // We add the dropDown-visible class
        dropDown.classList.add('dropDown-visible')
        // change the state of the dropDown
        state = !state;
    }
})


// Type-writer animation
// The element where the text will be typed
const role = document.querySelector(".role");



const carouselText = [
    {text: "Frontend Dev", color: "red"},
    {text: "Code Planner", color: "orange"},
    {text: "Programmer", color: "#FF8C92"},
]

async function typeSentence(sentence, eleRef, delay = 300) {
    eleRef.textContent = '';
    const letters = sentence.split("");
    let typed = '';
    let i = 0;
    while(i < letters.length) {
      await waitForMs(delay);
        typed += letters[i];
        eleRef.textContent = typed;
        
      i++;
    }
    return;
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function deleteSentence(eleRef) {
    const sentence = eleRef.innerHTML;
    const letters = sentence.split("");
    let i = 0;
    while(letters.length > 0) {
      await waitForMs(300);
      letters.pop();
      eleRef.innerHTML = letters.join("");
    }
}

async function carousel(carouselList, eleRef) {
    var i = 0;
    while(true) {
    // updateFontColor(carouselList[i].color)
    await typeSentence(carouselList[i].text, eleRef);
    await waitForMs(1500);
    await deleteSentence(eleRef);
    await waitForMs(1500);
    i++
    if(i >= carouselList.length) {i = 0;}
    }
}

carousel(carouselText, role)

// Code for the time and date
const dayElement = document.querySelector('.time h3');
const currentDay = document.querySelector('.time .currentDay');
const currentTimeUTC = document.querySelector('.time .currentTimeUTC')

let date = new Date();

// Function to pad time
function padTime(time) {
    return time.toString().padStart(2, '0');
}

// Today's weekday no
let today = date.getDay();
// Setting the text content of the dayElement
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// dayElement.textContent = `Today is ${weekday[today]}`;

// Get the rest of the seconds left till the next day
const secondsInADay = 24 * 60 * 60;

let presentSecond = padTime(date.getUTCSeconds());
let presentHour = date.getUTCHours();
let presentMinute = padTime(date.getUTCMinutes());

let secondsPassedToday = (presentHour * 60 * 60) + (presentMinute * 60) + presentSecond;

// dayElement.textContent = `Today is ${weekday[today]}, ${presentHour > 12? padTime(presentHour - 12): padTime(presentHour)}:${padTime(presentMinute)}:${padTime(presentSecond)}`;
currentDay.textContent = `${weekday[today]}`;
currentTimeUTC.textContent = `${presentHour > 12? padTime(presentHour - 12): padTime(presentHour)}:${padTime(presentMinute)}:${padTime(presentSecond)}`;

// Function to update the time every second
const presentMilliseconds = date.getMilliseconds();

const milliStart = 1000 - presentMilliseconds;

setTimeout(() => {

    setInterval(() => {
        date = new Date();
        presentSecond = date.getUTCSeconds();
        presentMinute = date.getUTCMinutes();
        presentHour = date.getUTCHours();
        secondsPassedToday = (presentHour * 60 * 60) + (presentMinute * 60) + presentSecond;

        currentDay.textContent = `${weekday[today]}`;
        currentTimeUTC.textContent = `${presentHour > 12? padTime(presentHour - 12): padTime(presentHour)}:${padTime(presentMinute)}:${padTime(presentSecond)}`;
    }, 1000)
}, milliStart);

// function to update the day
function updateDay() {
    const secondsLeftToday = secondsInADay - secondsPassedToday;
    date = new Date();
    today = date.getDay();
    setTimeout(() => {

        currentDay.textContent = `${weekday[today]}`;
        currentTimeUTC.textContent = `${presentHour > 12? padTime(presentHour - 12): padTime(presentHour)}:${padTime(presentMinute)}:${padTime(presentSecond)}`;

        setInterval(() => {
            currentDay.textContent = `${weekday[today]}`;
            currentTimeUTC.textContent = `${presentHour > 12? padTime(presentHour - 12): padTime(presentHour)}:${padTime(presentMinute)}:${padTime(presentSecond)}`;
        }, secondsInADay * 1000)
    }, secondsLeftToday * 1000);
}

