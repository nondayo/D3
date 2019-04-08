// https://www.d3-graph-gallery.com/graph/streamgraph_basic.html

// set the dimensions and margins of the graph
var margin = {
        top: 20,
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

// Parse the Data
const url = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
d3.csv(url, function (data) {
    // data
    // year, Amanda, Ashley, Betty, Deborah, Dorothy, Helen, Linda, Patricia
    // 1880, 241, 0, 117, 12, 112, 636, 27, 0

    // List of groups = header of the csv files
    var keys = data.columns.slice(1)
    // [ "Amanda", "Ashley", "Betty", "Deborah", "Dorothy", "Helen", "Linda", "Patricia" ]

    // Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([-100000, 100000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette
    // var color = d3.scaleOrdinal()
    //     .domain(keys)
    //     .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf'])
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    //stack the data?
    var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        //Shifts the baseline down such that the center of the streamgraph is always at zero.
        .keys(keys) // keys: [ "Amanda", "Ashley", "Betty", "Deborah", "Dorothy", "Helen", "Linda", "Patricia" ]
    (data)

    // Show the areas
    svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .style("fill", function (d) {
            // debugger;
            return (color(d.key))

        })
        // .style("fill", d => color(d.key))
        .attr("d", d3.area()
            .x(function (d, i) {
                debugger;
                return x(d.data.year);
            })
            .y0(function (d) {
                return y(d[0]);
            })
            .y1(function (d) {
                return y(d[1]);
            })
        )

})