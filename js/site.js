function hxlProxyToJSON(input){
    var output = [];
    var keys=[];
    input.forEach(function(e,i){
        if(i==0){
            e.forEach(function(e2,i2){
                var parts = e2.split('+');
                var key = parts[0];
                if(parts.length>1){
                    var atts = parts.splice(1,parts.length);
                    atts.sort();                    
                    atts.forEach(function(att){
                        key +='+'+att;
                    });
                }
                keys.push(key);
            });
        } else {
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);
        }
    });
    return output;
}

function generateringComponent(vardata, vargeodata){
var lookup = genLookup(vargeodata) ;
var Imap = dc.leafletChoroplethChart('#MapInform');
var formatDecimal = d3.format(",.2f");

//var dataTab1 = dc.dataTable('#dataTable2');
//var dataTab2 = dc.dataTable('#dataTable1');
var cf = crossfilter(vardata) ;
var all = cf.groupAll();
var mapDimension = cf.dimension(function(d) { return d.country_code});
var mapGroup = mapDimension.group().reduceSum(function(d){ return d.ratio});

dc.dataCount('#count-info')
  .dimension(cf)
  .group(all);
  
   Imap.width(1000)
       .height(1000)
       .dimension(mapDimension)
       .group(mapGroup)
       .label(function (p) { return p.key; })
       .renderTitle(true)
       .center([0,0])
       .zoom(0)
       .geojson(vargeodata)
       .colors(['#D3D3D3', '#C0C0C0', '#A9A9A9', '#808080', '#696969'])
       .colorDomain([0,4])
       .colorAccessor(function (d){
        var c = 0
           if (d>2) {
                 c = 5;
               } else if (d>1.5) {
                    c = 4;
               } else if (d>1.1){
                  c = 3;
                } else if (d>0.9){
                  c = 2;
             
              } else if (d>0) {
                c = 1;
              }
               return c
        })
       .featureKeyAccessor(function (feature){
          return feature.properties['country_code'];
          }).popup(function (d){
          return '<h4>'+ d.properties['country_code']+ '</h4>'+'Ratio';
       })  
        .renderPopup(true);
//begin test
function style(feature) {
    if (feature.properties['country_code']) 
        return {

            fillColor:'#f03b20',
            weight: 4,
            opacity: 0.9,
            color: '#f03b20',
            fillOpacity: 0.9
        };
 }      
 
  
     Winheight = $(window).height();
     //$("#MapInform").css("background-color","#FFFFFF");
      
      dc.renderAll();

      var map = Imap.map({ 
        /*maxZoom: 5,
        minZoom: 3*/
      });

      zoomToGeom(vargeodata);
      function zoomToGeom(geodata){
        var bounds = d3.geo.bounds(geodata) ;
        map.fitBounds([[bounds[0][1],bounds[0][0]],[bounds[1][1],bounds[1][0]]])
            /*.setZoom(4)
            .setView([9.80, 10.37], 4)
            .dragging.disable()*/;
     } 
    map.keyboard.disable();
    
      
      function genLookup(geojson) {
        var lookup = {} ;
        geojson.features.forEach(function (e) {
          lookup[e.properties['country_code']] = String(e.properties['country_name']);
        });
        return lookup ;
      }
}

function generateGlobalFigs (arr) {
  $('#globalFigures').html('');
  arr.forEach( function(element, index) {
    $('#globalFigures').append('<div class="col-md-4"><div class="num">'+element['#value']+'</div><div class="indicator">'+element['#indicator']+'</div></div>');
  }); 

} //generateGlobalFigs

var sexAndAgeDataLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=1186067706&single=true&output=csv';
var clinicalDataLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE_aFWz6CKaQS0sSuGWUdklTcC9_Q7k31HYUFBw3GpC_zQxHx1_8NrYY83giC-oQhoCTB6zoiRnBWM/pub?gid=334578969&single=true&output=csv';
var sexAndAgeData;
var covidData;
var historicData;
var selectedCountry = 'Spain';

function setOverallData() {
  Promise.all([
    d3.csv(sexAndAgeDataLink),
    d3.csv(clinicalDataLink)
  ]).then(function(data){
    sexAndAgeData = data[0];
    covidData = data[1];
    countryCustomCharts()
  });
}//setOverallData

function countryCustomCharts (countryname) {

}//countryCustomCharts

var dataCall = $.ajax({
    type: 'GET',
    url: 'data/InformData2.json',
    dataType: 'json',
});

var geomCall = $.ajax({
    type: 'GET',
    url: 'data/wa.geojson',
    dataType: 'json',
});

var figuresCall = $.ajax({
    type: 'GET',
    url: 'https://proxy.hxlstandard.org/data.json?dest=data_edit&strip-headers=on&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1V-XFX31KC4u8JOX_JOOOFOynE0oXwcvdO2RBB31mpwQ%2Fedit%23gid%3D548681856',
    dataType: 'json',
});

$.when(dataCall, geomCall, figuresCall).then(function(dataArgs, geomArgs, figuresArgs){
    var geom = geomArgs[0];
    geom.features.forEach(function(e){
        e.properties['country_code'] = String(e.properties['country_code']);
    });
    // generateringComponent(dataArgs[0],geom);

    var figuresData = hxlProxyToJSON(figuresArgs[0]);
    
    generateGlobalFigs(figuresData);
    setOverallData();
    // countryCustomCharts();
});







