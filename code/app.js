$(document).ready(function() {  
//jquery init 

// variables
    // City
var clickedCities = [];
var cities = [
    { label: '',
    backgroundColor: [
        'rgba(255, 255, 255, 0.2)'
    ],
    borderColor: [
        'rgba(255, 255, 255, 1)'
    ],
    },
    {
    label: 'Chicago',
    data: [30, 40, 50, 60, 70, 80, 90, 100, 110], 
    backgroundColor: [
        'rgba(21, 152, 243, 0.2)'
    ],
    borderColor: [
        'rgba(21, 152, 243, 1)'
    ],
    borderWidth: 1
}, {
    label: 'New York',
    data: [110, 100, 90, 80, 70, 60, 50, 40, 30], 
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
    ],
    borderColor: [
        'rgba(255, 99, 132, 1)'
    ],
    borderWidth: 1
},
{
    label: 'Los Angeles',
    data: [102, 100, 96, 100, 70, 30, 50, 40, 20], 
    backgroundColor: [
        'rgba(6, 146, 8, 0.2)'
    ],
    borderColor: [
        'rgba(6, 146, 8, 1)'
    ],
    borderWidth: 1
},
{
    label: 'Houston',
    data: [2, 10, 96, 84, 70, 35, 60, 92, 20], 
    backgroundColor: [
        'rgba(249, 141, 12, 0.2)'
    ],
    borderColor: [
        'rgba(249, 141, 12, 1)'
    ],
    borderWidth: 1
},
{
    label: 'Philadelphia',
    data: [12, 34, 70, 80, 40, 50, 100, 110, 20], 
    backgroundColor: [
        'rgba(23, 2, 118, 0.2)'
    ],
    borderColor: [
        'rgba(23, 2, 118, 1)'
    ],
    borderWidth: 1
}, 
{
    label: 'Dallas',
    data: [6, 80, 12, 100, 3, 94, 110, 77, 2], 
    backgroundColor: [
        'rgba(252, 62, 241, 0.2)'
    ],
    borderColor: [
        'rgba(252, 62, 241, 1)'
    ],
    borderWidth: 1
}]

// functions

    // Ajax call 
    function calcIncrement() {
    
        $.ajax({
            url: "https://api.meteostat.net/v1/history/monthly?station=72530&start=2009-01&end=2012-12&key=ELTLnGss",
            method: "GET"
        })
            .then(function(response) {
                console.log(response);
                var yearTempMean09 = 0;
                var yearTempMean10 = 0;
                var yearTempMean11 = 0;
                var yearTempMean12 = 0;
                for (i = 0; i < response.data.length; i++) {
                    
                    if (i < 12) {
                        
                        var monthTempMean = response.data[i].temperature_mean;
                        yearTempMean09 = (yearTempMean09 + monthTempMean);
                        var tempAVG09 = (yearTempMean09 / 12);
                        // console.log(tempAVG09);
                    };
                    if (i > 11 && i < 24) {
                        
                        var monthTempMean = response.data[i].temperature_mean;
                        yearTempMean10 = (yearTempMean10 + monthTempMean);
                        var tempAVG10 = (yearTempMean10 / 12)
                        // console.log(TempAVG10);
                    };
                    if (i > 23 && i < 36) {
                        
                        var monthTempMean = response.data[i].temperature_mean;
                        yearTempMean11 = (yearTempMean11 + monthTempMean);
                        var tempAVG11 = (yearTempMean11 / 12)
                        // console.log(TempAVG11);
                    };
                    if (i > 35) {
                        
                        var monthTempMean = response.data[i].temperature_mean;
                        yearTempMean12 = (yearTempMean12 + monthTempMean);
                        var tempAVG12 = (yearTempMean11 / 12)
                        // console.log(TempAVG12);
                    };              
                }
                var avg09 = (yearTempMean09 / 12);
                var avg10 = (yearTempMean10 / 12);
                var avg11 = (yearTempMean11 / 12);
                var avg12 = (yearTempMean12 / 12);
                
                var increment1 = (avg10 - avg09)
                var increment2 = (avg11 - avg10)
                var increment3 = (avg12 - avg11)
                var incrementTotal = ((increment1 + increment2 + increment3) / 3)
            
                return incrementTotal;
            });
        };

    // Dropdown function 
        // Match city selected to array of 10 major cities 
        // Ajax call for stations 
        // Fill div with 5 stations from that city
            
    // Click station function 
        // Major variable to pass into Ajax call - station number 
        // Ajax 
            // Formula for temperature of middle of summer from object for that city 
            // Replace div with table of temperature projections by year that city 
            // Replace div with graph of temperature projections for that city 

    function chartOne(cityData) {
    $('.js-chart').html('<canvas id="myChart" width="10rem" height="10rem"></canvas>');
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2030', '2040', '2050', '2060', '2070'],
            datasets: cityData
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0
        }
        //
        
    });
    myChart.update()
}

function showChart(i) {
    if (clickedCities.indexOf(cities[i]) < 0) {
        clickedCities.push(cities[i]);
        chartOne(clickedCities);
    }
}

function init() {
    showChart(0);
    /*$('.js-chart').empty();*/
    clickedCities = [];
}


    // Clear graph function 

// events

    // Submit dropdown 
        // Dropdown function 
    
$('.js-submit').on('click', function() {

    chartNumber = $(this).attr('data-index');
    showChart(chartNumber);

})

    // Click station
        // Click station function 

    // Clear graph 
$('.js-clear').on('click', function() {
    clickedCities = [];
    showChart(0);
    clickedCities = [];
})
// init 
init();
    // Sample city (Chicago)

});