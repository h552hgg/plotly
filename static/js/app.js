




d3.json("samples.json").then((importedData) => {
    // console.log(importedData)
    // var names = Object.values(importedData.names);
    // ///////////////////////
    // console.log(names)
    // d3.selectAll("#selDataset").on("change", optionChanged);

    // // function updatePlotly(newdata){
    // //     var id =document.getElementById("sample-metadata");
    // //     Plotly.restyle(id,"values",[newdata]);
    // // }
    // function optionChanged(dataset) {
    //     for (var i = 0; i < names.length; i++);
    //     var dataset = names[i];
    //     // updatePlotly(data)

    // }








    //////////////////////////////////////




    data = importedData.samples
    dataid = importedData.metadata
    // console.log(dataid)
    var sample = dataid.filter(x => x.id === 940)[0];
    console.log(sample)
    var age = sample.age
    var bbtypes = sample.bbtypes
    var ethnicity = sample.ethnicity
    var gender = sample.gender
    var id = sample.id
    var location = sample.location
    var wfreq = sample.wfreq


    function buildTable(age, bbtypes, ethnicity, gender, id, location, wfreq) {



        var table = d3.select("#sample-metadata");
        var tbody = table.select("p")
        var trow;


        trow = tbody.append("p");
        trow.append("p").text(age);
        trow.append("p").text(bbtypes);
        trow.append("p").text(ethnicity);
        trow.append("p").text(gender);
        trow.append("p").text(id);
        trow.append("p").text(location);
        trow.append("p").text(wfreq);

    };



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