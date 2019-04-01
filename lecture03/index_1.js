// select svg container first;
const svg = d3.select('svg');

d3.json('data.json').then(data => {

    const circs = svg.selectAll('circle')
        .data(data);

    //add attrs to circs already in DOM
    circs.attr('cy', 200)
        .attr('cx', d => 100 * d.Length)
        .attr('stroke', "black")
        .attr('r', d => 80 * d.Width)
        .attr('fill', d => d.Species)

    //append the enter selection to the DOM
    circs.enter()
        .append('circle')
        .attr('cy', 200)
        .attr('cx', d => 100 * d.Length)
        .attr('stroke', "black")
        .attr('r', d => 80 * d.Width)
        .attr('fill', d => d.Species)
})