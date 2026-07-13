/* ============================================================
   CLUB FIXTURES — edit this list and nothing else in this file.
   One line per fixture. Order doesn't matter (the site sorts
   them), but the date format must be YYYY-MM-DD.
   Past fixtures disappear from the site automatically.
   ============================================================ */

const FIXTURES = [
  // July
  { date: "2026-07-14", team: "Under 15", opposition: "Witney Mills",                 venue: "Away", time: "6pm" },
  { date: "2026-07-18", team: "1st XI",   opposition: "Kingston Bagpuize 2nd XI",     venue: "Away", time: "1pm" },
  { date: "2026-07-18", team: "2nd XI",   opposition: "Shipton-under-Wychwood 4th XI", venue: "Home", time: "1pm" },
  { date: "2026-07-21", team: "Under 15", opposition: "Langford",                     venue: "Home", time: "6pm" },
  { date: "2026-07-25", team: "1st XI",   opposition: "Radley 1st XI",                venue: "Home", time: "1pm" },
  { date: "2026-07-25", team: "2nd XI",   opposition: "Cropredy 4th XI",              venue: "Away", time: "1pm" },
  { date: "2026-07-28", team: "Under 15", opposition: "Great Rissington",             venue: "Away", time: "6pm" },

  // August
  { date: "2026-08-01", team: "1st XI",   opposition: "Witney Swifts 2nd XI",         venue: "Away", time: "1pm" },
  { date: "2026-08-01", team: "2nd XI",   opposition: "Ascott-under-Wychwood 2nd XI", venue: "Home", time: "1pm" },
  { date: "2026-08-04", team: "Under 15", opposition: "Chipping Norton",              venue: "Home", time: "6pm" },
  { date: "2026-08-08", team: "1st XI",   opposition: "Horley 1st XI",                venue: "Home", time: "1pm" },
  { date: "2026-08-08", team: "2nd XI",   opposition: "Horley 2nd XI",                venue: "Away", time: "1pm" },
  { date: "2026-08-11", team: "Under 15", opposition: "Minster Lovell",               venue: "Home", time: "6pm" },
  { date: "2026-08-15", team: "1st XI",   opposition: "Broughton & North Newington 1st XI", venue: "Away", time: "1pm" },
  { date: "2026-08-15", team: "2nd XI",   opposition: "Witney Mills 4th XI",          venue: "Home", time: "1pm" },
  { date: "2026-08-22", team: "1st XI",   opposition: "Oxford Downs 3rd XI",          venue: "Home", time: "1pm" },
  { date: "2026-08-22", team: "2nd XI",   opposition: "Stanton Harcourt 2nd XI",      venue: "Away", time: "1pm" },
  { date: "2026-08-29", team: "1st XI",   opposition: "Wroxton 1st XI",               venue: "Away", time: "12.30pm" },
  { date: "2026-08-29", team: "2nd XI",   opposition: "Minster Lovell 3rd XI",        venue: "Home", time: "12.30pm" },

  // September
  { date: "2026-09-05", team: "1st XI",   opposition: "Minster Lovell 2nd XI",        venue: "Home", time: "12.30pm" },
  { date: "2026-09-05", team: "2nd XI",   opposition: "Wroxton 2nd XI",               venue: "Away", time: "12.30pm" },
];

/* ============================================================
   DO NOT EDIT BELOW THIS LINE
   ============================================================ */
(function () {
  function parse(d) { return new Date(d + "T00:00:00"); }
  var today = new Date(); today.setHours(0, 0, 0, 0);

  var upcoming = FIXTURES
    .filter(function (f) { return parse(f.date) >= today; })
    .sort(function (a, b) { return parse(a.date) - parse(b.date); });

  function nice(d) {
    return parse(d).toLocaleDateString("en-GB",
      { weekday: "long", day: "numeric", month: "long" });
  }

  // Home page: fill in the Next Fixtures strip, if it's on this page.
  var line = document.getElementById("next-fixture-line");
  var detail = document.getElementById("next-fixture-detail");
  if (line && detail) {
    function esc(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function where(f) {
      return f.venue.toLowerCase() === "home" ? "at home to" : "away at";
    }
    if (upcoming.length) {
      var next = upcoming.slice(0, 3);
      var n = next[0];
      line.textContent = "Swinbrook " + n.team + " vs " + n.opposition;
      var lines = [
        esc(nice(n.date) + (n.time ? ", " + n.time : "") +
          (n.venue.toLowerCase() === "home" ? " — home, Swinbrook" : " — away"))
      ];
      for (var i = 1; i < next.length; i++) {
        var m = next[i];
        lines.push(esc("Then: " + nice(m.date) + " — " + m.team + " " +
          where(m) + " " + m.opposition + (m.time ? ", " + m.time : "")));
      }
      detail.innerHTML = lines.join("<br>");
    } else {
      line.textContent = "No fixture currently scheduled";
      detail.textContent = "The full list is on our Play-Cricket page.";
    }
  }

  // Scores page: build the upcoming fixtures table, if it's on this page.
  var slot = document.getElementById("fixtures-list");
  if (slot) {
    if (!upcoming.length) {
      slot.innerHTML = '<p class="widget-note">No upcoming fixtures listed at the moment.</p>';
      return;
    }
    var rows = upcoming.map(function (f) {
      return "<tr><td>" + nice(f.date) + "</td><td>" + f.team + "</td><td>" +
             f.opposition + "</td><td>" + f.venue + "</td><td>" + (f.time || "") + "</td></tr>";
    }).join("");
    slot.innerHTML =
      '<table class="results-table"><thead><tr>' +
      '<th scope="col">Date</th><th scope="col">Team</th><th scope="col">Opposition</th>' +
      '<th scope="col">Venue</th><th scope="col">Start</th>' +
      '</tr></thead><tbody>' + rows + "</tbody></table>";
  }
})();
