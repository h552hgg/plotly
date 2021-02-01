




d3.json("samples.json").then((importedData) => {
    data = importedData.samples
    dataid = importedData.metadata
    // console.log(dataid)
    datanames = importedData.names
    // console.log(datanames)



    ///Drop Down Filled with values from names 
    var id_list = d3.select("#selDataset");

    Object.entries(datanames).forEach(([key, value]) => {
        id_list.insert("option").text(value)
    });
    ///////////
    d3.selectAll("#selDataset").on("change", optionChanged);
    function optionChanged() {
        var dropdownMenu = d3.select("#selDataset");

        var inputValue = dropdownMenu.property("value");

        console.log(inputValue);

    }














    ////////Demographic Info//////////

    var sample = dataid.filter(x => x.id === 940)[0];
    // console.log(sample)

    panel = d3.select(".panel-body")
    panel.html("")
    Object.entries(sample).forEach(([key, value]) => {
        panel.append("p").text(`${key}: ${value}`)
    });

    var sortedValues = data.sort((a, b) => b.sample_values - a.sample_values);
    // console.log(sortedValues)

    var sample940 = sortedValues.filter(obj => obj.id === `940`)[0];

    var trace1 = {
        x: sample940.sample_values.slice(0, 10).reverse(),
        y: sample940.otu_ids.map(id => `OTU ${id}`).slice(0, 10).reverse(),
        text: sample940.otu_labels.slice(0, 10).reverse(),
        name: "OTU",
        type: "bar",
        orientation: "h"
    };

    ////////Bar Chart///////////
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

    ////////Bubble Chart//////////
    var trace2 = {
        x: sample940.otu_ids.map(id => ` ${id}`),
        y: sample940.sample_values.slice(0, 10),
        text: sample940.otu_labels,
        mode: 'markers',
        marker: {
            color: sample940.otu_ids,
            size: sample940.sample_values,
            opacity: [0.6, 0.7, 0.8, 0.9]
        },




    };

    var dataChart = [trace2]


    Plotly.newPlot("bubble", dataChart);

});