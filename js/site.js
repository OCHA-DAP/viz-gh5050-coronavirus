$( document ).ready(function() {
  var keyfiguresLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=548681856&single=true&output=csv';
  const worldGeojson = 'data/countries.geo.json';
  var sexAndAgeDataLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=1186067706&single=true&output=csv';
  var latestLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=1108400769&single=true&output=csv';
  var historicDataLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=1699147458&single=true&output=csv';
  
  var geodata;
  var sexAndAgeData;
  var covidData;
  var chiffresCles;
  var historicData;

  var map;

  var countries = [],
      covidCountries = [];

  // colors 
  var darkest = '#800026';
  var mediumDark = '#FEB24C' ;
  var mediumLight = '#E31A1C';
  var light = '#FC4E2A';
  var white = '#FD8D3C';
  var otherColor = '#FFEDA0';

  var colorMen = '#49707b';
  var colorWomen = '#d44e3f'; 
  var covidMen = '#85bed8';
  var covidWomen = '#dfaf6c';

  var customOptions = {
      'className' : 'custom',
      'closeButton': false,
      'maxWidth': '250',
      'maxHeight': '150'
    };

  var sexAndAgeChart,
      casesByChart,
      deathsByChart,
      historicCasesChart,
      historicDeathsChart;

  var sexAndAgeDataArrMen = ['Men'],
      sexAndAgeDataArrWomen = ['Women'];
  
  var xAxis = ['x', 'Testing', 'Cases', 'Cases among Healthcare workers',
              'Hospitalisations', 'ICU', 'Deaths'];

  // covid cases and deaths by sex chart
  var covidXaxis = [];
  var casesMen = [],
      casesWomen = [];

  var deathsMen = [],
      deathsWomen = [];

  // historic cases and deaths chart
  var historicXaxis = [];
  var hCasesMen = [],
      hCasesWomen = [];
  var hDeathsMen = [],
      hDeathsWomen = [];

  var date_sort = function (d1, d2) {
      if (d1[' Date data is accurate until'] > d2[' Date data is accurate until']) return 1;
      if (d1[' Date data is accurate until'] < d2[' Date data is accurate until']) return -1;
      return 0;
    }

  function getData() {
    Promise.all([
      d3.csv(keyfiguresLink),
      d3.json(worldGeojson),
      d3.csv(sexAndAgeDataLink),
      d3.csv(latestLink),
      d3.csv(historicDataLink)
    ]).then(function(data){
        chiffresCles = data[0];
        geodata = data[1];

        data[2].forEach( function(element, index) {
          element['Country'] = element['Country'].toUpperCase();
          element['Cases per 100,000 (male)'] = +element['Cases per 100,000 (male)'];
          element['Cases per 100,000 (female)'] = +element['Cases per 100,000 (female)'];
          element['Deaths per 100,000 (male)'] = +element['Deaths per 100,000 (male)'];
          element['Deaths per 100,000 (female)'] = +element['Deaths per 100,000 (female)'];

          covidCountries.includes(element['Country']) ? '': covidCountries.push(element['Country']);
        });

        sexAndAgeData = data[2];
        

        data[3].forEach( function(element, index) {
          var pays = (element[" Country"]).split('LATEST')[0];
          element[" Country"] = pays.trim();
          element[" Ratio - confirmed cases that have died (m:f)"] = +element[" Ratio - confirmed cases that have died (m:f)"]
          element[" % cases (men)"] = +((element[" % cases (men)"]).split('%')[0]);
          element[" % cases (female)"] = +((element[" % cases (female)"]).split('%')[0]);
          element[" % deaths (male)"] = +((element[" % deaths (male)"]).split('%')[0]);
          element[" % deaths (female)"] = +((element[" % deaths (female)"]).split('%')[0]);

          element["Testing No tests (men)"] = +element["Testing No tests (men)"];
          element[" No tests (women)"] = +element[" No tests (women)"];
          
          element[" % Hospitalised (male)"] = +((element[" % Hospitalised (male)"]).split('%')[0]);
          element[" % Hospitalised (female)"] = 100 - element[" % Hospitalised (male)"];
          
          element[" % ICU (male)"] = +((element[" % ICU (male)"]).split('%')[0]);
          element[" % ICU (female)"] = 100 - element[" % ICU (male)"]; 
          
          element[" % Healthcare workers (female)"] = +((element[" % Healthcare workers (female)"]).split('%')[0]);
          element[" % Healthcare workers (male)"] = 100 - element[" % Healthcare workers (female)"];

          countries.push(pays.trim());
        });
        covidData = data[3];

        data[4].forEach( function(element, index) {
          element[' Country'] = element[' Country'].toUpperCase();
          element[' Date data is accurate until'] = new Date(element[' Date data is accurate until']);
          element[' % cases (men)'] = +((element[" % cases (men)"]).split('%')[0]);
          element[' % cases (female)'] = +((element[" % cases (female)"]).split('%')[0]);

          element[' % deaths (male)'] = +((element[" % deaths (male)"]).split('%')[0]);
          element[' % deaths (female)'] = +((element[" % deaths (female)"]).split('%')[0]);
        });
        historicData = data[4];
        
        generateGlobalFigs(chiffresCles)
        createMap(geodata)

        
    });
  }


  function createMap (geodata) {
    map = L.map('map',
    { 
        zoomSnap: 0.25,
        maxZoom: 20,
        // minZoom: 2
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg', {
        attribution: '<a href="http://mapbox.com">Mapbox</a>'
    }).addTo(map); 
    
    map.setView([9.58, 10.37], 3);

    geojson = L.geoJson(geodata,
              { 
                style:style,
                onEachFeature: onEachFeature
              }).addTo(map);

    map.fitBounds(geojson.getBounds());

    var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function(map){
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [darkest, mediumDark, mediumLight, light, white, otherColor],
      labels = ['ratio over 2.0',
                'ratio 1.5-1.99',
                'ratio 1.1-1.49',
                'ratio .9-1.09',
                'ratio <.89',
                'other'];


      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
            '<i style="background:' + grades[i] + '"></i> ' +
            labels[i] + '<br>';
      }

      return div;
    };

    legend.addTo(map);
    map.setZoom(1);

  } // createMap()

  function getColor(country) {
    country = country.toUpperCase();
    var mortalityRate = 0;
    if (countries.includes(country)) {
      covidData.forEach( function(element, index) {
        element[" Country"] == country ? mortalityRate = element[" Ratio - confirmed cases that have died (m:f)"]: '';
      });
    } 
    return mortalityRate > 2.0 ? darkest :
            (1.99 > mortalityRate && mortalityRate > 1.5)  ? mediumDark :
            (1.49 > mortalityRate && mortalityRate > 1.1)  ? mediumLight :
            (1.09 > mortalityRate && mortalityRate > 0.9)  ? light :
            mortalityRate > 0.89 ? white : otherColor;
  }

  function style(feature) {
    // use regionDim
    return {
        fillColor: getColor(feature.properties.name),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
      };
  }//style

  function mapClicked (e) {
    var layer = e.target ;
    graphesPays(layer.feature.properties.name);
  }//mapClicked

  function onEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: mapClicked
      }).bindPopup(customPopUp(feature.properties.name), customOptions);
  }//onEachFeature

  function customPopUp (pays) {
    pays = pays.toUpperCase();
    
    var pop = "<h5>"+ pays +"</h5>";

    var casesMen,
        casesWomen,
        deathsMen,
        deathsWomen,
        ratio;

    if (countries.includes(pays)) {
      covidData.forEach( function(element, index) {
        if (element[" Country"] == pays) {
          casesMen = element[" % cases (men)"];
          casesWomen = element[" % cases (female)"];
          deathsMen = element[" % deaths (male)"];
          deathsWomen = element[" % deaths (female)"];
          ratio = element[" Ratio - confirmed cases that have died (m:f)"];
        }
      });
      pop += "<p>Cases in men/women (%): "+casesMen+"/"+casesWomen+"</p>";
      pop += "<p>Deaths in men/women (%): "+deathsMen+"/"+deathsWomen+"</p>";
      pop += "<p>Ratio deaths among confirmed cases in men-women: "+ratio+"</p>";
    } else {
      pop += "<span> Data partially available</span>"
    }

    return pop; 
  } //customPopUp


  function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
          weight: 2,
          color: '#666',
          dashArray: '2',
          fillOpacity: 0.7
      });
      layer.openPopup();

  }//highlightFeature

  function resetHighlight(e) {
      geojson.resetStyle(e.target);
      e.target.closePopup();

  }//resetHighlight

  function generateGlobalFigs (arr) {
    $('#globalFigures').html('');
    arr.forEach( function(element, index) {
      // $('#globalFigures').append('<div class="col-md-4"><div class="keyfig"><div class="num">'+element['Value']+'</div><div class="indicator">'+element['Indicators']+'</div></div></div>');
      $('#globalFigures').append('<div class="col-md-4"><div class="keyfig"><span class="num">'+element['Value']+' </span><span class="indicator">' +element['Indicators']+'</span></div></div>');
    }); 

  } //generateGlobalFigs


  function graphesPays (pays) {
    $('.country').html('');
    $('.country').append("<h2>"+pays+"</h2>");
    
    pays = pays.toUpperCase();
    if (countries.includes(pays)) {
      getSexAndAgeData(pays);
      dessinerGrapheSexAndAge();

      getHistoricData(pays);
      dessinerHistoricCharts()
    }
    
    if (covidCountries.includes(pays)) {
      getCovidSexAndAgeData(pays);
      dessinerCovidCharts();
    }
    
  }//graphesPays


  function getSexAndAgeData (pays) {
    sexAndAgeDataArrMen = ['Men'];
    sexAndAgeDataArrWomen = ['Women'];

    covidData.forEach( function(element, index) {
      if (element[" Country"] == pays) {
        sexAndAgeDataArrMen.push(element["Testing No tests (men)"]);
        sexAndAgeDataArrMen.push(element[" % cases (men)"]);
        sexAndAgeDataArrMen.push(element[" % Healthcare workers (male)"]);
        sexAndAgeDataArrMen.push(element[" % Hospitalised (male)"]);
        sexAndAgeDataArrMen.push(element[" % ICU (male)"]);
        sexAndAgeDataArrMen.push(element[" % deaths (male)"]); 

        sexAndAgeDataArrWomen.push(element[" No tests (women)"]);
        sexAndAgeDataArrWomen.push(element[" % cases (female)"]);
        sexAndAgeDataArrWomen.push(element[" % Healthcare workers (female)"]);
        sexAndAgeDataArrWomen.push(element[" % Hospitalised (female)"]);
        sexAndAgeDataArrWomen.push(element[" % ICU (female)"]);
        sexAndAgeDataArrWomen.push(element[" % deaths (female)"]);
      }
    });
  }

  function getCovidSexAndAgeData (pays) {
    covidXaxis = ['x'];
    
    casesMen = ['Cases per 100,000 (male)'];
    casesWomen = ['Cases per 100,000 (female)'];

    deathsMen = ['Deaths per 100,000 (male)'];
    deathsWomen = ['Deaths per 100,000 (female)'];

    var countryData = sexAndAgeData.filter(function(d){
      return d.Country == pays;
    })

    countryData.forEach( function(element, index) {
      covidXaxis.push(element['Age Range']);

      casesMen.push(element['Cases per 100,000 (male)']);
      casesWomen.push(element['Cases per 100,000 (female)']);

      deathsMen.push(element['Deaths per 100,000 (male)']);
      deathsWomen.push(element['Deaths per 100,000 (female)']);
    });

  }//getCovidSexAndAgeData

  function getHistoricData (pays) {
    historicXaxis = ['x'];

    hCasesMen = [' % cases (men)'];
    hCasesWomen = [' % cases (female)'];

    hDeathsMen = [' % deaths (male)'];
    hDeathsWomen = [' % deaths (female)'];

    var countryData = historicData.filter(function(d){
      return d[' Country'] == pays;
    });

    countryData.forEach( function(element, index) {
      var d = element[' Date data is accurate until'];
      var date = d.getFullYear() +'-'+d.getMonth()+'-'+d.getDay();
      element[' Date data is accurate until'] = date;
    });

    countryData.forEach( function(element, index) {
      historicXaxis.push(element[' Date data is accurate until']);
      hCasesMen.push(element[' % cases (men)']);
      hCasesWomen.push(element[' % cases (female)']);

      hDeathsMen.push(element[' % deaths (male)']);
      hDeathsWomen.push(element[' % deaths (female)']);
    });

  }//getHistoricData

  function dessinerGrapheSexAndAge (arr) {
  
    sexAndAgeChart = c3.generate({
      bindto: '#saddBarchart',
      size: {height: 200},
      padding: {top: 10},
      title: {
        text: 'Sex-disaggregated data along the COVID-19 clinical pathway',
        position: 'upper-left'
      },
      data: {
          x: 'x',
          columns: [xAxis, sexAndAgeDataArrMen, sexAndAgeDataArrWomen],
          type: 'bar'
      },
      color: {
        pattern: [colorMen, colorWomen]
      },
      axis: {
        x: {
          type: 'category',
          tick: {
            outer: false
          }
        },
        y:{
          max: 90,
          tick: {
            format: d3.format('d'),
            count: 5,
            outer: false
          }
        }
      },
      grid: {
        y: {
          show: true
        }
      },
      bar: {
          width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
          }
      }
    });

  }//dessinerGrapheSexAndAge


  function dessinerCovidCharts (arr) {
     $('#covidCharts').html('');
     $('#covidCharts').append('<div class="row"><div class="col-md-6"><div id="casesByAge"></div></div><div class="col-md-6"><div id="deathsByAge"></div></div></div>');

     // $('#covidCharts').append('<div class="row"><h3>Covid cases and deaths by age and sex</h3><div class="col-md-6"><div id="casesByAge"></div></div><div class="col-md-6"><div id="deathsByAge"></div></div></div>');

    // cases by age chart
    casesByChart = c3.generate({
      bindto: '#casesByAge',
      size: {height: 200},
      padding: {top: 10},
      title: {
        text: 'Cases by age and sex',
        position: 'upper-left'
      },
      data: {
          x: 'x',
          columns: [covidXaxis, casesMen, casesWomen],
          type: 'bar'
      },
      color: {
        pattern: [covidMen, covidWomen]
      },
      axis: {
        x: {
          type: 'category',
          tick:{
            outer: false,
            multiline: false
          }
        },
        y: {
          tick: {
            format: d3.format(".2s"),
            count: 5,
            outer:false
          }
        }
      },
      grid: {
        y: {
          show: true
        }
      },
      bar: {
          width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
          }
      }
    });

    // deaths by age chart
    deathsByChart = c3.generate({
      bindto: '#deathsByAge',
      size: {height: 200},
      padding: {top: 10},
      title: {
        text: 'Deaths by age and sex',
        position: 'center'
      },
      data: {
          x: 'x',
          columns: [covidXaxis, deathsMen, deathsWomen],
          type: 'bar'
      },
      color: {
        pattern: [covidMen, covidWomen]
      },
      axis: {
        x: {
          type: 'category',
          tick:{
            outer: false,
            multiline: false
          }
        },
        y: {
          tick: {
            format: d3.format(".2s"),
            count: 5,
            outer:false
          }
        }
      },
      grid: {
        y: {
          show: true
        }
      },
      bar: {
          width: {
              ratio: 0.5 // this makes bar width 50% of length between ticks
          }
      }
    });

  }//dessinerCovidCharts

  function dessinerHistoricCharts () {
     $('#historicChart').html('');
     $('#historicChart').append('<div class="row"><div class="col-md-6"><div id="historicCases"></div></div><div class="col-md-6"><div id="historicDeath"></div></div></div>');
      
      // cases chart
      historicCasesChart = c3.generate({
        bindto: '#historicCases',
        size: {height: 200},
        padding: {top: 10},
        title: {
          text: 'Cases - Historical trends',
          position: 'upper-left'
        },
        data: {
            x: 'x',
            type: 'line',
            columns: [historicXaxis, hCasesMen, hCasesWomen],
        },
        color: {
          pattern: [covidMen, covidWomen]
        },
        axis: {
          x: {
            type: 'timeseries',
            localtime: false,
            tick: {
              format: '%b %Y'
            }
          },
          y: {
            tick: {
              count: 5,
              format: d3.format('d')
            }
          }
        }
      });

    // deaths chart
      deathsByChart = c3.generate({
        bindto: '#historicDeath',
        size: {height: 200},
        padding: {top: 10},
        title: {
          text: 'Deaths - Historical trends',
          position: 'center'
        },
        data: {
            x: 'x',
            type: 'line',
            columns: [historicXaxis, hDeathsMen, hDeathsWomen],
        },
        color: {
          pattern: [covidMen, covidWomen]
        },
        axis: {
          x: {
            type: 'category',
            // localtime: false,
            tick: {
              format: '%b %Y',
              multiline: false
            }
          },
          y: {
            tick: {
              count: 5,
              format: d3.format('d')
            }
          }
        }
      });

  }//dessinerHistoricCharts

  getData();
    //remove loader and show vis
  $('.loader').hide();
  $('.container').css('opacity', 1);
  $('.container-fluid').css('opacity', 1);

}); //fin








