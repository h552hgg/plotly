

d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged(id) {
    // console.log(id)
    var dropdownMenu = d3.select("#selDataset");

    var inputValue = dropdownMenu.property("value");

    // console.log(inputValue);
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

        dataid = data.metadata
        const subjectId = parseInt(id_val)


        const sample = dataid.filter(x => x.id === subjectId)[0];

        // console.log(sample)

        panel = d3.select(".panel-body")
        panel.html("")
        let demoFill = Object.entries(sample).forEach(([key, value]) => {
            panel.append("p").text(`${key}: ${value}`)
            // // console.log(key, value)

            // if (key === "wfreq")
            //     return value;
            // console.log(value)

        });

        barGraph(id_val);



    });

};
function barGraph(id) {
    d3.json("samples.json").then((data) => {

        datasort = data.samples


        datanames = data.names
        // console.log(id)
        // var subject = parseInt(id)
        // console.log(subject)


        var sortedValues = datasort.sort((a, b) => b.sample_values - a.sample_values);
        var sample940 = sortedValues.filter(obj => obj.id === id)[0];





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

        //     /////////Gauge Chart added///////////

        //     var data = [
        //         {

        //             value: freq,
        //             title: { text: "Belly Button Washing per week" },
        //             colorscale: 'Greens',
        //             type: "indicator",
        //             mode: "gauge+number",
        //             delta: { reference: 0 },

        //             gauge: {
        //                 axis: { range: [null, 9] },
        //                 steps: [
        //                     { range: [0, 9] }
        //                 ],


        //             }
        //         }
        //     ];

        //     var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        //     Plotly.newPlot('gauge', data, layout);
    });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
////Preload graph////////








d3.json("samples.json").then((data) => {

    datasort = data.samples


    datanames = data.names
    // console.log(id)
    // var subject = parseInt(id)
    // console.log(subject)
    dataid = data.metadata
    var sample = dataid.filter(x => x.id === 940)[0];


    panel = d3.select(".panel-body")

    Object.entries(sample).forEach(([key, value]) => {
        panel.append("p").text(`${key}: ${value}`)

    });


    var sortedValues = datasort.sort((a, b) => b.sample_values - a.sample_values);
    var sample940 = sortedValues.filter(obj => obj.id === `940`)[0];
    // console.log(sample940)

    // var dataSearch = dataid
    // var freq = dataSearch
    // console.log(freq)





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