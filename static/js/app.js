
//Select the onchange function from HTML
d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged(id) {
    // console.log(id)
    var dropdownMenu = d3.select("#selDataset");

    var inputValue = dropdownMenu.property("value");

    // console.log(inputValue);
    // Update bar function and passing input value
    demoBar(inputValue)

}

///Drop Down Filled with values from names 
d3.json("samples.json").then((importedData) => {
    datanames = importedData.names

    var id_list = d3.select("#selDataset");

    Object.entries(datanames).forEach(([key, value]) => {
        id_list.insert("option").text(value)


    });
})



////////Demographic Info//////////
function demoBar(id_val) {
    d3.json("samples.json").then((data) => {

        //using D3 bring in metadata
        dataid = data.metadata

        // using the value return from input, select matching id
        const subjectId = parseInt(id_val)

        const guageId = dataid.filter(x => x.id === subjectId)[0];
        // console.log(guageId)

        // create a variable to read in the wfreq to use for guage chart
        const freq = guageId.wfreq;
        // console.log(freq)


        const sample = dataid.filter(x => x.id === subjectId)[0];
        // console.log(sample)

        // Fill in Demo chart with key and value 
        panel = d3.select(".panel-body")
        panel.html("")
        let demoFill = Object.entries(sample).forEach(([key, value]) => {
            panel.append("p").text(`${key}: ${value}`)
        });

        /////////Gauge Chart added///////////
        var data = [
            {
                // Use the freq variable display wfreq
                value: freq,
                title: { text: "Belly Button Washing per week" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 0 },

                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 9] }
                    ],


                }
            }
        ];
        // Display graph 
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

        // Update barGraph function with id_val
        barGraph(id_val);



    });

};
function barGraph(id) {
    d3.json("samples.json").then((data) => {

        //Create variables using D3
        datasort = data.samples;
        datanames = data.names;

        /// Use sort and filter then match with input from previous function
        var sortedValues = datasort.sort((a, b) => b.sample_values - a.sample_values);
        var sample940 = sortedValues.filter(obj => obj.id === id)[0];




        //Create trace
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
            title: `Top OTU of ${id}`,
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        //Display graph 
        Plotly.newPlot("bar", chartData, layout);


        //Create 2nd trace for bubble graph
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

        // Display graph
        Plotly.newPlot("bubble", dataChart)
    });
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////
////Preload graph--- Avoid users seeing a blank page at intial deployment

d3.json("samples.json").then((data) => {

    datasort = data.samples;


    datanames = data.names;

    dataid = data.metadata;
    var sample = dataid.filter(x => x.id === 940)[0];


    panel = d3.select(".panel-body")

    Object.entries(sample).forEach(([key, value]) => {
        panel.append("p").text(`${key}: ${value}`)

    });


    var sortedValues = datasort.sort((a, b) => b.sample_values - a.sample_values);
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
    var data = [
        {

            value: 2,
            title: { text: "Belly Button Washing per week" },
            colorscale: 'Greens',
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 0 },

            gauge: {
                axis: { range: [null, 9] },
                steps: [
                    { range: [0, 9] }
                ],


            }
        }
    ];

    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);

});