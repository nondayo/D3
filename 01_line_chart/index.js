//API to fetch historical data of Bitcoin Price Index
const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';

/**
 * Loading data from API when DOM Content has been loaded'.
 */
document.addEventListener("DOMContentLoaded", function (event) {
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var parsedData = parseData(data);
            console.log(parsedData);
            drawChart(parsedData);
        })
        .catch(function (err) {
            console.log(err);
        })
});

/**
 * Parse data into key-value pairs
 * @param {object} data Object containing historical data of BPI
 */
function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push({
            date: new Date(i), //date
            value: +data.bpi[i] //convert string to number
        });
    }
    return arr;
}

/**
 * Creates a chart using D3
 * @param {object} data Object containing historical data of BPI
 */
function drawChart(data) {
    var svgWidth = 600,
        svgHeight = 400;
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };
    var height = svgHeight - margin.top - margin.bottom,
        width = svgWidth - margin.right - margin.left;
    var svg = d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
    var g = svg.append('g')
        .attr('transform', "translate(" + margin.left + "," + margin.top + ")")
    var x = d3.scaleTime() // d3.scaleTime([[domain, ]range])
        .domain(d3.extent(data, d => d.date)) //d3.extent(iterable[, accessor]) 
        // 時間欄的最小值、最大值
        .rangeRound([0, width]);
    var y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.value))
        .rangeRound([height, 0]);
    var line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
    g.append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)) //d3.axisBottom(scale)
        .select('.domain')
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round") //邊框接合尖角的屬性
        .attr("stroke-linecap", "round") //邊框端點的屬性
        .attr("stroke-width", 2)
        .attr("d", line);
}