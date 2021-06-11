let weekInfoObj = {}

let lastWeek;

const addWeek = (year, quarter) => {
    let weekCount = 1
    let maxMonth = (quarter*3) - 1
    let initialYear = lastWeek.getFullYear()
    // if last week does not reach next quarter, continue to add weeks
    while (lastWeek.getMonth() <= maxMonth && lastWeek.getFullYear() === initialYear) {
        let endDate = addDays(lastWeek)
        weekInfoObj.years[year].quarters[quarter-1].weeks.push({
            weekNum: weekCount,
            startDate: lastWeek,
            endDate: endDate,
            color: 1,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in enim a tortor ornare consectetur sed eget arcu. Morbi egestas enim ac orci porta euismod. Aenean a massa elementum, varius libero vel, ornare purus. Suspendisse imperdiet magna sed urna pretium lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin id diam et odio fermentum ornare. Duis a fringilla tellus. Praesent posuere at dolor ut commodo. Donec dignissim suscipit mauris in pulvinar. Donec consequat felis enim, sed ultrices quam commodo vel. Mauris in nunc viverra, varius odio at, eleifend ante. Aenean rhoncus erat eget turpis aliquet viverra. Etiam ultricies dolor vitae orci elementum, id porta ante volutpat.',

        })
        weekCount ++
        lastWeek = endDate
        // console.log(weekCount)
    }

    // console.log(lastWeek)
}


const addDays = (date) => {
    let result = new Date(date);
    result.setDate(result.getDate() + 7);
    return result;
}

export const createWeek = (numYears, startDate) => {
    startDate.setDate(startDate.getDate() - startDate.getDay())
    weekInfoObj = {
        startDate,
        years: []
    }
    let startYear = startDate.getFullYear()
    lastWeek = new Date(startDate)
    for (let i = 0; i < numYears; i++) {
        weekInfoObj.years.push({
            numYear: i,
            yearText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in enim a tortor ornare consectetur sed eget arcu. Morbi egestas enim ac orci porta euismod. Aenean a massa elementum, varius libero vel, ornare purus. Suspendisse imperdiet magna sed urna pretium lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin id diam et odio fermentum ornare. Duis a fringilla tellus. Praesent posuere at dolor ut commodo. Donec dignissim suscipit mauris in pulvinar. Donec consequat felis enim, sed ultrices quam commodo vel. Mauris in nunc viverra, varius odio at, eleifend ante. Aenean rhoncus erat eget turpis aliquet viverra. Etiam ultricies dolor vitae orci elementum',
            currentYear: startYear + i,
            quarters: []
        })
        for (let q = 1; q < 5; q++) {
            // console.log(weekInfoObj.years)
            weekInfoObj.years[i].quarters.push({
                numQuarter: q,
                quarterText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in enim a tortor ornare consectetur sed eget arcu. Morbi egestas enim ac orci porta euismod. Aenean a massa elementum, varius libero vel, ornare purus. Suspendisse imperdiet magna sed urna pretium lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin id diam et odio fermentum ornare. Duis a fringilla tellus. Praesent posuere at dolor ut commodo. Donec dignissim suscipit mauris in pulvinar. Donec consequat felis enim, sed ultrices quam commodo vel. Mauris in nunc viverra, varius odio at, eleifend ante. Aenean rhoncus erat eget turpis aliquet viverra. Etiam ultricies dolor vitae orci elementum',
                quarterColor: 2,
                weeks: []
            })
            addWeek(i, q)
        }
    }
    console.log(weekInfoObj)
    return weekInfoObj
}
