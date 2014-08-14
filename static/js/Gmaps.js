// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to
// (0,32) to correspond to the base of the flagpole.
var ACISAs;
var InfoWin;
var IlliList = [];

var TargetACISAs = [
    "5043",
    "5095",
    "6034",
    "6089",
    "5130",
    "5142",
    "5198",
    "6097",
    "5159",
    "5162",
    "6099",
    "6128",
    "6144",
    "6147",
    "6152",
    "1006",
    "2120",
    "5035",
    "5067",
    "5057",
    "1012",
    "1025",
    "1031",
    "5088",
    "1065",
    "1112",
    "1159",
    "1169",
    "2022",
    "2043",
    "3026",
    "2057",
    "2037",
    "1179",
    "6063",
    "1176",
    "6072",
    "6062",
    "6088",
    "6068",
    "1181",
    "6071",
    "1116",
    "1144",
    "6081",
    "6083",
    "6084",
    "1008",
    "1117",
    "1104",
    "1146",
    "1106",
    "1118",
    "2041",
    "5025",
    "5089",
    "2090",
    "1227",
    "1208",
    "1017",
    "2095",
    "1153",
    "6006",
    "6115",
    "1099",
    "3028",
    "2135",
    "2096",
    "2047",
    "1163",
    "1129",
    "2066",
    "5169",
    "1083",
    "1187",
    "1237",
    "2020",
    "5002",
    "2226",
    "5186",
    "4055",
    "3231",
    "2193",
    "2249",
    "1210",
    "4165",
    "4157",
    "4196",
    "3206",
    "4189",
    "4085",
    "3198",
    "3210",
    "3035",
    "3189",
    "4018",
    "4142",
    "3115",
    "3037",
    "2250",
    "3039",
    "3183",
    "3002",
    "3179",
    "3180",
    "3178",
    "4076",
    "4073",
    "3177",
    "4130",
    "4229",
    "4137",
    "3164",
    "3050",
    "3097",
    "4131",
    "4126",
    "2161",
    "4121",
    "3052",
    "4119",
    "3099",
    "2006",
    "4063",
    "3224",
    "4177",
    "3056",
    "4153",
    "4152",
    "4103",
    "4149",
    "3140",
    "4112",
    "4178",
    "3129",
    "4105",
    "4139",
    "4150"
];

var selectedACISAs = [];

function initialize() {
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(38.895465, -77.036359)
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    $.getJSON('/_add_numbers', {}, function(data) {
        ACISAs = data.result;
        setMarkers(map, ACISAs);
    });

}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */

function setMarkers(map, locations) {
    // Add markers to the map

    // Marker sizes are expressed as a Size of X,Y
    // where the origin of the image (0,0) is located
    // in the top left of the image.

    // Origins, anchor positions and coordinates of the marker
    // increase in the X direction to the right and in
    // the Y direction down.
    var image = {
        url: 'img/lilMarker.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(19, 19),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(0, 19)
    };
    // Shapes define the clickable region of the icon.
    // The type defines an HTML &lt;area&gt; element 'poly' which
    // traces out a polygon as a series of X,Y points. The final
    // coordinate closes the poly by connecting to the first
    // coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    for (var i = 0; i < locations.length; i++) {
        var ACISAs = locations[i];
        var myLatLng = new google.maps.LatLng(ACISAs[0], ACISAs[1]);
        createMarker(myLatLng, ACISAs, map, image, shape);
    }
}

function createMarker(myLatLng, ACISAs, map, image, shape) {
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        shape: shape,
        title: ACISAs[3],
        zIndex: ACISAs[2],
        Infocontent: '<h2>ACISA No. ' + ACISAs[3] + '</h2>' + '<div class="btn-group"><button id="btn_' + ACISAs[3] + '" class="btn btn-primary" type="button" onclick="pickme(' + ACISAs[3] + ');">Pick Me!</button><button id="btn_' + ACISAs[3] + '" class="btn" type="button" onclick="kickme(' + ACISAs[3] + ');">Kick Me!</button></div>'
    });

    google.maps.event.addListener(marker, 'click', function() {
        if (InfoWin) {
            InfoWin.close();
        }
        InfoWin = new google.maps.InfoWindow({
            content: marker.Infocontent
        });
        InfoWin.open(map, marker);
    });
    return marker;
}

function pickme(AciNum) {
    for (var i = 0; i < selectedACISAs.length; i++) {
        if (AciNum == selectedACISAs[i]) {
            return;
        }
    }
    selectedACISAs.push(AciNum.toString());
    document.getElementById("acisa").value = selectedACISAs.join();
}

function kickme(AciNum) {
    var index = selectedACISAs.indexOf(AciNum.toString());
    if (index > -1) {
        selectedACISAs.splice(index, 1);
    }
    document.getElementById("acisa").value = selectedACISAs.join();
}

function Check() {
    var instr = document.getElementById("acisa").value;
    if (instr == "") {
        selectedACISAs = [];
        console.log(selectedACISAs);
        return;
    }
    var tempList = instr.split(',');
    selectedACISAs = tempList;
    console.log(selectedACISAs);
}

google.maps.event.addDomListener(window, 'load', initialize);
