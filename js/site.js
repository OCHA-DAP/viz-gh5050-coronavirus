$( document ).ready(function() {
  var keyfiguresLink = 'https://proxy.hxlstandard.org/data.csv?dest=data_edit&strip-headers=on&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1V-XFX31KC4u8JOX_JOOOFOynE0oXwcvdO2RBB31mpwQ%2Fedit%23gid%3D548681856&force=on';
  const worldGeojson = 'data/countries.geo.json';
  var sexAndAgeDataLink = 'https://proxy.hxlstandard.org/data.csv?dest=data_edit&strip-headers=on&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1V-XFX31KC4u8JOX_JOOOFOynE0oXwcvdO2RBB31mpwQ%2Fedit%23gid%3D1186067706&force=on';
  var latestLink = 'https://proxy.hxlstandard.org/data.csv?dest=data_edit&strip-headers=on&tagger-match-all=on&tagger-01-header=country&tagger-01-tag=%23country+%2Bname&tagger-02-header=date+data+is+accurate+until&tagger-02-tag=%23date&tagger-09-header=testing+no+tests+%28men%29&tagger-09-tag=%23indicator+%2Btesting+%2Bm&tagger-10-header=no+tests+%28women%29&tagger-10-tag=%23indicator+%2Btesting+%2Bf&tagger-11-header=number+of+cases+total+no.+of+cases+%28if+disaggregated+by+sex%2C+this+should+be+sum+of+male+%2B+female+cases.+if+not+disaggregated+by+sex%2C+total+number+of+cases%29&tagger-11-tag=%23affected+%2Bcases+%2Ball&tagger-12-header=no.+of+cases+-+men&tagger-12-tag=%23affected+%2Bcases+%2Bm&tagger-13-header=%25+cases+%28men%29&tagger-13-tag=%23affected+%2Bcases+%2Bm+%2Bpct&tagger-14-header=no.+of+cases+-+women&tagger-14-tag=%23affected+%2Bcases+%2Bf&tagger-15-header=%25+cases+%28female%29&tagger-15-tag=%23affected+%2Bcases+%2Bf+%2Bpct&tagger-16-header=ratio+-+male%3Afemale+cases&tagger-16-tag=%23indicator+%2Bcases+%2Bratio&tagger-17-header=number+of+deaths+total+number+of+deaths+%28if+disaggregated+by+sex%2C+this+should+be+sum+of+male+%2B+female+deaths.+if+not+disaggregated+by+sex%2C+total+number+of+deaths%29&tagger-17-tag=%23affected+%2Bkilled+%2Ball&tagger-18-header=no.+of+deaths+-+men&tagger-18-tag=%23affected+%2Bkilled+%2Bm&tagger-19-header=%25+deaths+%28male%29&tagger-19-tag=%23affected+%2Bkilled+%2Bm+%2Bpct&tagger-20-header=no.+of+deaths+-+women&tagger-20-tag=%23affected+%2Bkilled+%2Bf&tagger-21-header=%25+deaths+%28female%29&tagger-21-tag=%23affected+%2Bkilled+%2Bf+%2Bpct&tagger-22-header=ratio+-+male%3Afemale+deaths&tagger-22-tag=%23indicator+%2Bkilled+%2Bratio&tagger-25-header=hospitalisations+hospitalied+total+%28sum+of+male%2Bfemale%29&tagger-25-tag=%23indicator+%2Bhospitalisations+%2Ball&tagger-26-header=total+no+hospitalised+%28male%29&tagger-26-tag=%23indicator+%2Bhospitalizations+%2Bm&tagger-27-header=hospitalised+%28female%29&tagger-27-tag=%23indicator+%2Bhospitalizations+%2Bf&tagger-28-header=%25+hospitalised+%28female%29&tagger-28-tag=%23indicator+%2Bhospitalizations+%2Bf+%2Bpct&tagger-29-header=%25+hospitalised+%28male%29&tagger-29-tag=%23indicator+%2Bhospitalizations+%2Bm+%2Bpct&tagger-32-header=icu+admissions+icu+total+%28sum+of+male+%2B+female%29&tagger-32-tag=%23indicator+%2Bicu+%2Ball&tagger-33-header=icu+male&tagger-33-tag=%23indicator+%2Bicu+%2Bm&tagger-34-header=icu+female&tagger-34-tag=%23indicator+%2Bicu+%2Bf&tagger-35-header=%25+icu+%28female%29&tagger-35-tag=%23indicator+%2Bicu+%2Bf+%2Bpct&tagger-36-header=%25+icu+%28male%29&tagger-36-tag=%23indicator+%2Bicu+%2Bm+%2Bpct&tagger-37-header=healthcare+workers+infected+total+%28sum+of+male+%2B+female%29&tagger-37-tag=%23affected+%2Bcases+%2Bhealthcare+%2Ball&tagger-38-header=healthcare+workers+infected+male&tagger-38-tag=%23affected+%2Bcases+%2Bhealthcare+%2Bm&tagger-39-header=healthcare+workers+infected+female&tagger-39-tag=%23affected+%2Bcases+%2Bhealthcare+%2Bf&tagger-40-header=%25+healthcare+workers+%28male%29&tagger-40-tag=%23affected+%2Bcases+%2Bhealthcare+%2Bm+%2Bpct&tagger-41-header=%25+healthcare+workers+%28female%29&tagger-41-tag=%23affected+%2Bcases+%2Bhealthcare+%2Bf+%2Bpct&tagger-46-header=ratio+-+confirmed+cases+that+have+died+%28m%3Af%29&tagger-46-tag=%23indicator+%2Bratio+%2Bconfirmed_died_cases&header-row=1&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1V-XFX31KC4u8JOX_JOOOFOynE0oXwcvdO2RBB31mpwQ%2Fedit%23gid%3D1108400769&force=on';
  var historicDataLink = 'https://proxy.hxlstandard.org/data.csv?dest=data_edit&strip-headers=on&tagger-match-all=on&tagger-01-header=country&tagger-01-tag=%23country+%2Bname&tagger-02-header=date+data+is+accurate+until&tagger-02-tag=%23date&tagger-03-header=%25+cases+%28men%29&tagger-03-tag=%23affected+%2Bcases+%2Bm&tagger-04-header=%25+cases+%28female%29&tagger-04-tag=%23affected+%2Bcases+%2Bf&tagger-05-header=%25+deaths+%28male%29&tagger-05-tag=%23affected+%2Bkilled+%2Bm&tagger-06-header=%25+deaths+%28female%29&tagger-06-tag=%23affected+%2Bkilled+%2Bf&header-row=1&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1V-XFX31KC4u8JOX_JOOOFOynE0oXwcvdO2RBB31mpwQ%2Fedit%23gid%3D1699147458&force=on';
  var excludedCountriesLink = 'https://proxy.hxlstandard.org/data.csv?dest=data_edit&strip-headers=on&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1V-XFX31KC4u8JOX_JOOOFOynE0oXwcvdO2RBB31mpwQ%2Fedit%23gid%3D1222272179&force=on';
  var descriptionURL = 'https://proxy.hxlstandard.org/data.csv?dest=data_edit&strip-headers=on&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1V-XFX31KC4u8JOX_JOOOFOynE0oXwcvdO2RBB31mpwQ%2Fedit%23gid%3D1488814450&force=on';
  
  // var keyfiguresLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=548681856&single=true&output=csv';
  // const worldGeojson = 'data/countries.geo.json';
  // var sexAndAgeDataLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=1186067706&single=true&output=csv';
  // var latestLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=1108400769&single=true&output=csv';
  // var historicDataLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=1699147458&single=true&output=csv';
  // var excludedCountriesLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=1222272179&single=true&output=csv';
  
  var geodata;
  var sexAndAgeData;
  var covidData;
  var chiffresCles;
  var historicData;
  var excludesCountries = [];
  var descriptionText = " ";

  var map;

  var countries = [],
      covidCountries = [];

  // colors 
  var darkest = '#772d2b';//'#800026';
  var mediumDark = '#a84a4a';//#FEB24C' ;#a84a4a
  var mediumLight = '#F17471';//'#E31A1C';#F17471
  var medium = '#ecba78';//'#F17471';//#FC4E2A';
  var light = '#f7e7b3';//'#ecba78';//'#FD8D3C';
  var noData = '#dadada';//'#FFEDA0';

  var colorMen = '#a84a4a';//'#49707b';
  var colorWomen = '#ecba78';//'#d44e3f'; 
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

  var titlePosition = 'center';
  var chartsHeight = 240;

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
      if (d1['#date'] > d2['#date']) return 1;
      if (d1['#date'] < d2['#date']) return -1;
      return 0;
    }

  function getData() {
    Promise.all([
      d3.csv(keyfiguresLink),
      d3.json(worldGeojson),
      d3.csv(sexAndAgeDataLink),
      d3.csv(latestLink),
      d3.csv(historicDataLink),
      d3.csv(excludedCountriesLink),
      d3.csv(descriptionURL)
    ]).then(function(data){
        chiffresCles = data[0];
        geodata = data[1];

        data[2].forEach( function(element, index) {
          element['#country+name'] = element['#country+name'].toUpperCase();
          element['#affected+cases+m'] = +element['#affected+cases+m'];
          element['#affected+cases+f'] = +element['#affected+cases+f'];
          element['#affected+killed+m'] = +element['#affected+killed+m'];
          element['#affected+killed+f'] = +element['#affected+killed+f'];

          covidCountries.includes(element['#country+name']) ? '': covidCountries.push(element['#country+name']);
        });
        // console.log(covidCountries)
        sexAndAgeData = data[2];
        
        data[3].forEach( function(element, index) {
          var pays = (element["#country+name"]).split('LATEST')[0];
          element["#country+name"] = pays.trim();
          element["#indicator+ratio+confirmed_died_cases"] = +element["#indicator+ratio+confirmed_died_cases"]
          element["#affected+cases+m+pct"] = +((element["#affected+cases+m+pct"]).split('%')[0]);
          element["#affected+cases+f+pct"] = +((element["#affected+cases+f+pct"]).split('%')[0]);
          element["#affected+killed+m+pct"] = +((element["#affected+killed+m+pct"]).split('%')[0]);
          element["#affected+killed+f+pct"] = +((element["#affected+killed+f+pct"]).split('%')[0]);

          element["#indicator+testing+m"] = +element["#indicator+testing+m"];
          element["#indicator+testing+f"] = +element["#indicator+testing+f"];
          
          element["#indicator+hospitalizations+m+pct"] = +((element["#indicator+hospitalizations+m+pct"]).split('%')[0]);
          element["#indicator+hospitalizations+f+pct"] = +((element["#indicator+hospitalizations+f+pct"]).split('%')[0]);
          
          element["#indicator+icu+m+pct"] = +((element["#indicator+icu+m+pct"]).split('%')[0]);
          element["#indicator+icu+f+pct"] = +((element["#indicator+icu+f+pct"]).split('%')[0]);
          
          element["#affected+cases+healthcare+f+pct"] = +((element["#affected+cases+healthcare+f+pct"]).split('%')[0]);
          element["#affected+cases+healthcare+m+pct"] = +((element["#affected+cases+healthcare+m+pct"]).split('%')[0]);

          countries.push(pays.trim());
        });
        console.log(countries)
        covidData = data[3];

        data[4].forEach( function(element, index) {
          element['#country+name'] = element['#country+name'].toUpperCase();
          element['#date'] = new Date(element['#date']);
          element['#affected+cases+m'] = +((element["#affected+cases+m"]).split('%')[0]);
          element['#affected+cases+f'] = +((element["#affected+cases+f"]).split('%')[0]);

          element['#affected+killed+m'] = +((element["#affected+killed+m"]).split('%')[0]);
          element['#affected+killed+f'] = +((element["#affected+killed+f"]).split('%')[0]);
        });
        
        historicData = data[4];
        data[5].forEach( function(element, index) {
          excludesCountries.push((element["#country+name"]).toUpperCase());
        });
        descriptionText = data[6];
        generateDescription();
        generateGlobalFigs(chiffresCles)
        createMap(geodata)
    });
    
  }

  function generateDescription() {
    $('#desc span').text(descriptionText[0]['#description']);
  } //generateDescription

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
    
    

    geojson = L.geoJson(geodata,
              { 
                style:style,
                onEachFeature: onEachFeature
              }).addTo(map);

    map.fitBounds(geojson.getBounds());
    map.setView([9.58, 10.37], 4);

    var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function(map){
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [darkest, mediumDark, mediumLight, medium,light, noData,'white'],
      labels = ['2.0 and higher',
                '1.5-1.99',
                '1.1-1.49',
                '.09-1.09',
                'Under .09 ',
                'Sex-disaggregated data for both cases and deaths not available',
                'Country data not yet collected'];

      div.innerHTML += '<p>Proportion of deaths in confirmed cases (Male:female ratio)</p';
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
            '<i style="background:' + grades[i] + '"></i> ' +
            labels[i] + '<br>';
      }

      return div;
    };

    legend.addTo(map);
    map.setZoom(2);

  } // createMap()

  function getColor(cntry) {
    var country = cntry.toUpperCase();
    var mortalityRate = 0;
    if (countries.includes(country)) {
      covidData.forEach( function(element, index) {
        element["#country+name"] == country ? mortalityRate = element["#indicator+ratio+confirmed_died_cases"]: '';
      });
    } 
    else {
      mortalityRate = "NA";
    }
    return mortalityRate > 2.0 ? darkest :
            (1.99 > mortalityRate && mortalityRate > 1.5)  ? mediumDark :
            (1.49 > mortalityRate && mortalityRate > 1.1)  ? mediumLight :
            (1.09 > mortalityRate && mortalityRate > 0.9)  ? medium :
            mortalityRate > 0.89 ? light : 
            mortalityRate == "NA" ? 'white' : noData;
  }


  function style(feature) {
    // use regionDim
    return {
        fillColor: getColor(feature.properties.name),
        weight: 1.2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
      };
  }//style

  function mapClicked (e) {
    var layer = e.target ;
    layer.openPopup();
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
        if (element["#country+name"] == pays) {
          casesMen = element["#affected+cases+m+pct"]; //#affected+cases+m+pct
          casesWomen = element["#affected+cases+f+pct"];
          deathsMen = element["#affected+killed+m+pct"]; //#affected+killed+m+pct
          deathsWomen = element["#affected+killed+f+pct"];
          ratio = element["#indicator+ratio+confirmed_died_cases"];
        }
      });
      ratio == 0 ? ratio = 'NA' : '';
      pop += "<p>Cases in men/women (%): "+casesMen+"/"+casesWomen+"</p>";
      pop += "<p>Deaths in men/women (%): "+deathsMen+"/"+deathsWomen+"</p>";
      pop += "<p>Ratio deaths among confirmed cases in men-women: "+ratio+"</p>";
    } else {
      pop += "<span>Country data not yet collected</span>"
    }

    return pop; 
  } //customPopUp


  function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
          weight: 2,
          color: '#000',// '#666',
          dashArray: '3',
          fillOpacity: 0.8
      });
      // layer.openPopup();

  }//highlightFeature

  function resetHighlight(e) {
      geojson.resetStyle(e.target);
      e.target.closePopup();

  }//resetHighlight

  function generateGlobalFigs (arr) {
    $('#globalFigures').html('');
    arr.forEach( function(element, index) {
      $('#globalFigures').append('<div class="col-md-12 col-xs-6 fig"><div class="keyfig"><span class="num">'+element['#value']+' </span><span class="indicator">' +element['#indicator+name']+'</span></div></div>');
    }); 

  } //generateGlobalFigs


  function graphesPays (pays) {
    // $('.country').html('');
    // $('.country').append("<h2>"+pays+"</h2>");
    // $('#covidCharts').html('');
    // $('#historicChart').html('');

    pays = pays.toUpperCase();

    if (countries.includes(pays) && !excludesCountries.includes(pays)) {
      $('.country').html('');
      $('.country').append("<h2>"+pays+"</h2>");
      $('#covidCharts').html('');
      $('#historicChart').html('');
      getSexAndAgeData(pays);
      dessinerGrapheSexAndAge();

      // getHistoricData(pays);
      // dessinerHistoricCharts()
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
      if (element["#country+name"] == pays) {
        sexAndAgeDataArrMen.push(element["#indicator+testing+m"]);
        sexAndAgeDataArrMen.push(element["#affected+cases+m+pct"]);
        sexAndAgeDataArrMen.push(element["#affected+cases+healthcare+m+pct"]);
        sexAndAgeDataArrMen.push(element["#indicator+hospitalizations+m+pct"]);
        sexAndAgeDataArrMen.push(element["#indicator+icu+m+pct"]);
        sexAndAgeDataArrMen.push(element["#affected+killed+m+pct"]); 

        sexAndAgeDataArrWomen.push(element["#indicator+testing+f"]);
        sexAndAgeDataArrWomen.push(element["#affected+cases+f+pct"]);
        sexAndAgeDataArrWomen.push(element["#affected+cases+healthcare+f+pct"]);
        sexAndAgeDataArrWomen.push(element["#indicator+hospitalizations+f+pct"]);
        sexAndAgeDataArrWomen.push(element["#indicator+icu+m+pct"]);
        sexAndAgeDataArrWomen.push(element["#affected+killed+f+pct"]);
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
      return d['#country+name'] == pays;
    })

    countryData.forEach( function(element, index) {
      covidXaxis.push(element['#indicator+age']);

      casesMen.push(element['#affected+cases+m']);
      casesWomen.push(element['#affected+cases+f']);

      deathsMen.push(element['#affected+killed+m']);
      deathsWomen.push(element['#affected+killed+f']);
    });


  }//getCovidSexAndAgeData

  function getHistoricData (pays) {
    historicXaxis = ['x'];

    hCasesMen = [' % cases (men)'];
    hCasesWomen = [' % cases (female)'];

    hDeathsMen = [' % deaths (male)'];
    hDeathsWomen = [' % deaths (female)'];
    var countryData = historicData.filter(function(d){
      d['#date'] = new Date(d['#date']);
      return d['#country+name'] == pays;
    });

    countryData.forEach( function(element, index) {
      var d = new Date(element['#date']);
      var date = d.getFullYear() +'-'+(d.getMonth() + 1) +'-'+d.getDate();
      element['#date'] = date;
    });

    countryData.sort(date_sort);

    countryData.forEach( function(element, index) {
      historicXaxis.push(element['#date']);
      hCasesMen.push(element['#affected+cases+m']);
      hCasesWomen.push(element['#affected+cases+f']);

      hDeathsMen.push(element['#affected+killed+m']);
      hDeathsWomen.push(element['#affected+killed+f']);
    });

  }//getHistoricData

  // dessiner Sex-disaggregated data along the COVID-19 clinical pathway
  function dessinerGrapheSexAndAge (arr) {
  
    sexAndAgeChart = c3.generate({
      bindto: '#saddBarchart',
      size: {height: chartsHeight},
      padding: {top: 10},
      title: {
        text: 'Sex-disaggregated data along the COVID-19 clinical pathway',
        position: titlePosition
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
      },
      tooltip:{
        format: {
          value: function(value){
            return value + " %";
          }
        }
      }
    });

  }//dessinerGrapheSexAndAge


  function dessinerCovidCharts (arr) {
     // $('#covidCharts').html('');
     $('#covidCharts').append('<div class="row"><div class="col-md-6"><div id="casesByAge"></div></div><div class="col-md-6"><div id="deathsByAge"></div></div></div>');

      // cases by age chart
     casesByChart = c3.generate({
        bindto: '#casesByAge',
        size: {height: chartsHeight},
        padding: {top: 10},
        title: {
          text: 'Cases by age and sex',
          position: titlePosition
        },
        data: {
            x: 'x',
            columns: [covidXaxis, casesMen, casesWomen],
            type: 'bar'
        },
        color: {
          pattern: [colorMen, colorWomen]
        },
        axis: {
          x: {
            type: 'category',
            tick:{
              // count: 5,
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
        size: {height: chartsHeight},
        padding: {top: 10},
        title: {
          text: 'Deaths by age and sex',
          position: titlePosition
        },
        data: {
            x: 'x',
            columns: [covidXaxis, deathsMen, deathsWomen],
            type: 'bar'
        },
        color: {
          pattern: [colorMen, colorWomen]
        },
        axis: {
          x: {
            type: 'category',
            tick:{
              // count: 5,
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
     // $('#historicChart').html('');
     $('#historicChart').append('<div class="row"><div class="col-md-6"><div id="historicCases"></div></div><div class="col-md-6"><div id="historicDeath"></div></div></div>');
      
      // cases chart
      historicCasesChart = c3.generate({
        bindto: '#historicCases',
        size: {height: chartsHeight},
        padding: {top: 10},
        title: {
          text: 'Cases - Historical trends',
          position: titlePosition
        },
        data: {
            x: 'x',
            type: 'line',
            columns: [historicXaxis, hCasesMen, hCasesWomen],
        },
        color: {
          pattern: [colorMen, colorWomen]
        },
        axis: {
          x: {
            type: 'timeseries',
            localtime: false,
            tick: {
              count: 5,
              format: '%b %Y',//'%Y-%m-%d',//'%b %Y',
              multiline: false,
              outer:false
            }
          },
          y: {
            tick: {
              count: 5,
              format: d3.format('d'),
              outer:false
            }
          }
        },
        tooltip:{
          format:{
            title: function(d){
              var date = d.getFullYear() +'-'+(d.getMonth() + 1) +'-'+d.getDate();
              return date;
            }
          }
        }
      });

      // deaths chart
      deathsByChart = c3.generate({
        bindto: '#historicDeath',
        size: {height: chartsHeight},
        padding: {top: 10},
        title: {
          text: 'Deaths - Historical trends',
          position: titlePosition
        },
        data: {
            x: 'x',
            type: 'line',
            columns: [historicXaxis, hDeathsMen, hDeathsWomen],
        },
        color: {
          pattern: [colorMen, colorWomen]
        },
        axis: {
          x: {
            type: 'timeseries',
            localtime: false,
            tick: {
              count: 5,
              format: '%b %Y',
              multiline: false,
              outer:false

            }
          },
          y: {
            tick: {
              count: 5,
              format: d3.format('d'),
              outer:false
            }
          }
        },
        tooltip:{
          format:{
            title: function(d){
              var date = d.getFullYear() +'-'+(d.getMonth() + 1) +'-'+d.getDate();
              return date;
            }
          }
        }
      });

  }//dessinerHistoricCharts

  getData();
  //remove loader and show vis

  $('main').css('opacity', 1);
  // $('.container-fluid').css('opacity', 1);
  $('.loader').hide();

}); //fin








