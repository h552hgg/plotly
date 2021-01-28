


d3.json("samples.json").then((importedData) => {
    // console.log(importedData)
    data = importedData.samples
    // console.log(data)


    var sortedValues = data.sort((a, b) => b.sample_values - a.sample_values);
    console.log(sortedValues)

    var sample940 = sortedValues.filter(obj => obj.id === `940`)[0];




    var trace1 = {
        x: sample940.sample_values.slice(0, 10).reverse(),
        y: sample940.otu_ids.map(id => `OTU ${id}`).slice(0, 10).reverse(),
        text: sample940.otu_labels.slice(0, 10).reverse(),
        name: "OTU",
        type: "bar",
        orientation: "h"
    };


    var chartData = [trace1];


    var layout = {
        title: "Top OTU",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };


    Plotly.newPlot("bar", chartData, layout);
});