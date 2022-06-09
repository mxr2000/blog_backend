import moment from "moment";


const getCurrentTimeStr = () => {
    return moment().format('MMMM Do YYYY, h:mm:ss a')
}

export {getCurrentTimeStr}