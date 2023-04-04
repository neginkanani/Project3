const url = "api/brewery_untappd_export_MD.json";

// read data from html.

d3.json(url).then(function(x) {
    console.log(x);

    for ( let i=0; i<x.length; i++){
        let b_location = x[i].brewery_location;
        console.log(b_location);
    }
    const distinctTypes = [...new Set(x.map((d) => d.brewery_type))]
    const distinctCities = [...new Set(x.map((d) => d.brewery_location))]

    //fill the dropdown
    for ( let i=0; i<x.length; i++){
        d3.select("#selectpicker").append("option").text(distinctCities[i]).property("value",distinctCities[i] )
        d3.select("#selDataset").append("option").text(distinctTypes[i]).property("value",distinctTypes[i])
   }
})


function Type(selectedType){
    d3.json(url).then(function(x) {
        //bar chart
        let breweryType=x.filter(f=>f.brewery_type==selectedType)
            console.log(breweryType)

            let breweries = [];
            let values = [];
            let types = [];
    
            breweryType.forEach((point)=>{
                breweries.push(point.brewery_name);
                values.push(parseFloat(point.brewery_ratings.replace(/[{()}]/g, '')));
                types.push(point.brewery_type);
            })
    
            // let value = data.filter(result => result._id == brew);
    
            // console.log(brewery_name, brewery_type, brewery_ratings);
    
            let yticks = breweries.slice(0, 10).reverse();
            let xticks = values.slice(0, 10).reverse();
            let labels = types.slice(0, 10).reverse();
    
            let trace = {
                x: xticks,
                y: yticks,
                text: labels,
                type: "bar",
                orientation: "h"
            };
    
            let layout = {
                title: "Top 10 Breweries"
            };
    
            Plotly.newPlot("bar", [trace], layout)


d3.select("table").remove();
// copyrigh to : https://gist.github.com/jfreels/6733593 and to https://www.htmlgoodies.com/javascript/bring-your-data-to-life-with-d3-js/
    function tabulate(data, columns) {
        var table = d3.select('.col-md-6').append('table')
        //give the table an id
        .attr("id", "BrewType")
        .style("border-collapse", "collapse")
        .style("border", "2px black solid");
        var thead = table.append('thead')
        var tbody = table.append('tbody');
    
        // append the header row
        thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .text(function (column) { return column; })
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("background-color", "orange")
        .style("font-weight", "bold")
        .style("text-transform", "uppercase")

        var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');
    
        // create a cell in each row for each column
        var cells = rows.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
            return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
            .text(function (d) { return d.value; })
            .style("border", "1px black solid")
            .style("padding", "5px")
            .style("font-size", "12px")
            .on("mouseover", function(d,i) {
                // make the row red
                d3.select(this)
                    .style("background-color","red");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                   .style("background-color","transparent");
            })
    
    return table;
    }
    var brewTableType=tabulate(breweryType, ['brewery_location', 'brewery_name', 'brewery_ratings', 'brewery_type','number_beers']);

    brewTableType.selectAll("tbody tr") 
        .sort(function(a, b) {
                return d3.ascending(a.brewery_location, b.brewery_location);
        });
             
        });
    }      

function Citi(selectedCiti){
    d3.json(url).then(function(x) {
            //bar chart
        let breweryCiti=x.filter(f=>f.brewery_location==selectedCiti)
            console.log(breweryCiti)

            let breweries = [];
            let values = [];
            let types = [];
    
            breweryCiti.forEach((point)=>{
                breweries.push(point.brewery_name);
                values.push(parseFloat(point.brewery_ratings.replace(/[{()}]/g, '')));
                types.push(point.brewery_type);
            });
    
            // let value = data.filter(result => result._id == brew);
    
            // console.log(brewery_name, brewery_type, brewery_ratings);
    
            let yticks = breweries.slice(0, 10).reverse();
            let xticks = values.slice(0, 10).reverse();
            let labels = types.slice(0, 10).reverse();
    
            let trace = {
                x: xticks,
                y: yticks,
                text: labels,
                type: "bar",
                orientation: "h"
            };
    
            let layout = {
                title: "Top 10 Breweries"
            };
    
            Plotly.newPlot("bar", [trace], layout)
            

            d3.select("table").remove();
            // copyrigh to : https://gist.github.com/jfreels/6733593 and to https://www.htmlgoodies.com/javascript/bring-your-data-to-life-with-d3-js/
                function tabulate(data, columns) {
                    var table = d3.select('.col-md-5').append('table')
                    //give the table an id
                    .attr("id", "BrewType")
                    .style("border-collapse", "collapse")
                    .style("border", "2px black solid");
                    var thead = table.append('thead')
                    var tbody = table.append('tbody');
                
                    // append the header row
                    thead.append('tr')
                    .selectAll('th')
                    .data(columns).enter()
                    .append('th')
                    .text(function (column) { return column; })
                    .style("border", "1px black solid")
                    .style("padding", "5px")
                    .style("background-color", "orange")
                    .style("font-weight", "bold")
                    .style("text-transform", "uppercase")
            
                    // create a row for each object in the data
                    var rows = tbody.selectAll('tr')
                    .data(data)
                    .enter()
                    .append('tr');
                
                    // create a cell in each row for each column
                    var cells = rows.selectAll('td')
                    .data(function (row) {
                        return columns.map(function (column) {
                        return {column: column, value: row[column]};
                        });
                    })
                    .enter()
                    .append('td')
                        .text(function (d) { return d.value; })
                        .style("border", "1px black solid")
                        .style("padding", "5px")
                        .style("font-size", "12px")
                        .on("mouseover", function(d,i) {
                            // make the row red
                            d3.select(this)
                                .style("background-color","red");
                        })
                        .on("mouseout",function(d,i){
                            d3.select(this)
                               .style("background-color","transparent");
                        })
                
                return table;
                }
                var brewTableCiti=tabulate(breweryCiti, ['brewery_location', 'brewery_name', 'brewery_ratings', 'brewery_type','number_beers']);
            
                brewTableCiti.selectAll("tbody tr") 
                    .sort(function(a, b) {
                            return d3.ascending(a.brewery_location, b.brewery_location);
                    });
    })
}

//Defining the function in the html which executes once the drop downn is clicked
function optionChangedC(selectedCiti){
        console.log(`city ${selectedCiti} selected by the user`)
        Citi(selectedCiti)
        
       }

function optionChangedT(selectedType){
        console.log(`city ${selectedType} selected by the user`)
        Type(selectedType)
        
       }


// function optionChanged(y){
//         console.log(y)
        
            
//         }