
// Function To Initialize Dashboard
function init() {

    // Fetch JSON Data From URL, Store In Variable
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
      .then(function(navel_data) {

        // Dropdown Menu
        create_dropdown(navel_data);
  
        // Sample Metadata
        display_metadata(navel_data);

        // Horizontal Bar Chart
        create_bar_chart(navel_data);
        
        // Gauge Chart
        create_gauge_chart(navel_data);

        // Bubble Chart
        create_bubble_chart(navel_data);
        
      });
  }
  
  // Function To Create Dropdown Menu
  function create_dropdown(navel_data) {
    const select_dropdown = d3.select("#selDataset");
    const subject_ids = navel_data.metadata.map(entry => entry.id);
  
    // Append Options To Dropdown For Each ID
    select_dropdown.selectAll("option")
      .data(subject_ids)
      .enter().append("option")
      .attr("value", d => d)
      .text(d => d);

    // Add Event Listener To Dropdown Menu
    select_dropdown.on("change", function() {

        // Call All Functions With navel_data
        display_metadata(navel_data);
        create_bar_chart(navel_data);
        create_gauge_chart(navel_data);
        create_bubble_chart(navel_data);
    });
  }
  
  // Function To Display Sample Metadata
  function display_metadata(navel_data) {

    // Get Selected ID From Dropdown Menu
    const selected_id = d3.select("#selDataset").property("value");
    
    // Find Metadata Object Corresponding To Selected ID
    const selected_metadata = navel_data.metadata.find(entry => entry.id === parseInt(selected_id));
    
    // Select Element To Display Metadata
    const metadata_div = d3.select("#sample-metadata");
    
    // Clear Previous Content
    metadata_div.html("");
    
    // Loop Through Metadata Object, Display Each key-value Pair
    Object.entries(selected_metadata).forEach(([key, value]) => {
        metadata_div.append("p").text(`${key}: ${value}`);
    });
  }

  // Function To Display Bar Chart
  function create_bar_chart(navel_data) {

    // Get Selected ID From Dropdown Menu
    const selected_id = d3.select("#selDataset").property("value");
    
    // Find Sample Data Corresponding To Selected ID
    const selected_sample = navel_data.samples.find(sample => sample.id === selected_id);
    
    // Take Top 10 OTUs
    const top_ten_sample = selected_sample.sample_values.slice(0, 10);
    const top_ten_otu_ids = selected_sample.otu_ids.slice(0, 10);
    const top_ten_otu_labels = selected_sample.otu_labels.slice(0, 10);
    
    // Reverse Arrays To Display In Descending Order
    top_ten_sample.reverse();
    top_ten_otu_ids.reverse();
    top_ten_otu_labels.reverse();
    
    // Create Trace For Bar Chart
    const trace = {
        x: top_ten_sample,
        y: top_ten_otu_ids.map(id => `OTU ${id}`),
        text: top_ten_otu_labels,
        type: 'bar',
        orientation: 'h'
    };
    
    // Create Data Array
    const data = [trace];
    
    // Plot Bar Chart
    Plotly.newPlot('bar', data);
  }
  
  // Function To Display Gauge Chart
  function create_gauge_chart(navel_data) {
    
    // Get Selected ID From Dropdown Menu
    const selected_id = d3.select("#selDataset").property("value");

    // Find Metadata Object Corresponding To Selected ID
    const selected_metadata = navel_data.metadata.find(entry => entry.id === parseInt(selected_id));
    
    // Get wfreq Value From Metadata
    const wfreq = selected_metadata.wfreq;

    // Create Data For Gauge Chart
    const data = [
        {
            type: "indicator",
            mode: "gauge+number",
            value: wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: { size: 20 } },
            gauge: {
                axis: { 
                    range: [0, 9], 
                    tickvals: Array.from({length: 10}, (_, i) => i),
                    tickwidth: 4, 
                    tickcolor: "black" 
                },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "black",
                steps: [
                    { range: [0, 9], color: "silver" }
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: wfreq
                }
            }
        }
    ];

    // Define Layout For Gauge Chart
    const layout = {
        width: 400,
        height: 300,
        margin: { t: 100, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "black", family: "Arial" }
    };

    // Plot Gauge Chart
    Plotly.newPlot('gauge', data, layout);
  }

  // Function To Create Bubble Chart
  function create_bubble_chart(navel_data) {
    const selected_id = d3.select("#selDataset").property("value");
    const selected_sample = navel_data.samples.find(entry => entry.id === selected_id);

    // Extract Data For Bubble Chart
    const x_values = selected_sample.otu_ids;
    const y_values = selected_sample.sample_values;
    const marker_sizes = selected_sample.sample_values;
    const marker_colors = selected_sample.otu_ids;
    const text_values = selected_sample.otu_labels;

    // Define Trace For Bubble Chart
    const trace = {
        x: x_values,
        y: y_values,
        mode: 'markers',
        marker: {
            size: marker_sizes,
            color: marker_colors,
            colorscale: 'Viridis',
            opacity: 0.5
        },
        text: text_values
    };

    // Define Layout For Bubble Chart
    const layout = {
        xaxis: { title: 'OTU ID' },
        showlegend: false,
        height: 600,
        width: 1000
    };

    // Plot Bubble Chart
    Plotly.newPlot('bubble', [trace], layout);
  }

  // Call init Function To Initialize Dashboard
  init();

