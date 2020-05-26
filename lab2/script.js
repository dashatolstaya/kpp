// load page
window.addEventListener("load", () => {
    // check if we have location
    if (navigator.geolocation) {
        // get position
        navigator.geolocation.getCurrentPosition(position => {
            // set coords
            let lng = position.coords.longitude;
            let lat = position.coords.latitude;

            let url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&cnt=10&appid=1b5ee5a1a74d624a74750350327ea372`;
            let token = 'pk.eyJ1IjoibWlzaGEtcnVzbmFjaGVua28iLCJhIjoiY2thbjFodWJwMTVyMDJ5bzY1cjBwa3lzYSJ9.-vZb5hKsJGcL_ttvZo387A';

            // get data from openweathermap
            fetch(url)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // init map 
                    mapboxgl.accessToken = token;
                    let map = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: [lng, lat],
                        zoom: 9
                    });

                    // formated markers data
                    let geojson = convertData(data)
                         
                    geojson.forEach((marker) => {
                        // create html element
                        let el = document.createElement('div');
                        el.className = 'marker';
                        el.style.backgroundImage = `url(${marker.icon})`;
                        
                        // added markers to map
                        new mapboxgl.Marker(el)
                            .setLngLat(marker.coordinates)
                            .addTo(map);
                    });
                })
        })
    }
})

const convertData = data => {
    return (
        data.list.map(item => {
            return {
                'coordinates': [item.coord.lon, item.coord.lat],
                'icon': `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
            }
        })
    )
}