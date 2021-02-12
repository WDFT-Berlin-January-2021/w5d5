### Add index.html and mapbox.js

### Add links to mapbox js and css from here https://docs.mapbox.com/mapbox-gl-js/api/and your own script to the end  of the body

### And then also add a div with id map

```html
   <h1>mapbox</h1> 
   <div id="map" style="width: 100vw; height: 100vh"></div>
   <script src="mapbox.js"></script>
```

## Display a map 

### Copy this part from the docs 
```js
// add your access token
mapboxgl.accessToken = 'pk.eyJ1Ijoiam5yZG1ubiIsImEiOiJja2wxN3VtY28zaDdlMm5xbjV5Znh0YnBpIn0.s0Cz8vhJe3T1N2wvocwFzw'

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/jnrdmnn/ckl1aoosu0afb17r27yya1ti5', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
```

### Go to Account and then to Start by designing a map

### Customize one and then click on Share on top right, copy the style url and paste in into the style key abov 

### You can also find themes for maps online (like the treasure map)

### Make Berlin 🐻 the center of the map  
```js
    // 
    center: [13.405, 52.52], // starting position [lng, lat]
```

### Show what happens if you change zoom to zero 

### Add doubleClickZoom
```js
    // 
    zoom: 9, // starting zoom
    doubleClickZoom: true
```

### Add pitch to change the angle of the map
```js
    // 
    zoom: 9, // starting zoom
    doubleClickZoom: true,
    pitch: 100
```

### Go to 'markers and controls' in the docs - https://docs.mapbox.com/mapbox-gl-js/api/markers/

### On the right go to 'Navigation control' - https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol

### Copy paste this example 
```js
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
```

### Go to the popup section on the right - https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup

### Then add this popup to the map 
```js
// 
const popup = new mapboxgl.Popup({
    closeButton: true
});
popup.setLngLat([13.405, 52.52])
    .setHTML('<h1>Hello World</h1>')
    .setMaxWidth('400px')
    .addTo(map)
```

## Set a marker using these coordinates 
```js
let coords = [
    [13.405, 52.52],
    [13.6, 52.6]
]
```

### Add a basic marker - pasted from the docs example from 'Markers' - the coordinates are replaced for the center coordinates
```js
const marker = new mapboxgl.Marker()
    .setLngLat([13.405, 52.52])
    .addTo(map);
```

### Now we wanna add some options 
```js
const marker = new mapboxgl.Marker(
    {
        scale: 1,
        draggable: true,
        color: 'red',
    }
)
    .setLngLat([13.405, 52.52])
    .addTo(map);
```

### We can iterate over the coords and draw a marker for each 
```js
coords.forEach(coord => {
    new mapboxgl.Marker(
        {
            scale: 1,
            draggable: true,
            color: 'red',
        }
    )
        .setLngLat(coord)
        .addTo(map);
})
```

### Now we wanna drag a marker
```js
// in the marker 
.addTo(map)
        .on('dragend', (data) => {
            console.log(data);
            // data.target.getLngLat()
        })
```

### To add a marker on click: 
```js
const addMarker = (e) => {
    console.log(e.lngLat);
    const marker = new mapboxgl.Marker(
        {
            scale: 1,
            draggable: true,
            color: 'red',
        }
    )
        .setLngLat(e.lngLat)
        .addTo(map);
}

map.on('click', addMarker)
```