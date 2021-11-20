function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("../samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) { //the id # is passed in as the variable sample
    d3.json("../samples.json").then((data) => { //this is the whole data set read in. "data"
      var metadata = data.metadata; //This grabs just the section we need -- metadata
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample); //This filters on the specific ID provided
      var result = resultArray[0]; //This grabs the array
      var PANEL = d3.select("#sample-metadata"); 
  
      PANEL.html("");
      PANEL.append("h6").text(sample);
      PANEL.append("h6").text(result.ethnicity);
      PANEL.append("h6").text(result.gender);
      PANEL.append("h6").text(result.age);
      PANEL.append("h6").text(result.location);
      PANEL.append("h6").text(result.bbtype);
      PANEL.append("h6").text(result.wfreq);
      
    });
  }