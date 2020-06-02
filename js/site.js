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

$.when(dataCall, geomCall).then(function(dataArgs, geomArgs){
    var geom = geomArgs[0];
    geom.features.forEach(function(e){
        e.properties['country_code'] = String(e.properties['country_code']);
    });
    generateringComponent(dataArgs[0],geom);
});
// testing