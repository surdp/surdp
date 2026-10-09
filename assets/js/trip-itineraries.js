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
    params.set("travelmode", "two-wheeler");
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

  function renderTrip(trip) {
    const start = trip.stops[0] ? trip.stops[0].name : "";
    const end = trip.stops[trip.stops.length - 1] ? trip.stops[trip.stops.length - 1].name : "";
    const stopsHtml = trip.stops.map((stop, index) =>
      '<li class="trip-stop"><span class="trip-stop-number">' + (index + 1) +
      '</span><div><b>' + esc(stop.name) + '</b>' +
      (stop.note ? '<p>' + esc(stop.note) + '</p>' : '') + '</div></li>'
    ).join("");
    return '<article class="trip-card"><div class="trip-card-heading"><span class="trip-index">TRIP ' +
      String(trip.id).padStart(2, "0") + '</span><span class="trip-region">' + esc(trip.region) +
      '</span></div><h3>' + esc(trip.title) + '</h3><p class="trip-overview">' + esc(trip.overview) +
      '</p><div class="trip-route-summary"><span>' + esc(start) + '</span><i aria-hidden="true">→</i><span>' +
      esc(end) + '</span></div><details class="trip-details"><summary>View itinerary &amp; Google Maps route <span>' +
      trip.stops.length + ' stops</span></summary><div class="trip-details-content"><ol class="trip-stop-list">' +
      stopsHtml + '</ol><div class="trip-map-area"><h4>Google Maps routes</h4><p>Long routes are split into shorter map legs so waypoints work more consistently on mobile.</p>' +
      renderMapLinks(trip) + '</div></div></details></article>';
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