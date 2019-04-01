data = d3.csv("data.csv")
    .then(function (data) {
        console.debug(JSON.stringify(data));
        let height = 500,
            width = 800;
        let margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 30
        };
        x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, margin.right])
        y = d3.scaleLinear()
            // .domain([0, d3.max(data, d => d.value)]).nice()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top])
        xAxis = g => g
            .attr('transform', "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        yAxis = g => g
            .attr('transform', "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y))
        area = d3.area()
            .x(d => x(d.date))
            .y0(y(0))
            .y1(d => y(d.value))

        svg = d3.select('svg')
            .append('path')
            .datum(data)
            .attr('fill', 'blue')
            .attr('d', area);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

    });