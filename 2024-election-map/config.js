// General Map settings

var mapSettings = {

    // Callback once the map style is loaded
    onLoad: function () {

        // Create HTML UI elements to control the map
        // createCustomMapControls();
        createElectionYearControl();

        // Add interaction events to the map
        addMapInteractions();

        // Add map layers using a dynamic Google Sheet CSV datasource
        addCsvLayers();

        // Debug: Inspect loaded Mapbox style JSON for data sources and layer names
        // These would be useful for customizing the layers in the story config
        // 
        // console.log("Vector data sources", map.getStyle().sources);
        // console.log("Style layers", map.getStyle().layers);

        // Customize the loaded style
        // and hide certain layers that we do not want to show   
        ['Map Title', 'Map Title seperator', 'Map Title description'].forEach((layer) =>
            map.setLayoutProperty(layer, 'visibility', 'none')
        )
    },

    // Adjust the map camera animation speed
    // https://docs.mapbox.com/mapbox-gl-js/api/properties/#animationoptions
    animationOption: {
        duration: 600,
        easing: function (t) {
            return t * t * t;
        }
    },

};

// Story configuration
// Make sure to replace with your Mapbox Access Token
// https://github.com/mapbox/storytelling/blob/main/README.md#configuration-options
var config = {
    style: 'mapbox://styles/planemad/cltq96lhe002601qz5smu9pas', // Customize: https://api.mapbox.com/styles/v1/planemad/cltq96lhe002601qz5smu9pas.html?title=copy&access_token=pk.eyJ1IjoibWJ4LWJvdW5kYXJpZXMiLCJhIjoiY2x1N2JvaTFoMDNpZDJubGx1djJzbzBjZSJ9.B37C-klYWykKjTigk62aew
    accessToken: 'pk.eyJ1IjoibWJ4LWJvdW5kYXJpZXMiLCJhIjoiY2x1N2JvaTFoMDNpZDJubGx1djJzbzBjZSJ9.B37C-klYWykKjTigk62aew',
    location: {
        center: [-98, 40],
        zoom: 3,
        pitch: 0,
        bearing: 0,
        maxBounds: [
            [-166, 5], // Southwest coordinates
            [0, 90] // Northeast coordinates
        ]
    },
    showMarkers: false,
    markerColor: '#3FB1CE',
    projection: 'globe',    // https://docs.mapbox.com/mapbox-gl-js/example/projections/    
    inset: true,
    geocoder: true,
    theme: 'dark',
    use3dTerrain: false, //set true for enabling 3D maps.
    auto: false,
    title: '<span class="text-2xl font-bold">US Presidential Vote</span><br><span class="text-xl">by county (2004-2020)</span>',
    subtitle: 'A low code <a class="underline" href="https://www.nationalgeographic.com/culture/article/united-states-election-map-history?loggedin=true&rnd=1713424451400">election map</a>\
    built with the <a class="underline" href="https://www.mapbox.com/solutions/interactive-storytelling">Mapbox storytelling template</a> and <a class="underline" href="https://www.mapbox.com/impact-tools/sheet-mapper">sheet mapper plugin</a>.<br>\
    Scroll down for a tour.',
    byline: '',
    footer: '<b>Sources</b><br>\
    <ul>\
    <li><i>CC-0</i> MIT Election Data and Science Lab: County Presidential Election Returns 2000-2020</li>\
    <li><i>CC-0</i> US Census: County level shapefiles 2019</li>\
    <li><i>CC-BY</i> VEP Turnout: 1980-2014 November General Election - Turnout Rates</li>\
    <li><i>©</i>Mapbox tilesets by Mapbox Boundaries</li>\
    </ul>\
    <br>Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
    callback: mapSettings.onLoad,
    chapters: [
        {
            id: 'view-1',
            alignment: 'left',
            hidden: false,
            title: '',
            image: null,
            description: 'The map visualizes the popular vote for each US county as a traditional choropleth and as a dot map',
            location: {
                center: [-98, 40],
                zoom: 3,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: function () {
                setElectionYear(2020)
            },
            onChapterEnter: [
                {
                    layer: 'historical-pres-elections-county-points',
                    opacity: 1
                },
                {
                    layer: 'historical-pres-elections-county-points blur',
                    opacity: 1
                },
                {
                    layer: 'historical-pres-elections-county choropleth',
                    opacity: 0
                }
            ],
            onChapterExit: [
            ]
        },
        {
            id: 'view-2',
            alignment: 'left',
            hidden: false,
            title: '',
            image: null,
            description: 'Choropleth shading of each area gives visual importance to larger areas, making smaller but more important areas hard to see',
            location: {
                center: [-98, 40],
                zoom: 3,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [
                {
                    layer: 'historical-pres-elections-county-points',
                    opacity: 0
                },
                {
                    layer: 'historical-pres-elections-county-points blur',
                    opacity: 0
                },
                {
                    layer: 'historical-pres-elections-county',
                    opacity: 0.3
                },
                {
                    layer: 'historical-pres-elections-county choropleth',
                    opacity: 1
                }
            ],
            onChapterExit: [
            ]
        },
        {
            id: 'view-3',
            alignment: 'left',
            hidden: false,
            title: '',
            image: null,
            description: 'Dot maps can be used in such cases to provide a more full picture of the data',
            location: {
                center: [-98, 40],
                zoom: 3,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [
                {
                    layer: 'historical-pres-elections-county-points',
                    opacity: 1
                },
                {
                    layer: 'historical-pres-elections-county-points blur',
                    opacity: 1
                },
                {
                    layer: 'historical-pres-elections-county',
                    opacity: 0
                },
                {
                    layer: 'historical-pres-elections-county choropleth',
                    opacity: 0
                }
            ],
            onChapterExit: [
            ]
        },
        {
            id: 'view-4',
            alignment: 'left',
            hidden: false,
            title: '',
            image: null,
            description: 'Another technique is to use 3D extrusions to show data that would otherwise be hidden',
            location: {
                center: [-99, 35],
                zoom: 4,
                pitch: 40,
                bearing: 25
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            onChapterEnter: [
                {
                    layer: 'historical-pres-elections-county-points',
                    opacity: 0
                },
                {
                    layer: 'historical-pres-elections-county-points blur',
                    opacity: 0
                },
                {
                    layer: 'historical-pres-elections-county 3d',
                    opacity: .8
                }
            ],
            onChapterExit: [
                {
                    layer: 'historical-pres-elections-county 3d',
                    opacity: 0
                }
            ]
        }
    ]
};

// Custom map functions

const electionYears = [2004, 2008, 2012, 2016, 2020];
let activeYear = 2020;

// Create the UI buttons to control the election year
function createElectionYearControl() {

    document.getElementById('map-overlay').innerHTML = '<div id="feature-info"></div><div id="year-control"><p class="mb-2">Choose an election year</p></div>'

    const yearControl = document.getElementById('year-control');

    electionYears.forEach(year => {
        const radioContainer = document.createElement('div');
        radioContainer.classList.add('inline-block', 'pr-2', 'pb-2');

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'electionYear';
        radio.value = year;
        radio.id = `year-${year}`;
        radio.classList.add('sr-only');

        if (year === activeYear) {
            radio.checked = true;
        }

        const label = document.createElement('label');
        label.textContent = year;
        label.htmlFor = `year-${year}`;

        label.classList.add(
            'font-medium',
            'inline-flex',
            'items-center',
            'px-2',
            'py-1',
            'rounded-md',
            'shadow-sm',
            'cursor-pointer',
        );

        // Set the button colors based on party won
        if ([2000, 2004, 2016].indexOf(year) > -1) {
            label.classList.add(
                'bg-red-950',
                'hover:bg-red-600',
            )
        } else {
            label.classList.add(
                'bg-blue-950',
                'hover:bg-blue-600',
            )
        }

        // Update election year on button events
        radio.addEventListener('change', () => {
            activeYear = year;
            setElectionYear(year);
        });
        radioContainer.addEventListener('mouseover', () => {
            setElectionYear(year);
        });
        yearControl.addEventListener('mouseout', () => {
            setElectionYear(activeYear);
        });

        radioContainer.appendChild(radio);
        radioContainer.appendChild(label);
        yearControl.appendChild(radioContainer);

        updateActiveRadio()
    });
}

function updateActiveRadio() {
    const radios = document.querySelectorAll('#year-control input[type="radio"]');
    const labels = document.querySelectorAll('#year-control label');

    radios.forEach((radio, index) => {
        const label = labels[index];
        if (radio.checked) {
            label.classList.add(
                'outline-dotted'
            )
        } else {
            label.classList.remove(
                'outline-dotted'
            )
        }
    });
}

// Update the map style to visualize a different election year
function setElectionYear(year) {

    updateActiveRadio()

    // Update the data driven paint property GL expression
    // by replacing the year and updating the style
    let electionLayers = [
        { 'historical-pres-elections-county': 'fill-color' },
        { 'historical-pres-elections-county choropleth': 'fill-color' },
        { 'historical-pres-elections-state': 'fill-color' },
        { 'historical-pres-elections-county-points': 'circle-color' },
        { 'historical-pres-elections-county-points': 'circle-radius' },
        { 'historical-pres-elections-county-points blur': 'circle-color' },
        { 'county label description': 'text-field' },
        { 'historical-pres-elections-county 3d': 'fill-extrusion-height' },
        { 'historical-pres-elections-county 3d': 'fill-extrusion-color' }
    ]

    electionLayers.forEach(layer => {

        const layerId = Object.keys(layer)[0]

        const paintProperty = layer[layerId]
        if (paintProperty != 'text-field') {
            const paintPropertyValue = map.getPaintProperty(layerId, paintProperty)
            const newPropertyValue = replaceStringInNestedArray(paintPropertyValue, electionYears, year)
            map.setPaintProperty(layerId, paintProperty + '-transition', { duration: 1000 })
            map.setPaintProperty(layerId, paintProperty, newPropertyValue)

        } else {
            const paintPropertyValue = map.getLayoutProperty(layerId, paintProperty)
            const newPropertyValue = replaceStringInNestedArray(paintPropertyValue, electionYears, year)
            map.setLayoutProperty(layerId, paintProperty, newPropertyValue)
        }
    })
}

// Add CSV data layers to the map from a Google Sheet
// Modified from sheet-mapper code https://www.mapbox.com/impact-tools/sheet-mapper

function addCsvLayers(cb) {

    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEB2FGwb7ZTWqZcN11_lF6nteDX8MJdqy3zMwTmdygXhWKqvf4-Etoq3DC1jxlID6VH36Sj4jKXbON/pub?gid=1510881086&single=true&output=csv' // MI pverty rates by county

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {

            // Use Mapbox Election tilesets for US state shapes.
            // Promote the state name field to be used 
            // as the feature ID to enable data joins.
            map.addSource('us-counties', {
                type: 'vector',
                url: 'mapbox://mapbox.hist-pres-election-county',
                promoteId: 'FIPS'
            });

            // Add a new layer to visualize the CSV data using US state shapes
            map.addLayer({
                id: 'csv-fill',
                type: 'fill',
                source: 'us-counties',
                'source-layer': 'historical_pres_elections_county',
                paint: {
                    'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['feature-state', 'poverty_pct'],
                        1, '#6b6470',
                        25, '#4e1b6e'
                    ],
                    'fill-opacity': 0
                }
            }, 'state outline');

            map.addLayer({
                id: 'csv-lines',
                type: 'line',
                source: 'us-counties',
                'source-layer': 'historical_pres_elections_county',
                paint: {
                    'line-color': [
                        'interpolate',
                        ['linear'],
                        ['feature-state', 'poverty_pct'],
                        5, 'green',
                        25, 'red'
                    ],
                    'line-width': 5,
                    'line-opacity': 0
                }
            }, 'state outline');

            map.setFilter('csv-fill', [
                'match',
                ['get', 'FIPS'],
                results.data.map(county => county.fips.toString()),
                true,
                false
            ]);
            map.setFilter('csv-lines', [
                'match',
                ['get', 'FIPS'],
                results.data.map(county => county.fips.toString()),
                true,
                false
            ]);

            results.data.forEach(row => {

                map.setFeatureState({
                    source: 'us-counties',
                    sourceLayer: 'historical_pres_elections_county',
                    id: row.fips
                }, {
                    poverty_pct: parseFloat(row.poverty_pct)
                });

            });

            if (typeof cb === 'function') {
                cb();
            }

        }
    });

}

//
// Map Interactions
//

function addMapInteractions() {

    addHoverInteraction('historical-pres-elections-state', {
        "fill-opacity": [0.1, 0],
        "line-width": [1, 0]
    })
    // addHoverInteraction('historical-pres-elections-county 3d', {
    //     "fill-extrusion-opacity": [1, 0.8]
    // })

    addHoverInteraction('historical-pres-elections-county', {
        "fill-opacity": [0.6, 0.3],
        "line-width": [0.8, 0],
        popupHTML: (feature) => {
            return `<b>${feature.properties.name}</b>, ${feature.properties.state_abbrev}`
        },
        featureHTML: (feature) => {
            const winner = feature.properties[`${activeYear}_winner`];
            const demPct = feature.properties[`${activeYear}_dem_pct`];
            const repPct = feature.properties[`${activeYear}_rep_pct`];
            const othPct = feature.properties[`${activeYear}_oth_pct`];
            const population = feature.properties[`${activeYear}_pop_count`];
            const maxPopulation = Math.max(...Object.values(feature.properties).filter(value => typeof value === 'number'));
            const popCircleSize = (population / maxPopulation) * 20 + 5; // Adjust the scaling factor and minimum size as needed

            return `
            <div class="bg-slate-800 p-4 rounded-lg shadow-lg mb-2">
              <h2 class="text-lg font-bold mb-2">${feature.properties.name}, ${feature.properties.state_abbrev}</h2>
              <div class="mb-4">
                <p class="text-sm"><span class="font-bold">Population:</span> ${feature.properties[`${activeYear}_pop_count`].toLocaleString('en-US', { useGrouping: true })}</p>
                <p class="text-sm"><span class="font-bold">Total Votes:</span> ${feature.properties[`${activeYear}_total_votes`].toLocaleString('en-US', { useGrouping: true })}</p>
              </div>
              <h3 class="text-md font-bold mb-2">${activeYear} Election Results</h3>
              <div class="mb-4">
                <p class="text-sm"><span class="font-bold">Winner:</span> <span class="uppercase">${winner}</span> by ${feature.properties[`${activeYear}_mov_pct`]}% margin</p>
              </div>
              <div class="flex items-center mb-2">
                <div class="mr-2 text-blue-500">DEM</div>
                <div class="w-[${demPct}%] bg-blue-500 h-2 rounded-l-sm"></div>
                <span class="ml-2 text-sm">${demPct}%</span>
              </div>
              <div class="flex items-center mb-2">
              <div class="mr-2 text-red-500">REP</div>
                <div class="w-[${repPct}%] bg-red-500 h-2 rounded-l-sm"></div>
                <span class="ml-2 text-sm">${repPct}%</span>
              </div>
              <div class="flex items-center mb-2">
                <div class="mr-2 text-gray-500">OTH</div>
                <div class="w-[${othPct}%] bg-gray-500 h-2 rounded-l-sm"></div>
                <span class="ml-2 text-sm">${othPct}%</span>
              </div>
            </div>
          `
        }
    })

    function addHoverInteraction(layerId, options) {

        // Adjust opacity of hovered feature
        map.setPaintProperty(layerId, "fill-opacity",
            [
                "case",
                ["==", ["feature-state", "hover"], true],
                options["fill-opacity"][0],
                options["fill-opacity"][1],
            ]);

        // Create an outline layer for hovered feature
        map.addLayer({
            id: layerId + 'outline',
            type: 'line',
            source: map.getLayer(layerId).source,
            'source-layer': map.getLayer(layerId).sourceLayer,
            paint: {
                'line-opacity': 0.9,
                'line-color': 'white',
                'line-width': [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    options["line-width"][0],
                    options["line-width"][1],
                ]
            }
        });

        map.on('mousemove', layerId, (e) => {
            createPopup(e, options)
        })
        map.on('click', layerId, (e) => {
            createPopup(e, options)
        })
        map.on('mouseleave', layerId, () => {
            removePopup(layerId)
        })
    }

}

// Store state of active features
let hoverFeatureId = {};
let clickFeatureId = {};
let mapPopup = null

function createPopup(e, options) {

    map.getCanvas().style.cursor = 'pointer';

    // Find the closest feature with an ID
    const targetFeature = e.features.filter(f => f.id)[0];
    const layerId = targetFeature.layer.id;

    !(layerId in hoverFeatureId) && (hoverFeatureId.layerId = null)

    if (targetFeature) {

        // Update the state of the hovered feature if it has changed
        if (hoverFeatureId[layerId] && (hoverFeatureId[layerId] != targetFeature.id)) {
            map.setFeatureState({
                source: targetFeature.source,
                sourceLayer: targetFeature.sourceLayer,
                id: hoverFeatureId[layerId]
            }, {
                hover: false
            });
        }

        map.setFeatureState({
            source: targetFeature.source,
            sourceLayer: targetFeature.sourceLayer,
            id: targetFeature.id
        }, {
            hover: true
        });

        hoverFeatureId[layerId] = targetFeature.id;

    }

    if (mapPopup) {
        mapPopup.remove()
    }
    if ('popupHTML' in options) {

        mapPopup = new mapboxgl.Popup({ closeButton: false })
            .setLngLat(e.lngLat)
            .setHTML(options.popupHTML(targetFeature))
            .addTo(map);

        document.getElementById('feature-info').innerHTML = options.featureHTML(targetFeature)
        document.getElementById('legend').style.display = 'none';
    }
}

// When mouse exits the layers remove any layer popups and reset the hover state
function removePopup(layerId) {

    map.getCanvas().style.cursor = '';

    if (mapPopup) {
        mapPopup.remove()
    }

    document.getElementById('feature-info').innerHTML = ""
    document.getElementById('legend').style.display = 'block';

    if (hoverFeatureId[layerId]) {
        map.setFeatureState({
            source: map.getLayer(layerId).source,
            sourceLayer: map.getLayer(layerId).sourceLayer,
            id: hoverFeatureId[layerId]
        }, {
            hover: false
        });
    }

    hoverFeatureId[layerId] = null

}

// Helper functions

function replaceStringInNestedArray(arr, electionYears, dest) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // If the element is an array, recursively call the function
            arr[i] = replaceStringInNestedArray(arr[i], electionYears, dest);
        } else if (typeof arr[i] === 'string') {
            // If the element is a string, replace any occurrence of the years in electionYears with the destination string
            electionYears.forEach(year => {
                arr[i] = arr[i].replace(new RegExp(year.toString(), 'g'), dest);
            });
        }
    }
    return arr;
}