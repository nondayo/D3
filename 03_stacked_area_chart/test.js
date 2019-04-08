const url = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv";
d3.csv(url, function (data) {
    var sumstat = d3.nest()
        .key(d => d.year)
        .entries(data);
    var mygroups = ["Helen", "Amanda", "Betty"]
    var mygroup = [0, 1, 2]

    var stackedData = d3.stack()
        .keys(mygroup)
        .value(function (d, key) {
            // debugger;
            return d.values[key].n
        })
        (sumstat)

    console.log(stackedData);
});