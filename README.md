# Utilization of Plotly and JavaScript to Visualize Belly Button Biodiversity #
## Overview ##

The Belly Button Biodiversity project delves into the diverse array of microbes residing within human navels and explores the various factors shaping their habitat in this unique and sheltered environment. Beyond sparking scientific inquiry, this exploration prompts discussions about the beneficial functions that these microbes serve. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare. To visualize the results of the study, an interactive dashboard was built using both Plotly and JavaScript.

## Process ##

1. Use of the D3 library to read in samples.json from the URL: https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json
2. Creation of display for each key-value pair from metadata JSON object
3. Creation of horizontal bar chart with dropdown menu to display the top 10 OTUs found in that individual
    - Use of sample_values as values for the bar chart
    - Use of otu_ids as labels for the bar chart
    - Use of otu_labels as hovertext for the chart
4. Creation of Gauge Chart to plot the weekly washing frequency of the individual
5. Creation of bubble chart that displays each sample
    - Use of otu_ids for the x values
    - Use of sample_values for the y values
    - Use of sample_values for the marker size
    - Use of otu_ids for the marker colors
    - Use of otu_labels for the text values
6. Creation of update for all the plots when a new sample is selected
7. Deployment of app to a free static page hosting service, in this case GitHub Pages

## Result ##

![image](https://github.com/10H-K/Plotly_Belly_Button/assets/152930492/0492a269-24ba-475d-97e1-04f0ea22dbdc)

## GitHub Pages ##


