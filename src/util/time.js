let getTime = (date) => {
    if (date instanceof Date)
        var millis = date.getTime()
    else if(typeof date == "number")
        var millis = date
    else
        throw "WHAT DID YOU PASS TO ME IDIOT BRUH"
    
    return millis
}

export let calcInterval = (interval) => {
    let years = Math.floor(interval / (1000 * 60 * 60 * 24 * 365))
    interval = interval % (1000 * 60 * 60 * 24 * 365)

    let days = Math.floor(interval / (1000 * 60 * 60 * 24))
    interval = interval % (1000 * 60 * 60 * 24)

    let hours = Math.floor(interval / (1000 * 60 * 60))
    interval = interval % (1000 * 60 * 60)

    let minutes = Math.floor(interval / (1000 * 60))
    interval = interval % (1000 * 60)

    return { years, days, hours, minutes }
}

export let formatTimeDiff = (date1, date2) => {
    return formatInterval(Math.abs(getTime(date1) - getTime(date2)))
}

export let formatInterval = (number) => {
    let { years, days, hours, minutes} = calcInterval(number)
    let data = []
    if(years) data.push(`${years} yrs`)
    if(days) data.push(`${days} days`)
    if(hours) data.push(`${hours} hrs`)
    if(minutes) data.push(`${minutes} min`)
    return data.join(', ') || "<1 minute"
}