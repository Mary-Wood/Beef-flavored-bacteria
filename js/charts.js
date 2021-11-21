function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("../samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("../samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("../samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var arraySamples = data.samples
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultSamples = arraySamples.filter(sampleObj => sampleObj.id == sample); //This filters on the specific ID provided
    //  5. Create a variable that holds the first sample in the array.
    var result = resultSamples[0]; 
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    otu_ids = result.otu_ids;
    otu_labels = result.otu_labels
    sample_values = result.sample_values;

    //for challenge 3, also grabbing some metadata data
    var arrayMeta = data.metadata;
    var resultMeta = arrayMeta.filter(sampleObj => sampleObj.id == sample);
    var metaResult = resultMeta[0];

    washFreq = metaResult.wfreq;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  

    var yticks = otu_ids.slice(0,10).map(otu_id => `OTU ${otu_id}`).reverse()


    // 8. Create the trace for the bar chart. 
    var barData = [{
    type: "bar", 
    x: sample_values.slice(0,10).reverse(), 
    y: yticks, 
    orientation: "h",
    text: otu_labels.slice(0,10).reverse(), 
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        

      },
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'    
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout )

    //Challenge 2
    // 1. Create the trace for the bubble chart.
     var trace = {
     //type: 'bubble', 
     x: otu_ids,
     y: sample_values,
     mode: "markers",
     marker: {
      color:otu_ids, size: sample_values},
     text: otu_labels,
     

    };
    var bubbleData = [trace];
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      showlegend: false, 
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
      margin: {width: 300}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 
   
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        value: washFreq, 
        domain: { x: [0, 1], y: [0, 1] },
        
        title: { 
            display: true, 
            text: "Belly Button Washing Frequecy<br><sub> Washes per Week </sub> ", 
            },
           
        
        type: "indicator", 
        mode: "gauge+number",
        
        gauge: {
          bar: { color: "black"},
          axis: { range: [0, 10]},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" }
          ]}
      }
    ];

    //5. Create the layout for the gauge chart.
    var gaugeLayout = { paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)', margin: { t: 20,b: 0 }};

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);


  });

  
      
  
      
  
      
    
  
}
