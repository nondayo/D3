// 參考範例
// https://observablehq.com/@d3/area-chart

d3.csv("https://gist.githubusercontent.com/mbostock/14613fb82f32f40119009c94f5a46d72/raw/d0d70ffb7b749714e4ba1dece761f6502b2bdea2/aapl.csv?fbclid=IwAR1xHai0Z0fYfY2iqKiVZDLog138Np8Z68mh_yR-sRotTPRprFbYC92hBLc", d3.autoType)
    .then(function (data) {
        // console.debug(JSON.stringify(data));
        data = Object.assign(data.map(({date, close}) => ({date, value: close})), {y: "$ Close"});
        console.log(data);

        let height = 500,
            width = 800;
        let margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 30
        };
        let x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, margin.right])
        let y = d3.scaleLinear()
            // .domain([0, d3.max(data, d => d.value)]).nice()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top])
        let xAxis = g => g
            .attr('transform', "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        let yAxis = g => g
            .attr('transform', "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y))
        let area = d3.area()
            .x(d => x(d.date))
            .y0(y(0))
            .y1(d => y(d.value))

        let svg = d3.select('svg')
            .append('path')
            .datum(data)
            .attr('fill', 'blue')
            .attr('d', area);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

    });
