// base osm layer
var osmLayer =new ol.layer.Tile({
	title: 'Base Map',
	source: new ol.source.OSM(),
	type: 'base'
})

// initializing map object
var map = new ol.Map({
    target: 'mainMap',
    layers: [
      osmLayer
    ],

    view: new ol.View({
      center: ol.proj.fromLonLat([84.1240, 28.3949]),
      zoom: 7
    })
  });

// bing base map initializing
var bingBase = new ol.layer.Tile({
		title: 'BingMaps', // same name as variable
		type: 'base',
		visible: false,
		source: new ol.source.BingMaps({
		key: 'AoTlmaazzog43ImdKts9HVztFzUI4PEOT0lmo2V4q7f20rfVorJGAgDREKmfQAgd',
		imagerySet: 'AerialWithLabels',
		maxZoom: 19
	})
});
map.addLayer(bingBase);

// bingBase map toggling functionalities
var bingBaseCheckBox = document.getElementById("bingBaseLayer");
bingBaseCheckBox.addEventListener("change",toggleBaseMap);

function toggleBaseMap()
{
	if (bingBaseCheckBox.checked) {
		bingBase.setVisible(true);
		osmLayer.setVisible(false);
		return 1;
	}
	else
	{
		osmLayer.setVisible(true);
		bingBase.setVisible(false);
		return 0;
	}
}

// initializing total population layer
var populationLayer = new ol.layer.Image({
visible: true,
source: new ol.source.ImageWMS({
    url: 'http://localhost:8080/geoserver/Nepal/wms',
    params: {'Layers': 'Nepal:nepal_district'},
    serverType: 'geoserver'
  })
});

// initializing male population layer
var malePopulationLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/Nepal/wms',
		params: {'Layers' : 'Nepal:MalePopulation'},
		serverType: 'geoserver'
	})
});

// initializing female population layer
var femalePopulationLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
		url: 'http://localhost:8080/geoserver/Nepal/wms',
		params: {'Layers' : 'Nepal:femalePopulation'},
		serverType: 'geoserver'
	})
});

// initializing administrative layer
var administrativeLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
	    url: 'http://localhost:8080/geoserver/Nepal/wms',
	    params: {'LAYERS': 'Nepal:municipalities-polygon'},
	    serverType: 'geoserver'
	})
});

// initializing land cover layer
var landCoverLayer = new ol.layer.Image({
	visible: false,
	source: new ol.source.ImageWMS({
	    url: 'http://localhost:8080/geoserver/Nepal/wms',
	    params: {'LAYERS': 'Nepal:geotiff_coverage'},
	    serverType: 'geoserver'
	})
});

// making the list of above layers
layers = {
	'totalPopLayerLegend':populationLayer,
	'malePopulationLayerLegend':malePopulationLayer,
	'femalePopulationLayerLegend':femalePopulationLayer, 
	'administrativeLayerLegend':administrativeLayer, 
	'landCoverLayerLegend':landCoverLayer
};

// adding the layers to map using for loop
for (var key in layers)
{
	map.addLayer(layers[key]);
}

// initializing checkboxes from the document
$(function (){
	$('.layerCheckBox').change(
		function() {
			var legend = $(this).attr('data-legend')// which is also the key for layers dictionary
			if ($(this).is(':checked'))
			{
				layers[legend].setVisible(true);
				hideAllLegendExcept(legend);
			}
			else
			{
				layers[legend].setVisible(false);
			}
		}
	)
});

// function to hide all layers
function hideAllLegendExcept(legendToShow)
{
	for (var key in layers)
	{
		$('#'+key).hide();
	}

	$('#'+legendToShow).slideDown(100);
}

hideAllLegendExcept("totalPopLayerLegend")
