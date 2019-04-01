// D3 get data in array format
const data = [{
        width: 200,
        height: 100,
        fill: 'purple'
    },
    {
        width: 100,
        height: 60,
        fill: 'pink'
    },
    {
        width: 50,
        height: 30,
        fill: 'red'
    }
];

const svg = d3.select('svg');

// enter selection: 在HTML中新增data對應到的DOM物件
//Join data to rects
const rects = svg.selectAll('rect')
    .data(data);

// add attrs to rects already in the DOM
rects.attr('width', (d, i, n) => d.width)
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);

// append the enter selection to DOM    
rects.enter()
    .append('rect')
    .attr('width', (d, i, n) => d.width)
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);

console.log(rects);

// const rect = svg.select('rect')
//     .data(data)
//     .attr('width', function (d, i, n) {
//         //d: data parameter
//         console.log(i) //i: index
//         console.log(n) //n: what you selected
//         return d.width
//     })
//     .attr('height', function (d) {
//         console.log(this)
//         return d.height
//     })
//     .attr('fill', function (d) {
//         return d.fill
//     });
// const rect = svg.selectAll('rect')
//     .data(data)
//     .attr('width', (d, i, n) => d.width)
//     .attr('height', d => d.height)
//     .attr('fill', d => d.fill);