

const onRoute = event => {
    hg.mapMousemoveHandler(event, {showMapMarker:false})
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



const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attr = "Map data © <a href=\"https://openstreetmap.org\">OpenStreetMap</a> contributors"

const openstreetmap = L.tileLayer(url, {
    id: "openstreetmap",
    attribution: attr
})

const displayGroup = new L.LayerGroup()
displayGroup.addTo(map)

const bounds = new L.LatLngBounds(new L.LatLng(33.28, -87.0), new L.LatLng(33.7, -86.6)) // lon and lat boundary

const hg = L.control.heightgraph({
    mappings: colorMappings,
    graphStyle: {
        opacity: 0.8,
        'fill-opacity': 0.5,
        'stroke-width': '2px'
    },
    translation: {
        distance: "Travel duration",
        elevation: "Cumulative risk",
        segment_length: "Segment travel time",
        type: "Num of co-riders",
        legend: "Legend"
    },
    expandCallback(expand) {
        console.log("Expand: "+expand)
    },
    expandControls: true,
    highlightStyle: {
        color: "purple"
    },

})


hg.addTo(map)

hg.addData(geojson_opt)
// hg.addData(geojson_hist)
hg.resize({width:1000,height:300})

map.addLayer(openstreetmap).fitBounds(bounds)

var baseLayers =[
    {
        active:true,
        name: "OSM",
        layer: openstreetmap
    }
]

var overLayers = [
    {
        name: "Optimal routes",
        icon: '<i class="icon icon-water"></i>',
        layer: L.geoJson(geojson_opt).addTo(map)
    },
    {   
        active:true,
        name: "Historical routes",
        icon: '<i class="icon icon-parking"></i>',
        layer: L.geoJson(geojson_hist)
    }
]



var marker = L.marker([33.497, -86.792],{
        draggable: false
    }).addTo(map).bindPopup('Depot')
    .openPopup()


var layerControl = L.control.layers(baseLayers, overLayers).addTo(map);


