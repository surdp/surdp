(() => {
  "use strict";

  const p = (name, mapQuery, note, mapAlternatives) => ({
    name: name,
    mapQuery: mapQuery === undefined ? name : mapQuery,
    note: note || "",
    mapAlternatives: mapAlternatives || null
  });

  const trips = [
    {
      id: 1, title: "Shravanabelagola, Srirangapatna & Mysuru Loop", region: "Karnataka",
      overview: "A heritage and city circuit including Mysuru Zoo, Chamundi Betta and KRS Dam.",
      stops: [
        p("Bengaluru, Karnataka"), p("Shravanabelagola, Karnataka"),
        p("Srirangapatna, Karnataka"), p("Mysuru Zoo", "Mysuru Zoo, Mysuru, Karnataka"),
        p("Chamundi Betta", "Chamundi Hill, Mysuru, Karnataka"),
        p("KRS Dam", "Krishna Raja Sagara Dam, Karnataka"), p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 2, title: "Hampi, Badami, Aihole & Vijayapura Heritage Circuit", region: "Karnataka",
      overview: "A long heritage trip through Tungabhadra Dam, Hampi's temples and ruins, Badami, Aihole, Pattadakal, Mahakuta, Kudalasangama and Vijayapura.",
      stops: [
        p("Bengaluru, Karnataka"), p("Tungabhadra Dam, Hosapete", "Tungabhadra Dam, Hosapete, Karnataka"),
        p("Virupaksha Temple, Hampi", "Virupaksha Temple, Hampi, Karnataka"),
        p("Hemakuta Hill, Hampi", "Hemakuta Hill, Hampi, Karnataka"),
        p("Sasivekalu Ganesha, Hampi", "Sasivekalu Ganesha, Hampi, Karnataka"),
        p("Kadalekalu Ganesha, Hampi", "Kadalekalu Ganesha, Hampi, Karnataka"),
        p("Musical Fountain, Hampi", "Musical Fountain, Hampi, Karnataka"),
        p("Vijaya Vittala Temple / Stone Chariot", "Vijaya Vittala Temple, Hampi, Karnataka"),
        p("Royal Enclosure, Hampi", "Royal Enclosure, Hampi, Karnataka"),
        p("Lotus Mahal, Hampi", "Lotus Mahal, Hampi, Karnataka"),
        p("Elephant Stables, Hampi", "Elephant Stables, Hampi, Karnataka"),
        p("Matanga Hill, Hampi", "Matanga Hill, Hampi, Karnataka"),
        p("Banashankari Temple", "Banashankari Amma Temple, Badami, Karnataka"),
        p("Badami Cave Temples", "Badami Cave Temples, Karnataka"),
        p("Badami Fort", "Badami Fort, Karnataka"),
        p("Badami Shivalayas", "Shivalaya Temples, Badami, Karnataka"),
        p("Aihole temples", "Aihole, Karnataka"),
        p("Pattadakal temples", "Pattadakal Group of Monuments, Karnataka"),
        p("Mahakuta hot water springs", "Mahakuta Group of Temples, Karnataka"),
        p("Kudalasangama Temple", "Kudala Sangama, Karnataka"),
        p("Shiva Giri, Vijayapura", "Shiva Giri, Vijayapura, Karnataka"),
        p("Gol Gumbaz, Vijayapura", "Gol Gumbaz, Vijayapura, Karnataka"),
        p("Ibrahim Rauza, Vijayapura", "Ibrahim Rauza, Vijayapura, Karnataka"),
        p("Jamia Masjid, Vijayapura", "Jama Masjid, Vijayapura, Karnataka")
      ]
    },
    {
      id: 3, title: "Sakleshpur, Charmadi Ghat & Temple Circuit", region: "Karnataka",
      overview: "A Western Ghats ride linking Charmadi Ghat, Dharmasthala, Sowthadka, Kukke Subramanya, Belur and Halebidu.",
      stops: [
        p("Bengaluru, Karnataka"), p("Sakleshpur, Karnataka"), p("Charmadi Ghat, Karnataka"),
        p("Dharmasthala, Karnataka"), p("Sowthadka Shri Mahaganapathi Temple", "Sowthadka Shri Mahaganapathi Temple, Karnataka"),
        p("Kukke Subramanya Temple", "Kukke Subramanya Temple, Karnataka"),
        p("Belur, Karnataka"), p("Halebidu, Karnataka"), p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 4, title: "Jog Falls & Sagara", region: "Karnataka",
      overview: "A short trip from Shivamogga to Jog Falls and Sagara.",
      stops: [p("Shivamogga, Karnataka"), p("Jog Falls, Karnataka"), p("Sagara, Karnataka")]
    },
    {
      id: 5, title: "Gajanur, Thirthahalli & Forts Loop", region: "Karnataka",
      overview: "A local circuit via Gajanur Dam, Mandagadde, Thirthahalli, Kavaledurga Fort, Nagara Fort and Kuppali.",
      stops: [
        p("Shivamogga, Karnataka"), p("Gajanur Dam, Karnataka"),
        p("Mandagadde, Karnataka"), p("Thirthahalli, Karnataka"),
        p("Kavaledurga Fort, Karnataka"), p("Nagara Fort, Karnataka"),
        p("Kuppali, Karnataka"), p("Shivamogga, Karnataka")
      ]
    },
    {
      id: 6, title: "Bhadravathi Industrial & Sunset Circuit", region: "Karnataka",
      overview: "A local route taking in Gondi Sunset Point, BRP, MPM Mill, the sugar factory and VISL factory.",
      stops: [
        p("Bhadravathi, Karnataka"), p("Gondi Sunset Point, Karnataka"),
        p("Bhadra Reservoir Project (BRP)", "Bhadra Dam, Karnataka"),
        p("MPM Mill", "Mysore Paper Mills, Bhadravathi, Karnataka"),
        p("Sugar Factory, Bhadravathi", "Sugar Factory, Bhadravathi, Karnataka"),
        p("VISL Factory", "Visvesvaraya Iron and Steel Plant, Bhadravathi, Karnataka"),
        p("Bhadravathi, Karnataka")
      ]
    },
    {
      id: 7, title: "Sringeri, Hariharapura & Horanadu", region: "Karnataka",
      overview: "A Western Ghats and temple trip through Sringeri, Shatakopura, Hariharapura and Horanadu.",
      stops: [
        p("Shivamogga, Karnataka"), p("Sringeri, Karnataka"),
        p("Shatakopura, Karnataka"), p("Hariharapura, Karnataka"),
        p("Horanadu, Karnataka"), p("Shivamogga, Karnataka")
      ]
    },
    {
      id: 8, title: "Mangaluru, Udupi & Coastal Beaches", region: "Coastal Karnataka",
      overview: "A coastal route with NITK Surathkal, a sunset beach alternative, Ideal Ice Cream, Udupi Temple, Malpe, St. Mary's Island and Kapu Beach.",
      stops: [
        p("Bengaluru, Karnataka"), p("Mangaluru, Karnataka"),
        p("NITK Surathkal Beach", "NITK Beach, Surathkal, Karnataka"),
        p("Tannirbhavi Beach or Panambur Beach", null, "You listed these as alternatives for sunset. Choose either route below.",
          [{name:"Tannirbhavi Beach", query:"Tannirbhavi Beach, Mangaluru, Karnataka"},
           {name:"Panambur Beach", query:"Panambur Beach, Mangaluru, Karnataka"}]),
        p("Ideal Ice Cream (Pabba's)", "Ideal Ice Cream, Pabba's, Mangaluru, Karnataka"),
        p("Udupi Sri Krishna Temple", "Sri Krishna Matha, Udupi, Karnataka"),
        p("Malpe Beach, Karnataka"), p("St. Mary's Island", "St. Mary's Island, Malpe, Karnataka"),
        p("Kapu Beach", "Kapu Beach, Udupi, Karnataka"), p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 9, title: "Hubballi, Dharwad & Dandeli", region: "Karnataka",
      overview: "A trip through Hubballi and Dharwad to Dandeli for river rafting and water sports, returning via Dharwad and Hubballi.",
      stops: [
        p("Shivamogga, Karnataka"), p("Hubballi, Karnataka"), p("Dharwad, Karnataka"),
        p("Dandeli — river rafting & water sports", "Dandeli, Karnataka",
          "You mentioned other Dandeli places too, but did not list each one individually."),
        p("Dharwad University", "Karnatak University, Dharwad, Karnataka"),
        p("Hubballi Museum", "Museum, Hubballi, Karnataka"), p("Shivamogga, Karnataka")
      ]
    },
    {
      id: 10, title: "Mani's Hoskote Biryani & Avalabetta", region: "Karnataka",
      overview: "A food and hilltop outing via Mani's Hoskote Biryani, Avalabetta and Kolar.",
      stops: [
        p("Bengaluru, Karnataka"), p("Mani's Hoskote Biryani", "Mani's Dum Biryani, Hoskote, Karnataka"),
        p("Avalabetta, Karnataka"), p("Kolar, Karnataka"), p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 11, title: "Tamil Nadu, Kanyakumari & Kerala Coast", region: "South India",
      overview: "A multi-state road trip through Madurai, Rameswaram, Dhanushkodi, Kanyakumari, Thiruvananthapuram, Varkala, Alappuzha, Kochi, Thrissur, Palakkad and Coimbatore.",
      stops: [
        p("Bengaluru, Karnataka"), p("Salem, Tamil Nadu"), p("Madurai Temple", "Meenakshi Amman Temple, Madurai, Tamil Nadu"),
        p("Rameswaram Temple", "Ramanathaswamy Temple, Rameswaram, Tamil Nadu"),
        p("Floating stones / beach / bridge", "Pamban Bridge, Rameswaram, Tamil Nadu",
          "The exact floating-stone stop was not specified; this map leg uses Pamban Bridge as the named bridge stop."),
        p("Dhanushkodi, Tamil Nadu"), p("Kanyakumari", "Kanyakumari, Tamil Nadu"),
        p("Vivekananda Rock Memorial", "Vivekananda Rock Memorial, Kanyakumari, Tamil Nadu"),
        p("Kanyakumari temples", "Kumari Amman Temple, Kanyakumari, Tamil Nadu"),
        p("Thiruvananthapuram temples / airport", "Thiruvananthapuram, Kerala",
          "You mentioned a temple, Shiva temple and airport; individual temple names were not supplied."),
        p("Varkala North Cliff", "North Cliff, Varkala, Kerala"),
        p("Mangrove forest / water sports", "Mangrove forest, Varkala, Kerala"),
        p("Alappuzha houseboat stay", "Alappuzha, Kerala"),
        p("Alappuzha speedboat rides", "Alappuzha Boat Jetty, Kerala"),
        p("Kochi port / harbour", "Kochi Port, Kerala"), p("Thrissur, Kerala"),
        p("Palakkad, Kerala"), p("Coimbatore, Tamil Nadu"), p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 12, title: "Coimbatore & Adiyogi", region: "Tamil Nadu",
      overview: "A return trip to Coimbatore, Adiyogi and the museum you noted as GDP Museum.",
      stops: [
        p("Bengaluru, Karnataka"), p("Coimbatore, Tamil Nadu"),
        p("Adiyogi", "Adiyogi Shiva Statue, Coimbatore, Tamil Nadu"),
        p("GDP Museum (name as provided)", "GDP Museum, Coimbatore, Tamil Nadu",
          "The museum name may need correction; kept as you supplied it."), p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 13, title: "Hyderabad City Trip", region: "Telangana",
      overview: "A city trip through Charminar, a bridge, HITEC City and other Hyderabad places.",
      stops: [
        p("Bengaluru, Karnataka"), p("Charminar, Hyderabad", "Charminar, Hyderabad, Telangana"),
        p("Bridge in Hyderabad (name not specified)", null,
          "You mentioned a bridge but not its name, so it is left out of the plotted map links."),
        p("HITEC City, Hyderabad", "HITEC City, Hyderabad, Telangana"),
        p("Other Hyderabad places", null, "Additional places were visited but not listed by name."),
        p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 14, title: "Mallappakonda & Kotilingeshwara", region: "Karnataka",
      overview: "A day trip via Mallappakonda and Kotilingeshwara Temple near Kolar.",
      stops: [
        p("Bengaluru, Karnataka"), p("Mallappakonda, Karnataka"),
        p("Kotilingeshwara Temple", "Kotilingeshwara Temple, Kolar, Karnataka"),
        p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 15, title: "Sakleshpur, Kukke Subramanya & Sowthadka", region: "Karnataka",
      overview: "A temple and trek trip via Sakleshpur, Kukke Subramanya and Sowthadka Ganapathi Temple.",
      stops: [
        p("Bengaluru, Karnataka"), p("Sakleshpur, Karnataka"),
        p("Kukke Subramanya Temple and trek", "Kukke Subramanya Temple, Karnataka"),
        p("Sowthadka Ganapathi Temple", "Sowthadka Shri Mahaganapathi Temple, Karnataka"),
        p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 16, title: "Tiruchirappalli, Pondicherry & Arunachaleswarar", region: "Tamil Nadu & Puducherry",
      overview: "A temple and coastal route covering Antya Ranga, the Earth Shiva Temple, Pondicherry beaches and pubs, Arunachaleswarar Temple and the Girivalam path.",
      stops: [
        p("Bengaluru, Karnataka"), p("Antya Ranga, Tiruchirappalli", "Srirangam Ranganathaswamy Temple, Tiruchirappalli, Tamil Nadu",
          "Mapped to Srirangam for the route; your notes call this Antya Ranga."),
        p("Earth Shiva Temple (name not specified)", null,
          "The exact temple was not identified in your list, so it is shown in the itinerary but not as a map waypoint."),
        p("Pondicherry beaches and pubs", "Puducherry, India"),
        p("Arunachaleswarar Temple", "Arunachaleswarar Temple, Tiruvannamalai, Tamil Nadu"),
        p("Girivalam Path", "Girivalam Path, Tiruvannamalai, Tamil Nadu"),
        p("Bengaluru, Karnataka")
      ]
    },
    {
      id: 17, title: "Tirupati & Tirumala", region: "Andhra Pradesh",
      overview: "A pilgrimage trip covering Tirupati, the Tirumala temple and other Tirumala places, plus Sri Govindaraja Swamy Temple.",
      stops: [
        p("Bengaluru, Karnataka"), p("Tirupati, Andhra Pradesh"),
        p("Tirumala Temple", "Sri Venkateswara Swamy Temple, Tirumala, Andhra Pradesh"),
        p("Other places in Tirumala", null,
          "You noted that you visited all the other Tirumala places, but did not name each one individually."),
        p("Sri Govindaraja Swamy Temple", "Sri Govindaraja Swamy Temple, Tirupati, Andhra Pradesh"),
        p("Bengaluru, Karnataka")
      ]
    }
  ];

  const container = document.getElementById("tripItineraryGrid");
  if (!container) return;
  const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));

  function displayStopName(stop) {
    let name = String(stop && stop.name || "").trim();
    name = name.replace(/\s*\(name as provided\)/ig, "");
    name = name.replace(/\s*\(name not specified\)/ig, "");
    if (/floating stones/i.test(name) && /Pamban Bridge/i.test(String(stop.mapQuery || ""))) name = "Pamban Bridge";
    return name.trim();
  }

  function isHiddenPlaceholder(stop) {
    const name = String(stop && stop.name || "");
    return /name not specified|other Hyderabad places|other places in Tirumala|unnamed stop|bridge in Hyderabad/i.test(name);
  }

  function mappedStops(stops) {
    return stops.filter(stop => stop && stop.mapQuery && String(stop.mapQuery).trim() && !isHiddenPlaceholder(stop));
  }

  function splitIntoMapLegs(stops) {
    const points = mappedStops(stops);
    const legs = [];
    let start = 0;
    while (start < points.length - 1) {
      const end = Math.min(start + 4, points.length - 1);
      const part = points.slice(start, end + 1);
      if (part.length > 1) legs.push(part);
      start = end;
    }
    return legs;
  }

  function directionsUrl(leg) {
    const params = new URLSearchParams();
    params.set("api", "1");
    params.set("origin", leg[0].mapQuery);
    params.set("destination", leg[leg.length - 1].mapQuery);
    if (leg.length > 2) params.set("waypoints", leg.slice(1, -1).map(stop => stop.mapQuery).join("|"));
    params.set("travelmode", "driving");
    return "https://www.google.com/maps/dir/?" + params.toString();
  }

  function mapOptions(trip) {
    const altIndex = trip.stops.findIndex(stop => Array.isArray(stop.mapAlternatives) && stop.mapAlternatives.length);
    if (altIndex < 0) return [{label:"", stops:trip.stops}];
    const original = trip.stops[altIndex];
    return original.mapAlternatives.map(alt => ({
      label: alt.name,
      stops: trip.stops.map((stop, index) => index === altIndex
        ? Object.assign({}, stop, {mapQuery:alt.query}) : stop)
    }));
  }

  function renderMapLinks(trip) {
    const variants = mapOptions(trip);
    let links = "";
    variants.forEach(variant => {
      const legs = splitIntoMapLegs(variant.stops);
      if (!legs.length) return;
      if (variants.length > 1) {
        links += '<p class="trip-map-option">Sunset stop: ' + esc(variant.label) + '</p>';
      }
      links += '<div class="trip-map-links">';
      legs.forEach((leg, index) => {
        const first = leg[0].name;
        const last = leg[leg.length - 1].name;
        links += '<a class="trip-map-link" href="' + esc(directionsUrl(leg)) +
          '" target="_blank" rel="noopener noreferrer"><span class="trip-map-icon" aria-hidden="true">↗</span><span><b>Map leg ' +
          (index + 1) + '</b><small>' + esc(first) + ' → ' + esc(last) + '</small></span></a>';
      });
      links += '</div>';
    });
    return links || '<p class="trip-map-note">A mapped route is not available for the unnamed stops yet.</p>';
  }


  // Approximate coordinates are used for the illustrated poster layout only.
  // Each Google Maps button below remains the way to open navigable directions.
  const geoHints = [
    [/bengaluru|bangalore/i, 12.9716, 77.5946],
    [/shravanabelagola/i, 12.8577, 76.4883],
    [/srirangapatna/i, 12.4227, 76.6844],
    [/mysuru zoo|mysore zoo/i, 12.3023, 76.6551],
    [/chamundi/i, 12.2721, 76.6700],
    [/krishna raja sagara|krs dam/i, 12.4210, 76.5730],
    [/tungabhadra dam/i, 15.2605, 76.3468],
    [/hosapete|hospete/i, 15.2695, 76.3871],
    [/virupaksha/i, 15.3350, 76.4600],
    [/hemakuta/i, 15.3311, 76.4634],
    [/sasivekalu/i, 15.3317, 76.4643],
    [/kadalekalu/i, 15.3355, 76.4621],
    [/musical fountain/i, 15.3337, 76.4605],
    [/vijaya vittala|stone chariot/i, 15.3478, 76.4773],
    [/royal enclosure/i, 15.3162, 76.4710],
    [/lotus mahal/i, 15.3192, 76.4706],
    [/elephant stables/i, 15.3206, 76.4709],
    [/matanga hill/i, 15.3314, 76.4720],
    [/banashankari/i, 15.9150, 75.6820],
    [/badami cave|badami fort|shivalaya|badami/i, 15.9186, 75.6840],
    [/aihole/i, 16.0140, 75.8790],
    [/pattadakal/i, 15.9490, 75.8170],
    [/mahakuta/i, 15.9100, 75.7300],
    [/kudala sangama|kudalasangama/i, 16.5100, 75.9100],
    [/shiva giri/i, 16.8300, 75.7300],
    [/gol gumbaz|golgumbaz/i, 16.8300, 75.7300],
    [/ibrahim rauza/i, 16.8300, 75.7400],
    [/jamia masjid|jama masjid/i, 16.8300, 75.7200],
    [/sakleshpur|shakleshpur|shakaleshpur/i, 12.9410, 75.7860],
    [/charmadi ghat/i, 13.1000, 75.5500],
    [/dharmasthala/i, 12.9500, 75.3800],
    [/sowthadka|swathadaka/i, 12.9300, 75.4400],
    [/kukke subramanya/i, 12.6640, 75.6140],
    [/belur/i, 13.1620, 75.8670],
    [/halebidu/i, 13.2120, 75.9940],
    [/jog falls/i, 14.2300, 74.8100],
    [/sagara/i, 14.1700, 75.0300],
    [/gajanur dam/i, 13.9400, 75.5700],
    [/mandagadde/i, 13.6800, 75.2400],
    [/thirthahalli|tirthahalli/i, 13.6900, 75.2400],
    [/kavaledurga/i, 13.6600, 74.9700],
    [/nagara fort|nagara, karnataka/i, 13.8000, 74.9000],
    [/kuppali/i, 13.6900, 75.0400],
    [/bhadravathi|bhadravati|visvesvaraya|visl|sugar factory|mpm mill|mysore paper/i, 13.8400, 75.7000],
    [/gondi sunset/i, 13.8500, 75.6500],
    [/bhadra dam|bhadra reservoir|brp/i, 13.7200, 75.6500],
    [/shivamogga|shimoga/i, 13.9299, 75.5681],
    [/sringeri/i, 13.4200, 75.2500],
    [/shatakopura|shatakpura/i, 13.4000, 75.2300],
    [/hariharapura/i, 13.3900, 75.2200],
    [/horanadu|hornadu/i, 13.1300, 75.3400],
    [/nitk|surathkal/i, 13.0100, 74.7940],
    [/tannirbhavi/i, 12.8800, 74.8300],
    [/panambur/i, 12.9440, 74.8000],
    [/ideal ice cream|pabba/i, 12.8750, 74.8400],
    [/mangaluru|mangalore/i, 12.8700, 74.8800],
    [/udupi|krishna matha/i, 13.3410, 74.7420],
    [/st mary/i, 13.3800, 74.6800],
    [/malpe/i, 13.3600, 74.7000],
    [/kapu beach|kaup/i, 13.2300, 74.7300],
    [/hubballi|hubli|museum, hubballi/i, 15.3647, 75.1240],
    [/dharwad|karnatak university/i, 15.4600, 75.0100],
    [/dandeli/i, 15.2470, 74.6290],
    [/hoskote/i, 13.0700, 77.8000],
    [/avalabetta/i, 13.6200, 78.0800],
    [/kolar|kotilingeshwara/i, 13.1360, 78.1290],
    [/mallappakonda|mallapakonda/i, 13.4400, 78.0200],
    [/salem/i, 11.6643, 78.1460],
    [/madurai|meenakshi/i, 9.9195, 78.1193],
    [/pamban|rameswaram|ramanathaswamy/i, 9.2880, 79.3120],
    [/dhanushkodi/i, 9.1900, 79.3900],
    [/vivekananda rock/i, 8.0780, 77.5500],
    [/kanyakumari|kumari amman/i, 8.0883, 77.5385],
    [/thiruvananthapuram|trivandrum/i, 8.5241, 76.9366],
    [/varkala|mangrove/i, 8.7360, 76.7160],
    [/alappuzha|alleppey|speedboat/i, 9.4981, 76.3388],
    [/kochi|cochin|port, kerala/i, 9.9700, 76.2800],
    [/thrissur|tissuru/i, 10.5276, 76.2144],
    [/palakkad|palakkadu/i, 10.7867, 76.6548],
    [/coimbatore/i, 11.0168, 76.9558],
    [/adiyogi/i, 10.9940, 76.7360],
    [/gdp museum/i, 11.0100, 76.9600],
    [/charminar/i, 17.3616, 78.4747],
    [/hitec city|hyderabad/i, 17.4435, 78.3772],
    [/puducherry|pondicherry/i, 11.9416, 79.8083],
    [/tiruchirappalli|srirangam|antya ranga/i, 10.8620, 78.6920],
    [/arunachaleswarar|girivalam|tiruvannamalai/i, 12.2310, 79.0670],
    [/tirumala/i, 13.6830, 79.3500],
    [/tirupati|govindaraja/i, 13.6320, 79.4190],
    [/earth shiva temple/i, 10.8620, 78.6920]
  ];

  function getCoordinates(stop) {
    const text = (String(stop.name || "") + " " + String(stop.mapQuery || "")).toLowerCase();
    const hit = geoHints.find(entry => entry[0].test(text));
    return hit ? {lat: hit[1], lng: hit[2]} : null;
  }

  const mapInstances = new Map();
  const roadRouteQueue = [];
  let routeQueueRunning = false;
  let lastRouteRequestAt = 0;
  let mapObserver = null;

  function tripMapPoints(trip) {
    return mappedStops(trip.stops).map((stop, index) => {
      const coordinates = getCoordinates(stop);
      if (!coordinates) return null;
      return { stop: stop, index: index, lat: coordinates.lat, lng: coordinates.lng };
    }).filter(Boolean);
  }

  function renderLiveMap(trip) {
    return '<div class="trip-map-shell">' +
      '<div class="trip-live-map" id="trip-map-' + trip.id + '" data-trip-map="' + trip.id +
      '" role="region" aria-label="Interactive road map for Trip ' + String(trip.id).padStart(2, "0") +
      ': ' + esc(trip.title) + '">' +
      '<div class="trip-map-loading"><span class="trip-map-spinner" aria-hidden="true"></span>Loading street map…</div></div>' +
      '<div class="trip-map-attribution-note" id="trip-map-note-' + trip.id +
      '">Street map by OpenStreetMap · Google Maps for turn-by-turn directions</div></div>';
  }

  function renderTripMapError(element, message) {
    if (!element) return;
    element.innerHTML = '<div class="trip-map-error"><b>Map unavailable</b><span>' +
      esc(message || "Use the Google Maps directions below.") + '</span></div>';
  }

  function mapMarkerIcon(number) {
    return L.divIcon({
      className: "trip-leaflet-marker-wrap",
      html: '<span class="trip-leaflet-marker"><span>' + number + '</span></span>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -13]
    });
  }

  function queueRoadRoute(map, trip, points, fallbackLine, note) {
    const distinctPoints = points.filter((point, index, array) =>
      index === 0 || Math.abs(point.lat - array[index - 1].lat) > 0.00005 ||
      Math.abs(point.lng - array[index - 1].lng) > 0.00005
    );
    if (distinctPoints.length < 2) {
      if (note) note.textContent = "Not enough mapped stops for a road route. Google Maps directions are below.";
      return;
    }
    roadRouteQueue.push({map, trip, points: distinctPoints, fallbackLine, note});
    processRoadRouteQueue();
  }

  async function processRoadRouteQueue() {
    if (routeQueueRunning) return;
    routeQueueRunning = true;
    while (roadRouteQueue.length) {
      const job = roadRouteQueue.shift();
      const wait = Math.max(0, 1200 - (Date.now() - lastRouteRequestAt));
      if (wait) await new Promise(resolve => setTimeout(resolve, wait));
      lastRouteRequestAt = Date.now();

      if (!job.map || !job.map.getContainer().isConnected) continue;
      try {
        const coordinates = job.points.map(point => point.lng + "," + point.lat).join(";");
        const url = "https://router.project-osrm.org/route/v1/driving/" + coordinates +
          "?overview=full&geometries=geojson&steps=false";
        const response = await fetch(url, {headers: {"Accept":"application/json"}});
        if (!response.ok) throw new Error("Routing service returned " + response.status);
        const data = await response.json();
        const route = data && data.routes && data.routes[0] && data.routes[0].geometry;
        if (!route || !route.coordinates || route.coordinates.length < 2) {
          throw new Error("No road route returned");
        }
        if (!job.map.getContainer().isConnected) continue;
        if (job.fallbackLine) job.map.removeLayer(job.fallbackLine);
        L.geoJSON(route, {
          style: {color:"#ffffff", weight:8, opacity:0.92, lineCap:"round", lineJoin:"round"}
        }).addTo(job.map);
        L.geoJSON(route, {
          style: {color:"#287be8", weight:5, opacity:0.98, lineCap:"round", lineJoin:"round"}
        }).addTo(job.map);
        if (job.note) job.note.textContent = "Road route via OSRM · marker positions are estimates; verify in Google Maps.";
      } catch (error) {
        if (job.note) job.note.textContent = "Approximate route line shown; use Google Maps directions below for navigation.";
      }
    }
    routeQueueRunning = false;
  }

  function initializeTripMap(element, trip) {
    if (!element || element.dataset.mapState) return;
    element.dataset.mapState = "loading";
    if (!window.L || typeof window.L.map !== "function") {
      element.dataset.mapState = "error";
      renderTripMapError(element, "The map library did not load. Open Google Maps directions below.");
      return;
    }
    const points = tripMapPoints(trip);
    if (points.length < 2) {
      element.dataset.mapState = "error";
      renderTripMapError(element, "Not enough named coordinates to draw a map. Use the listed route links.");
      return;
    }

    element.innerHTML = "";
    const map = L.map(element, {
      scrollWheelZoom: false,
      zoomControl: true,
      preferCanvas: true
    });
    mapInstances.set(trip.id, map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const bounds = L.latLngBounds(points.map(point => [point.lat, point.lng]));
    map.fitBounds(bounds, {padding:[22,22], maxZoom:9});

    points.forEach(point => {
      const marker = L.marker([point.lat, point.lng], {icon:mapMarkerIcon(point.index + 1)}).addTo(map);
      marker.bindPopup('<div class="trip-map-popup"><b>Stop ' + (point.index + 1) + '</b><br>' +
        esc(point.stop.name) + (point.stop.note ? '<br><small>' + esc(point.stop.note) + '</small>' : '') + '</div>');
      marker.bindTooltip(String(point.index + 1) + ". " + esc(point.stop.name), {direction:"top", opacity:0.95});
    });

    const fallbackLine = L.polyline(points.map(point => [point.lat, point.lng]), {
      color: "#287be8", weight: 4, opacity: 0.82, dashArray: "8 7", lineCap: "round"
    }).addTo(map);
    const note = document.getElementById("trip-map-note-" + trip.id);
    if (note) note.textContent = "Loading road route…";
    element.dataset.mapState = "ready";
    queueRoadRoute(map, trip, points, fallbackLine, note);
    setTimeout(() => map.invalidateSize(), 60);
  }

  function disposeTripMaps() {
    if (mapObserver) mapObserver.disconnect();
    mapInstances.forEach(map => {
      try { map.remove(); } catch (_) {}
    });
    mapInstances.clear();
    roadRouteQueue.length = 0;
  }

  function observeTripMaps() {
    if (mapObserver) mapObserver.disconnect();
    const elements = Array.from(container.querySelectorAll("[data-trip-map]"));
    if ("IntersectionObserver" in window) {
      mapObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          const trip = trips.find(item => String(item.id) === element.dataset.tripMap);
          if (trip) initializeTripMap(element, trip);
          mapObserver.unobserve(element);
        });
      }, {rootMargin:"220px 0px"});
      elements.forEach(element => {
        if (!element.dataset.mapState) mapObserver.observe(element);
      });
    } else {
      elements.forEach(element => {
        const trip = trips.find(item => String(item.id) === element.dataset.tripMap);
        if (trip) initializeTripMap(element, trip);
      });
    }
  }

  const tabs = document.getElementById("tripItineraryTabs");
  const detailPanel = document.getElementById("tripSelectedDetail");
  if (!tabs || !detailPanel) return;
  let activeTripId = trips[0] ? trips[0].id : null;
  const photoResultsCache = new Map();

  function visibleStops(trip) {
    return mappedStops(trip.stops)
      .map((stop, index) => ({stop, index, name: displayStopName(stop)}))
      .filter(item => item.name);
  }

  function renderTripTab(trip) {
    const selected = trip.id === activeTripId;
    return '<button type="button" class="trip-tab" role="tab" id="trip-tab-' + trip.id +
      '" aria-selected="' + String(selected) + '" aria-controls="tripSelectedDetail" tabindex="' + (selected ? "0" : "-1") +
      '" data-trip-tab="' + trip.id + '">' +
      '<span class="trip-tab-number">' + String(trip.id).padStart(2, "0") + '</span>' +
      '<span class="trip-tab-copy"><b>' + esc(trip.title) + '</b><small><span class="trip-tab-region">' + esc(trip.region) +
      '</span><span class="trip-tab-stops">' + trip.stops.length + ' STOPS</span></small></span>' +
      '<span class="trip-tab-arrow" aria-hidden="true">↗</span></button>';
  }

  function renderPhotoStops(trip) {
    const home = /bengaluru|bangalore|shivamogga|shimoga/i;
    const seen = new Set();
    const candidates = mappedStops(trip.stops).filter(stop => {
      const name = displayStopName(stop);
      return name && !home.test(name) && !/floating stones/i.test(name);
    });
    const chosen = [];
    for (const stop of candidates) {
      const name = displayStopName(stop);
      const key = name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      chosen.push({name, mapQuery:stop.mapQuery});
      if (chosen.length === 3) break;
    }
    return chosen;
  }

  function renderTrip(trip) {
    const stops = visibleStops(trip);
    const stopsHtml = stops.map((item, index) =>
      '<li class="trip-stop"><span class="trip-stop-number">' + (index + 1) +
      '</span><div><b>' + esc(item.name) + '</b></div></li>'
    ).join("");
    const photoStops = renderPhotoStops(trip);
    return '<article class="trip-detail-view" aria-labelledby="trip-detail-title-' + trip.id + '">' +
      '<header class="trip-detail-heading">' +
        '<div class="trip-detail-kicker"><span>JOURNEY ' + String(trip.id).padStart(2, "0") + '</span><i></i><span>' + esc(trip.region.toUpperCase()) + '</span></div>' +
        '<h3 id="trip-detail-title-' + trip.id + '">' + esc(trip.title) + '</h3>' +
        '<p class="trip-overview">' + esc(trip.overview) + '</p>' +
      '</header>' +
      renderLiveMap(trip) +
      '<div class="trip-detail-lower">' +
        '<section class="trip-stops-panel" aria-labelledby="trip-stops-title-' + trip.id + '">' +
          '<div class="trip-panel-heading"><div><span class="trip-panel-kicker">THE ROUTE</span><h4 id="trip-stops-title-' + trip.id + '">Places along the way</h4></div><span class="trip-panel-mark" aria-hidden="true">01 / JOURNEY</span></div>' +
          '<ol class="trip-stop-list">' + stopsHtml + '</ol>' +
          '<details class="trip-directions-panel"><summary><span>Open route in Google Maps</span><span class="trip-directions-action">View directions ↗</span></summary>' +
          '<div class="trip-directions-content">' + renderMapLinks(trip) + '</div></details>' +
        '</section>' +
        '<section class="trip-photos-panel" aria-labelledby="trip-photos-title-' + trip.id + '">' +
          '<div class="trip-panel-heading"><div><span class="trip-panel-kicker">PLACES &amp; PERSPECTIVES</span><h4 id="trip-photos-title-' + trip.id + '">Scenes from the journey</h4></div><span class="trip-panel-mark" aria-hidden="true">02 / DISCOVER</span></div>' +
          '<p class="trip-photos-intro">A few favourite frames from the places along the way.</p>' +
          '<div class="trip-place-photos" id="tripPlacePhotos-' + trip.id + '" data-photo-trip="' + trip.id + '" aria-live="polite"><div class="trip-photo-loading"><span></span><span></span><span></span></div></div>' +
          '' +
        '</section>' +
      '</div>' +
    '</article>';
  }

  function cleanMeta(value) {
    return String(value || "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/\s+/g, " ")
      .trim();
  }

  async function searchCommonsPhoto(placeName, region) {
    const place = String(placeName || "").trim();
    const regionName = String(region || "").trim();
    const searchTerm = regionName && !place.toLowerCase().includes(regionName.toLowerCase())
      ? place + " " + regionName
      : place;
    const cacheKey = searchTerm.toLowerCase();
    if (photoResultsCache.has(cacheKey)) return photoResultsCache.get(cacheKey);

    const task = (async () => {
      const params = new URLSearchParams({
        action: "query",
        generator: "search",
        gsrsearch: searchTerm,
        gsrnamespace: "6",
        gsrlimit: "8",
        prop: "imageinfo",
        iiprop: "mime|url|extmetadata",
        iiurlwidth: "720",
        format: "json",
        origin: "*"
      });
      const response = await fetch("https://commons.wikimedia.org/w/api.php?" + params.toString(), {
        headers: {"Accept":"application/json"}
      });
      if (!response.ok) throw new Error("Photo search unavailable.");
      const data = await response.json();
      const pages = Object.values(data && data.query && data.query.pages || {});
      const candidates = pages.map(page => {
        const info = page && page.imageinfo && page.imageinfo[0];
        if (!info || !info.thumburl || !String(info.mime || "").startsWith("image/") || /svg/i.test(info.mime || "")) return null;
        const meta = info.extmetadata || {};
        return {
          title: cleanMeta(page.title || "Place photograph").replace(/^File:\s*/i, ""),
          imageUrl: info.thumburl,
          pageUrl: info.descriptionurl || "https://commons.wikimedia.org/wiki/" + encodeURIComponent(page.title || ""),
          artist: cleanMeta((meta.Artist && meta.Artist.value) || (meta.Credit && meta.Credit.value) || "") || "Creator details",
          license: cleanMeta((meta.LicenseShortName && meta.LicenseShortName.value) || (meta.UsageTerms && meta.UsageTerms.value) || "") || "Licence details",
          licenseUrl: cleanMeta((meta.LicenseUrl && meta.LicenseUrl.value) || "") || (info.descriptionurl || "")
        };
      }).filter(Boolean);
      candidates.sort((a, b) => {
        const aExact = a.title.toLowerCase().includes(place.toLowerCase()) ? 1 : 0;
        const bExact = b.title.toLowerCase().includes(place.toLowerCase()) ? 1 : 0;
        return bExact - aExact;
      });
      return candidates[0] || null;
    })().catch(() => null);

    photoResultsCache.set(cacheKey, task);
    return task;
  }

  function commonsSearchPage(placeName, region) {
    const query = encodeURIComponent((placeName + " " + region + " India").trim());
    return "https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=" + query;
  }

  function buildPhotoCard(photo, placeName) {
    const card = document.createElement("article");
    card.className = "trip-place-photo";
    const imageLink = document.createElement("a");
    imageLink.className = "trip-place-photo-image";
    imageLink.href = photo.pageUrl;
    imageLink.target = "_blank";
    imageLink.rel = "noopener noreferrer";
    imageLink.setAttribute("aria-label", "Open source photo: " + photo.title);
    const image = document.createElement("img");
    image.src = photo.imageUrl;
    image.alt = placeName;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => card.remove(), {once:true});
    imageLink.appendChild(image);

    const titleLink = document.createElement("a");
    titleLink.className = "trip-place-photo-title";
    titleLink.href = photo.pageUrl;
    titleLink.target = "_blank";
    titleLink.rel = "noopener noreferrer";
    titleLink.textContent = photo.title;

    const credit = document.createElement("div");
    credit.className = "trip-place-photo-credit";
    const artist = document.createElement("span");
    artist.textContent = photo.artist;
    const license = document.createElement("a");
    license.href = photo.licenseUrl || photo.pageUrl;
    license.target = "_blank";
    license.rel = "noopener noreferrer";
    license.textContent = photo.license;
    license.setAttribute("aria-label", "View photo licence");
    credit.append(artist, license);

    const source = document.createElement("a");
    source.className = "trip-place-photo-source";
    source.href = photo.pageUrl;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.textContent = "Wikimedia Commons ↗";

    const caption = document.createElement("div");
    caption.className = "trip-place-photo-caption";
    caption.append(titleLink, credit, source);
    card.append(imageLink, caption);
    return card;
  }

  async function loadTripPhotos(trip) {
    const gallery = document.getElementById("tripPlacePhotos-" + trip.id);
    if (!gallery) return;
    const subjects = renderPhotoStops(trip);
    if (!subjects.length) {
      gallery.replaceChildren();
      return;
    }
    gallery.innerHTML = '<div class="trip-photo-loading"><span></span><span></span><span></span></div>';
    const photos = await Promise.all(subjects.map(subject => searchCommonsPhoto(subject.name, trip.region)));
    if (!gallery.isConnected || activeTripId !== trip.id) return;
    gallery.replaceChildren();
    let rendered = 0;
    photos.forEach((photo, index) => {
      const subject = subjects[index];
      if (photo) {
        gallery.appendChild(buildPhotoCard(photo, subject.name));
        rendered += 1;
      } else {
        const fallback = document.createElement("a");
        fallback.className = "trip-photo-explore";
        fallback.href = commonsSearchPage(subject.name, trip.region);
        fallback.target = "_blank";
        fallback.rel = "noopener noreferrer";
        const arrow = document.createElement("span");
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "↗";
        const name = document.createElement("b");
        name.textContent = subject.name;
        const caption = document.createElement("small");
        caption.textContent = "Browse destination photos ↗";
        fallback.append(arrow, name, caption);
        gallery.appendChild(fallback);
        rendered += 1;
      }
    });
    gallery.classList.toggle("is-single", rendered === 1);
  }

  function updateTabSelection() {
    Array.from(tabs.querySelectorAll("[data-trip-tab]")).forEach(button => {
      const selected = Number(button.dataset.tripTab) === activeTripId;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  }

  function selectTrip(tripId, focusTab) {
    const trip = trips.find(item => item.id === tripId);
    if (!trip) return;
    activeTripId = tripId;
    disposeTripMaps();
    updateTabSelection();
    if (focusTab) {
      const selectedTab = tabs.querySelector('[data-trip-tab="' + tripId + '"]');
      if (selectedTab) selectedTab.focus();
    }
    detailPanel.innerHTML = renderTrip(trip);
    detailPanel.setAttribute("aria-labelledby", "trip-tab-" + trip.id);
    observeTripMaps();
    loadTripPhotos(trip);
  }

  tabs.innerHTML = trips.map(renderTripTab).join("");
  tabs.addEventListener("click", event => {
    const button = event.target.closest("[data-trip-tab]");
    if (!button) return;
    selectTrip(Number(button.dataset.tripTab), false);
  });
  tabs.addEventListener("keydown", event => {
    const button = event.target.closest("[data-trip-tab]");
    if (!button) return;
    const tabButtons = Array.from(tabs.querySelectorAll("[data-trip-tab]"));
    const currentIndex = tabButtons.indexOf(button);
    let nextIndex = currentIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabButtons.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabButtons.length - 1;
    else return;
    event.preventDefault();
    selectTrip(Number(tabButtons[nextIndex].dataset.tripTab), true);
  });

  if (activeTripId !== null) selectTrip(activeTripId, false);
})();