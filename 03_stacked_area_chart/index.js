// https://www.d3-graph-gallery.com/graph/stackedarea_basic.html
// set the dimensions and margins of the graph
var margin = {
        top: 10,
        right: 30,
        bottom: 30,
        left: 60
    },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
const url = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv";
// year, sex, name, n, prop
// 1880, F, Helen, 636, 0.00651612638826278
d3.csv(url, function (data) {
    // console.log(data);
    // n: "636"
    // name: "Helen"
    // prop: "0.00651612638826278"
    // sex: "F"
    // year: "1880"

    // group the data: one array for each value of the X axis.
    var sumstat = d3.nest()
        .key(d => d.year)
        .entries(data);
    console.log(sumstat);
    // n: "636"
    // name: "Helen"
    // prop: "0.00651612638826278"
    // sex: "F"
    // year: "1880"

    // Stack the data: each group will be represented on top of each other
    // var mygroups = ["Helen", "Amanda", "Ashley"] // list of group names
    // var mygroup = [1, 2, 3] // list of group names
    // var mygroups = [...new Set(data.map(x => x.name))] // unique(data$name)
    var mygroups = ["Helen", "Amanda", "Betty", "Dorothy", "Linda", "Jessica"]
    // [ "Helen", "Amanda", "Betty", "Dorothy", "Linda", "Deborah", "Jessica", "Patricia", "Ashley" ]
    // const N = mygroups.length;
    // var mygroup = Array.from(Array(N), (e, i) => i + 1)
    var mygroup = [0, 1, 2, 3, 4, 5]
    // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

    var stackedData = d3.stack()
        .keys(mygroup)
        .value(function (d, key) {
            // debugger;
            return d.values[key].n
        })
        (sumstat)
    console.log(stackedData);
    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return +d.n;
        }) * 1.2])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette
    // var color = d3.scaleOrdinal()
    //     .domain(mygroups)
    //     .range(['#dbd9cf', '#f5ecec', '#f1aaaa', '#dd6f6f', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Show the areas
    svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .style("fill", function (d) {
            name = mygroups[d.key - 1];
            return color(name);
        })
        .attr("d", d3.area()
            .x(function (d, i) {
                return x(d.data.key);
            })
            .y0(function (d) {
                return y(d[0]);
            })
            .y1(function (d) {
                return y(d[1]);
            })
        )

})