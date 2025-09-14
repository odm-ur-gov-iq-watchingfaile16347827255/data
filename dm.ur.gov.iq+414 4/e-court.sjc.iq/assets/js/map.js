var GoogleMapLink = "";
function GetMap(lat, lang, label, googleMaplink) {
    GoogleMapLink = googleMaplink;
    var container = L.DomUtil.get('map');
    // to skip error of the map container already intiliazed
    if (container != null) {
        container._leaflet_id = null;
    }
    var map = new L.map('map').setView([lat, lang], 13);
      // to remove the ukreina flag and all attribution
    map.removeControl(map.attributionControl);

    var marker = new L.marker([lat, lang]).on('click', markerOnClick).addTo(map);
    marker.bindTooltip(label, { permanent: true, offset: [0, 12] });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
}
function markerOnClick(e) {
 
    Swal.fire({
        title: 'عرض الموقع على خرائط كوكل؟',
        
        showCancelButton: true,
        confirmButtonText: 'تأكيد',
        cancelButtonText: 'إلغاء',
    }).then((result) => {
       
        if (result.isConfirmed) {
            window.open(GoogleMapLink);

        } else if (result.isDenied) {
           
        }
    })
   
}
