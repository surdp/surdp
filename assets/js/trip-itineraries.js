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

  function mappedStops(stops) {
    return stops.filter(stop => stop.mapQuery && String(stop.mapQuery).trim());
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

  function xmlText(value) {
    return esc(value).replace(/&#39;/g, "&apos;");
  }

  function wrapTitle(value, limit) {
    const words = String(value || "").split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach(word => {
      if (line && (line + " " + word).length > limit) {
        lines.push(line);
        line = word;
      } else {
        line = line ? line + " " + word : word;
      }
    });
    if (line) lines.push(line);
    if (lines.length > 2) {
      lines[1] = lines.slice(1).join(" ");
      lines.length = 2;
    }
    return lines;
  }

  function posterPointLabel(stop) {
    return String(stop.name || "").replace(/,\s*(Karnataka|Tamil Nadu|Kerala|Andhra Pradesh)$/i, "");
  }

  function renderTripPoster(trip) {
    const plot = trip.stops.map((stop, index) => {
      const ll = getCoordinates(stop);
      return ll ? {stop, index, lat:ll.lat, lng:ll.lng} : null;
    }).filter(Boolean);

    const W = 420, H = 650;
    const headerH = 128, mapTop = 132, mapBottom = 520;
    const centerLat = plot.reduce((sum, p) => sum + p.lat, 0) / Math.max(plot.length, 1);
    const cosLat = Math.cos(centerLat * Math.PI / 180);
    let minLat = Math.min(...plot.map(p => p.lat)), maxLat = Math.max(...plot.map(p => p.lat));
    let minLon = Math.min(...plot.map(p => p.lng * cosLat)), maxLon = Math.max(...plot.map(p => p.lng * cosLat));
    if (!Number.isFinite(minLat) || !Number.isFinite(maxLat)) { minLat = 12; maxLat = 13; minLon = 75; maxLon = 76; }
    if (maxLat - minLat < 0.06) { minLat -= 0.03; maxLat += 0.03; }
    if (maxLon - minLon < 0.06) { minLon -= 0.03; maxLon += 0.03; }
    const point = item => ({
      x: 38 + ((item.lng * cosLat - minLon) / (maxLon - minLon)) * 344,
      y: mapTop + 18 + ((maxLat - item.lat) / (maxLat - minLat)) * (mapBottom - mapTop - 38)
    });
    const pts = plot.map(item => Object.assign({}, item, point(item)));
    const routePoints = pts.map(p => p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
    const coastal = /coast|south india/i.test(trip.region) ||
      trip.stops.some(stop => /beach|island|varkala|mangalore|mangaluru|alappuzha|alleppey|kochi|kanyakumari/i.test(stop.name));
    const hillTrip = trip.stops.some(stop => /ghat|hill|falls|fort/i.test(stop.name));
    const titleLines = wrapTitle(trip.title, 31);
    const titleSize = trip.title.length > 40 ? 17 : 19;
    const titleSvg = titleLines.map((line, index) =>
      '<text x="24" y="' + (64 + index * 23) + '" fill="#fff7e6" font-size="' + titleSize +
      '" font-family="Arial, sans-serif" font-weight="800">' + xmlText(line) + '</text>'
    ).join("");

    let labels = pts.filter((p, index) => index === 0 || index === pts.length - 1 ||
      /hampi|mysuru zoo|jog falls|kukke|dandeli|vijayapura|gol gumbaz|kanyakumari|varkala|alappuzha|coimbatore|puducherry|tirumala|chamundi|badami cave|dhanushkodi|hornadu|ad iyogi/i.test(p.stop.name));
    const uniqueLabels = [];
    labels.forEach(p => {
      if (!uniqueLabels.some(existing => Math.abs(existing.lat - p.lat) < 0.07 && Math.abs(existing.lng - p.lng) < 0.07)) uniqueLabels.push(p);
    });
    labels = uniqueLabels;
    if (labels.length > 7) {
      const chosen = [];
      for (let i = 0; i < 7; i++) chosen.push(labels[Math.round(i * (labels.length - 1) / 6)]);
      labels = chosen.filter((item, i) => chosen.indexOf(item) === i);
    }
    if (labels.length < 4 && pts.length > 4) {
      for (let i = 1; i < 4; i++) {
        const p = pts[Math.round(i * (pts.length - 1) / 4)];
        if (p && !labels.some(existing => existing.index === p.index)) labels.push(p);
      }
    }

    const contours = Array.from({length:7}, (_, i) => {
      const y = 175 + i * 44 + (trip.id % 3) * 5;
      return '<path d="M -18 ' + y + ' C 55 ' + (y - 40) + ', 114 ' + (y + 55) +
        ', 190 ' + (y + 5) + ' S 330 ' + (y - 36) + ', 445 ' + (y + 12) +
        '" fill="none" stroke="' + (coastal ? "#b0cf9a" : "#b8c998") +
        '" stroke-width="' + (i % 3 === 0 ? 2 : 1) + '" opacity=".58"/>';
    }).join("");

    const mountains = hillTrip
      ? '<g fill="#b1c77b" opacity=".76"><path d="M0 455 L38 398 L70 432 L103 372 L144 430 L177 397 L210 447 L250 386 L286 440 L331 391 L369 434 L420 385 L420 530 L0 530Z"/><path d="M0 479 L52 430 L87 462 L140 410 L179 466 L224 420 L273 471 L318 430 L370 470 L420 430 L420 530 L0 530Z" fill="#91b36e"/></g>'
      : '<g fill="#a6c780" opacity=".72"><path d="M0 455 Q65 394 124 444 T250 427 T420 440 L420 530 L0 530Z"/><path d="M0 484 Q76 425 148 477 T290 462 T420 475 L420 530 L0 530Z" fill="#8fb873"/></g>';
    const sea = coastal
      ? '<path d="M0 126 C60 162 10 224 36 277 C58 328 5 374 25 432 C38 471 8 495 0 506Z" fill="#84cbd3" opacity=".82"/><path d="M0 126 C60 162 10 224 36 277 C58 328 5 374 25 432 C38 471 8 495 0 506" fill="none" stroke="#f5fff2" stroke-width="3" opacity=".9"/><path d="M6 185 Q18 194 30 185 M4 205 Q16 214 28 205 M13 359 Q25 368 37 359 M7 382 Q19 391 31 382" stroke="#e9fff4" stroke-width="2" fill="none" opacity=".9"/>'
      : "";
    const regionLabel = /coast/i.test(trip.region) ? "COASTAL ROUTE" :
      /south india/i.test(trip.region) ? "SOUTH INDIA ROUTE" :
      /tamil nadu|puducherry/i.test(trip.region) ? "SOUTHERN HERITAGE ROUTE" :
      "REGIONAL ROAD TRIP";

    const labelSvg = labels.map((p, index) => {
      const text = posterPointLabel(p.stop);
      const short = text.length > 21 ? text.slice(0, 19) + "…" : text;
      const side = (index % 2 === 0 ? 1 : -1);
      const width = Math.min(142, Math.max(66, short.length * 5.4 + 14));
      let x = p.x + side * 13;
      let anchor = side === 1 ? "start" : "end";
      if (side === 1 && x + width > W - 8) { x = p.x - 13; anchor = "end"; }
      if (side === -1 && x - width < 8) { x = p.x + 13; anchor = "start"; }
      const y = Math.max(mapTop + 11, Math.min(mapBottom - 6, p.y + (index % 3 === 0 ? -12 : 15)));
      const rectX = anchor === "start" ? x - 4 : x - width + 4;
      return '<g><line x1="' + p.x.toFixed(1) + '" y1="' + p.y.toFixed(1) + '" x2="' +
        x.toFixed(1) + '" y2="' + (y - 4).toFixed(1) + '" stroke="#a4332d" stroke-width="1.2" opacity=".7"/>' +
        '<rect x="' + rectX.toFixed(1) + '" y="' + (y - 15).toFixed(1) + '" width="' + width +
        '" height="21" rx="5" fill="#fff8e7" stroke="#d5c9a4" stroke-width=".8" opacity=".96"/>' +
        '<text x="' + x.toFixed(1) + '" y="' + (y - 1).toFixed(1) + '" text-anchor="' + anchor +
        '" fill="#243a32" font-family="Arial, sans-serif" font-size="9.5" font-weight="700">' + xmlText(short) + '</text></g>';
    }).join("");

    const stopDots = pts.map((p, index) => '<g><circle cx="' + p.x.toFixed(1) + '" cy="' +
      p.y.toFixed(1) + '" r="' + (labels.some(l => l.index === p.index) ? 6.5 : 3.3) +
      '" fill="' + (index === 0 || index === pts.length - 1 ? "#f3c85a" : "#e4483f") +
      '" stroke="#fff9e9" stroke-width="2"/>' + (labels.some(l => l.index === p.index)
      ? '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="10" fill="none" stroke="#e4483f" stroke-width="1.2" opacity=".7"/>'
      : "") + '</g>').join("");

    return '<div class="trip-poster" role="img" aria-label="Illustrated route map for trip ' +
      String(trip.id).padStart(2, "0") + ': ' + esc(trip.title) + '">' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="tripHead' + trip.id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#183f37"/><stop offset="1" stop-color="#28634e"/></linearGradient>' +
      '<linearGradient id="tripLand' + trip.id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8f0d8"/><stop offset="1" stop-color="#e8e7bd"/></linearGradient>' +
      '<filter id="routeShadow' + trip.id + '" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>' +
      '<rect width="' + W + '" height="' + H + '" fill="url(#tripLand' + trip.id + ')"/>' +
      '<rect width="' + W + '" height="' + headerH + '" fill="url(#tripHead' + trip.id + ')"/>' +
      '<text x="24" y="28" fill="#acd7ac" font-size="10" letter-spacing="2" font-family="Arial, sans-serif" font-weight="700">TRIP ' +
      String(trip.id).padStart(2, "0") + '  /  ' + xmlText(regionLabel) + '</text>' +
      '<rect x="338" y="13" width="58" height="23" rx="6" fill="#f0cf70" opacity=".98"/>' +
      '<text x="367" y="28.5" text-anchor="middle" fill="#243a32" font-size="9" font-family="Arial, sans-serif" font-weight="800">' +
      trip.stops.length + ' STOPS</text>' + titleSvg +
      '<text x="24" y="' + (titleLines.length === 1 ? 96 : 115) + '" fill="#b8d9b6" font-family="Arial, sans-serif" font-size="9.5" letter-spacing="1.3">YOUR ROUTE · SOUTH INDIA</text>' +
      '<rect y="' + headerH + '" width="' + W + '" height="' + (H-headerH) + '" fill="url(#tripLand' + trip.id + ')"/>' +
      '<path d="M -10 184 C 56 151, 88 223, 143 207 S 262 158, 430 220 L430 505 L-10 505Z" fill="#d7e3ad" opacity=".38"/>' +
      '<path d="M -10 280 C 62 247, 137 320, 199 289 S 323 238, 430 292 L430 520 L-10 520Z" fill="#c3d59b" opacity=".48"/>' +
      sea + mountains + contours +
      '<text x="22" y="509" fill="#5a7950" font-family="Arial, sans-serif" font-size="9" letter-spacing="2" opacity=".8">' +
      (coastal ? "COASTLINES &amp; GHATS" : hillTrip ? "HILLS · HERITAGE · HIGHWAYS" : "LANDMARKS · HIGHWAYS · HERITAGE") + '</text>' +
      (routePoints ? '<polyline points="' + routePoints + '" fill="none" stroke="#872d2b" stroke-width="10" opacity=".2" filter="url(#routeShadow' + trip.id + ')"/>' +
        '<polyline points="' + routePoints + '" fill="none" stroke="#fff8e7" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<polyline points="' + routePoints + '" fill="none" stroke="#df413c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' : "") +
      stopDots + labelSvg +
      '<rect y="530" width="' + W + '" height="120" fill="#183f37"/>' +
      '<path d="M 24 550 H396" stroke="#558067" stroke-width="1"/>' +
      '<text x="24" y="573" fill="#acd7ac" font-family="Arial, sans-serif" font-size="9" letter-spacing="1.6">TRIP OVERVIEW</text>' +
      '<text x="24" y="594" fill="#fff8e7" font-family="Arial, sans-serif" font-size="11.5" font-weight="700">' +
      (trip.stops[0] ? xmlText(posterPointLabel(trip.stops[0])) : "Starting point") + '</text>' +
      '<text x="24" y="611" fill="#b8d9b6" font-family="Arial, sans-serif" font-size="10">Route map is illustrative · open directions for navigation</text>' +
      '<text x="396" y="635" text-anchor="end" fill="#f0cf70" font-family="Arial, sans-serif" font-size="10" font-weight="800">TRIP ' +
      String(trip.id).padStart(2, "0") + '  ↗</text></svg></div>';
  }

  function renderTrip(trip) {
    const stopsHtml = trip.stops.map((stop, index) =>
      '<li class="trip-stop"><span class="trip-stop-number">' + (index + 1) +
      '</span><div><b>' + esc(stop.name) + '</b>' +
      (stop.note ? '<p>' + esc(stop.note) + '</p>' : '') + '</div></li>'
    ).join("");
    return '<article class="trip-card">' + renderTripPoster(trip) +
      '<div class="trip-card-copy"><p class="trip-overview">' + esc(trip.overview) +
      '</p><details class="trip-details"><summary>Full itinerary &amp; Google Maps <span>' +
      trip.stops.length + ' stops</span></summary><div class="trip-details-content"><ol class="trip-stop-list">' +
      stopsHtml + '</ol><div class="trip-map-area"><h4>Google Maps directions</h4><p>Open the route legs in Google Maps for navigation. These illustrated posters are designed as trip overviews, not turn-by-turn maps.</p>' +
      renderMapLinks(trip) + '</div></div></details></div></article>';
  }

  container.innerHTML = trips.map(renderTrip).join("");
  const tripCount = document.getElementById("tripTotal");
  if (tripCount) tripCount.textContent = String(trips.length);

  const search = document.getElementById("tripSearch");
  if (search) {
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      const filtered = trips.filter(trip =>
        [trip.title, trip.region, trip.overview, ...trip.stops.map(stop => stop.name)]
          .join(" ").toLowerCase().includes(query)
      );
      container.innerHTML = filtered.map(renderTrip).join("");
      const count = document.getElementById("tripResultsCount");
      if (count) count.textContent = "Showing " + filtered.length + " of " + trips.length + " trips";
    });
  }
  const count = document.getElementById("tripResultsCount");
  if (count) count.textContent = "Showing " + trips.length + " completed trips";
})();