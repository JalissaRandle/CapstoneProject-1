const form = document.querySelector('form')
const scheduleContainer = document.querySelector('#schedule-container')


const scheduleCallback = ({ data: schedule}) => { 
    displaySchedule(schedule)
};

const BaseURL = `http://localhost:4005/api/schedule`

const getSchedule= () => axios.get(BaseURL).then(scheduleCallback).catch(err => console.log(err));
const createSchedule = body => axios.post(BaseURL, body).then(scheduleCallback ).catch(err => console.log(err));
const deleteSchedule = id => axios.delete(`${BaseURL}/${id}`).then(scheduleCallback ).catch(err => console.log(err));
const updateSchedule = (id, type) => axios.put(`${BaseURL}/${id}`, {type}).then(scheduleCallback).catch(err => console.log(err));

function submitHandler(e) {
    e.preventDefault()

    let showName = document.getElementById('showName');
    let showTime = document.getElementById('showTime');
    let amPm = document.getElementById('amPm');
    let daysOfWeek = document.getElementById('daysOfWeek');
    let streaming = document.getElementById('streaming');
    
    let bodyObj = {
        showName: showName.value,
        showTime: showTime.value,
        amPm: amPm.value,
        daysOfWeek: daysOfWeek.value,
        streaming: streaming.value,
    }

    createSchedule(bodyObj)

    showName = ''
    showTime = ''
    amPm = ''
    daysOfWeek = ''
    streaming = ''
   
};

function createScheduleCard(schedule) {
    console.log(schedule)
    const scheduleDisplay = document.createElement('div');
    scheduleDisplay.classList.add('schedule-display');
    scheduleDisplay.innerHTML = ` 
    <p class="schedule-name">${schedule.showName}</p>
    <p class="schedule-name">${schedule.showTime}</p>
    <p class="schedule-name">${schedule.amPm}</p>
    <p class="schedule-name">${schedule.daysOfWeek}</p>
    <p class="schedule-name">${schedule.streaming}</p>
    <button onclick="updateSchedule(${schedule.id}, 'plus')">+1 hour</button>
    <button onclick="deleteSchedule(${schedule.id})">delete</button>
    `
    scheduleContainer.appendChild(scheduleDisplay);
};

function displaySchedule(arr) {
    console.log(arr)
    scheduleContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createScheduleCard(arr[i])
    }
};

submit.addEventListener('click', submitHandler);

getSchedule();

