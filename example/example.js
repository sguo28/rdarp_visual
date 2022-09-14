const onRoute = event => {
    hg.mapMousemoveHandler(event, {showMapMarker:true})
}
const outRoute = event => {
    hg.mapMouseoutHandler(2000)
}


const changeData = setNumber => {
    let dataSet = setNumber === '1' ? geojson1 : setNumber === '2' ? geojson2 : setNumber === '3' ? geojson3 : []
    displayGroup.clearLayers()
    if (dataSet.length !== 0) {
        let newLayer = L.geoJson(dataSet)
        newLayer.on({
            'mousemove': onRoute,
            'mouseout': outRoute,
        })
        let newBounds = newLayer.getBounds()
        displayGroup.addLayer(newLayer)
        map.fitBounds(newBounds)
    }
    hg.addData(dataSet)
}

const map = new L.Map('map')

const url = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",// "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attr = "Map data © <a href=\"https://openstreetmap.org\">OpenStreetMap</a> contributors"

const openstreetmap = L.tileLayer(url, {
    id: "openstreetmap",
    attribution: attr
})

const displayGroup = new L.LayerGroup()
displayGroup.addTo(map)

const bounds = new L.LatLngBounds(new L.LatLng(33.31750533299112, -87.06000627772214), new L.LatLng(33.75249115087517, -86.50382344476166))

const hg = L.control.heightgraph({
    mappings: colorMappings,
    graphStyle: {
        opacity: 0.8,
        'fill-opacity': 0.5,
        'stroke-width': '2px'
    },
    translation: {
        distance: "Travel time",
        elevation: "Cumulative risk",
        segment_length: "Segment trip time",
        type: "Num of passengers"
        
    },
    expandCallback(expand) {
        console.log("Expand: "+expand)
    },
    expandControls: true,
    highlightStyle: {
        color: "purple"
    }
})


hg.addTo(map)

hg.addData(geojson1)

L.geoJson(geojson1)
    .on({
        'mousemove': onRoute,
        'mouseout': outRoute,
    })
    .addTo(displayGroup)


L.geoJson(geojson1,{
    style: function (features){
        return {
            "color": getColor(features.properties.attributeType), // in mappings
            "weight": getWidth(features.properties.attributeType), // in mappings
            "opacity":getWidth(features.properties.attributeType)/10*2,            
				"fill-opacity": 0.6,
            "dashArray": "3, 5"
        }
    }
}).addTo(displayGroup)


L.geoJson(nodes1,{
    style: function(feature) {
        return {
        	color: getBinaryColor(feature.properties.num_passen)
        };
    },
    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
        	radius: 8, 
        	fillOpacity: 0.85
        });
        // return new L.marker(feature.geometry.coordinates,{icon: L.icon({iconUrl:"figs/home.png",iconSize: [32, 37],
        // iconAnchor: [10, 32]})})
    }
}
).addTo(displayGroup)


map.addLayer(openstreetmap).fitBounds(bounds)
// hg.resize({width:1000,height:300})

L.marker([33.4970481,-86.7943605], {icon:DepotIcon}).addTo(map).bindPopup("Depot")