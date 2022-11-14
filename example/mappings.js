const colorMappings = {
    steepness: {
        '-5': {
            text: '16%+',
            color: '#028306'
        },
        '-4': {
            text: '10-15%',
            color: '#2AA12E'
        },
        '-3': {
            text: '7-9%',
            color: '#53BF56'
        },
        '-2': {
            text: '4-6%',
            color: '#7BDD7E'
        },
        '-1': {
            text: '1-3%',
            color: '#A4FBA6'
        },
        '0': {
            text: '0%',
            color: '#ffcc99'
        },
        '1': {
            text: '1-3%',
            color: '#F29898'
        },
        '2': {
            text: '4-6%',
            color: '#E07575'
        },
        '3': {
            text: '7-9%',
            color: '#CF5352'
        },
        '4': {
            text: '10-15%',
            color: '#BE312F'
        },
        '5': {
            text: '16%+',
            color: '#AD0F0C'
        }
    },
    // https://color-hex.org/color/006400: green shades
    // https://color-hex.org/color/b84442: red shades
    risk_level:{
        '1': {
            text:'1',
            color: '#B2D0B2'
        },
        '2': {
            text: '2',
            color: '#D48E8D'
        },
        '3': {
            text: '3',
            color: '#C66967'
        },
        '4': {
            text: '4',
            color: '#b84442'
        },
        '0': {
            text: '0',
            color: '#4C924C'
        }
    },
    waytypes: {
        '0': {
            text: 'Other',
            color: '#30959e'
        },
        '1': {
            text: 'StateRoad',
            color: '#3f9da6'
        },
        '2': {
            text: 'Road',
            color: '#4ea5ae'
        },
        '3': {
            text: 'Street',
            color: '#5baeb5'
        },
        '4': {
            text: 'Path',
            color: '#67b5bd'
        },
        '5': {
            text: 'Track',
            color: '#73bdc4'
        },
        '6': {
            text: 'Cycleway',
            color: '#7fc7cd'
        },
        '7': {
            text: 'Footway',
            color: '#8acfd5'
        },
        '8': {
            text: 'Steps',
            color: '#96d7dc'
        },
        '9': {
            text: 'Ferry',
            color: '#a2dfe5'
        },
        '10': {
            text: 'Construction',
            color: '#ade8ed'
        }
    },
    surface: {
        '0': {
            text: 'Other',
            color: '#ddcdeb'
        },
        '1': {
            text: 'Paved',
            color: '#cdb8df'
        },
        '2': {
            text: 'Unpaved',
            color: '#d2c0e3'
        },
        '3': {
            text: 'Asphalt',
            color: '#bca4d3'
        },
        '4': {
            text: 'Concrete',
            color: '#c1abd7'
        },
        '5': {
            text: 'Cobblestone',
            color: '#c7b2db'
        },
        '6': {
            text: 'Metal',
            color: '#e8dcf3'
        },
        '7': {
            text: 'Wood',
            color: '#eee3f7'
        },
        '8': {
            text: 'Compacted Gravel',
            color: '#d8c6e7'
        },
        '9': {
            text: 'Fine Gravel',
            color: '#8f9de4'
        },
        '10': {
            text: 'Gravel',
            color: '#e3d4ef'
        },
        '11': {
            text: 'Dirt',
            color: '#99a6e7'
        },
        '12': {
            text: 'Ground',
            color: '#a3aeeb'
        },
        '13': {
            text: 'Ice',
            color: '#acb6ee'
        },
        '14': {
            text: 'Salt',
            color: '#b6c0f2'
        },
        '15': {
            text: 'Sand',
            color: '#c9d1f8'
        },
        '16': {
            text: 'Woodchips',
            color: '#c0c8f5'
        },
        '17': {
            text: 'Grass',
            color: '#d2dafc'
        },
        '18': {
            text: 'Grass Paver',
            color: '#dbe3ff'
        }
    },
    suitability: function(data){

        const hex = parseInt(data).toString(16).toUpperCase();

        return {
            text: `${data}/10`,
            color: `#${hex}D${hex}D${hex}D`
        };
    },
    conditionally_closed: {
        'true': {
            text: 'true',
            color: '#ff6f45'
        },
        'false': {
            text: 'false',
            color: '#6788ff'
        }
    }
};

function getColor(x) {
    return x ==0     ?   '#4C924C':
           x ==1     ?   '#B2D0B2':
           x ==2     ?   '#D48E8D':
           x ==3     ?   '#C66967':
           x ==4     ?   '#b84442':
                           '#A53D3B' ;
  };

function getWidth(x) {
    return x <=3     ?  5 :5-x;
};

function getBinaryColor(x) {
    return x==-1 ? '#006400':
    x == 1 ? '#b84442':
    '#847e80';
}

var DepotIconFun = L.Icon.extend({
    options:{
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [12,36], // point of the icon which will correspond to marker's location
        popupAnchor:  [33.497, -86.792] // point from which the popup should open relative to the iconAnchor    
    }
});

var DepotIcon = new DepotIconFun({iconUrl: 'figs/bus.png'
})

var OIcon = L.icon({
    iconUrl: 'figs/home.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [33.497, -86.792] // point from which the popup should open relative to the iconAnchor
});

var DIcon = L.icon({
    iconUrl: 'figs/destination.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [33.497, -86.792] // point from which the popup should open relative to the iconAnchor
});
