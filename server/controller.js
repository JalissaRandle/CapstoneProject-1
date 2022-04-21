const req = require('express/lib/request');
const schedule = require('./db.json')
let scheduleID = 4


module.exports = {

    getSchedule: (req, res) => {
        res.status(200).send(schedule)
    },

    createSchedule: (req, res) => {
        let{ showName, showTime, amPm, daysOfWeek, streaming } = req.body
        let newschedule = {
            id: scheduleID,
            showName,
            showTime,
            amPm,
            daysOfWeek,
            streaming
        }
        schedule.push(newschedule);
        res.status(200).send(schedule);
        scheduleID++
    },

    deleteSchedule: (req, res) => {
        let index = schedule.findIndex(schedule => schedule.id === +req.params.id);
        schedule.splice(index, 1);
        res.status(200).send(schedule)

    },

    updateSchedule: (req, res) => {
        let { id } = req.params
        let { type } = req.body
    
        let index = schedule.findIndex(schedule => schedule.id === +id)
    
         if (type === 'plus') {
            schedule[index].showTime+= 1
            res.status(200).send(schedule)
        }else if (type === "minus") {
            schedule[index].showTime-= 1 
            res.status(200).send(schedule)
        }else {
            res.status(400)
        }

    }














}