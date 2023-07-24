
function getDateParts(dateString) {

    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    
    return { year, month, day };

}


function getTodayAtMidnight() {

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return today;

}

module.exports = {
    getDateParts,
    getTodayAtMidnight,
};