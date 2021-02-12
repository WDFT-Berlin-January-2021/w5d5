mapboxgl.accessToken = ''

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [13.405, 52.52], // starting position [lng, lat]
    zoom: 9, // starting zoom
    doubleClickZoom: true,
    // pitch: 100
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// setting a popup
// const popup = new mapboxgl.Popup({
//     closeButton: true
// })
// popup.setLngLat([13.405, 52.52])
//     .setHTML('<h1>Hello mapbox</h1>')
//     .setMaxWidth('400px')
//     .addTo(map)

let coords = [
    [13.405, 52.52],
    [13.6, 52.6]
]

coords.forEach(coord => {
    new mapboxgl.Marker({
        scale: 1,
        color: 'red',
        draggable: true
    })
        .setLngLat(coord)
        .addTo(map)
        .on('dragend', (data) => {
            console.log(data);
        })
})

const addMarker = (event) => {
    console.log(event.lngLat);
    new mapboxgl.Marker({
        scale: 1,
        color: 'red',
    })
        .setLngLat(event.lngLat)
        .addTo(map)
}

map.on('click', addMarker)

// const marker = new mapboxgl.Marker({
//     scale: 1,
//     color: 'red'
// }).setLngLat([13.405, 52.52])
//     .addTo(map)