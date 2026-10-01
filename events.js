const addEventBtn = document.getElementById("addEventBtn");
const eventModal = document.getElementById("eventModal");
const closeEventModal = document.getElementById("closeEventModal");
const eventForm = document.getElementById("eventForm");
const eventsContainer = document.getElementById("eventsContainer");


// Load saved events
let events = JSON.parse(localStorage.getItem("clubEvents")) || [];


// Open popup
addEventBtn.addEventListener("click", function () {
    eventModal.style.display = "flex";
});


// Close popup
closeEventModal.addEventListener("click", function () {
    eventModal.style.display = "none";
});


// Save Event
eventForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const event = {

        id: Date.now(),

        title: document.getElementById("eventTitle").value.trim(),

        date: document.getElementById("eventDate").value,

        time: document.getElementById("eventTime").value,

        venue: document.getElementById("eventVenue").value.trim(),

        description:
            document.getElementById("eventDescription").value.trim()
    };


    events.push(event);

    localStorage.setItem(
        "clubEvents",
        JSON.stringify(events)
    );


    eventForm.reset();

    eventModal.style.display = "none";

    displayEvents();

});


// Display Events
function displayEvents() {

    eventsContainer.innerHTML = "";


    if (events.length === 0) {

        eventsContainer.innerHTML = `
            <div class="no-events">
                <i class="fa fa-calendar"></i>
                <h3>No Upcoming Events</h3>
                <p>New events will be added here.</p>
            </div>
        `;

        return;
    }


    events.forEach(function (event) {

        const card = document.createElement("div");

        card.className = "event-card";


        card.innerHTML = `

            <div class="event-date-box">

                <i class="fa fa-calendar"></i>

                <strong>
                    ${formatDate(event.date)}
                </strong>

            </div>


            <div class="event-content">

                <h2>${event.title}</h2>

                ${
                    event.time
                    ? `<p>
                        <i class="fa fa-clock-o"></i>
                        ${event.time}
                       </p>`
                    : ""
                }


                ${
                    event.venue
                    ? `<p>
                        <i class="fa fa-map-marker"></i>
                        ${event.venue}
                       </p>`
                    : ""
                }


                ${
                    event.description
                    ? `<p class="event-description">
                        ${event.description}
                       </p>`
                    : ""
                }

            </div>


            <button
                class="delete-event"
                onclick="deleteEvent(${event.id})">

                <i class="fa fa-trash"></i>

            </button>

        `;


        eventsContainer.appendChild(card);

    });

}


// Format Date
function formatDate(date) {

    const d = new Date(date);

    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


// Delete Event
function deleteEvent(id) {

    if (!confirm("Delete this event?")) {
        return;
    }

    events = events.filter(function (event) {
        return event.id !== id;
    });


    localStorage.setItem(
        "clubEvents",
        JSON.stringify(events)
    );


    displayEvents();

}


// Initial display
displayEvents();
const API_URL = "https://script.google.com/macros/s/AKfycbxB1vg6S5J2BlnRuwXdXxmGucmK8sZmTVX9M4Y1nhUJ-ISIizRsXTrS2Zj_a2VHWWI0/exec";

fetch(API_URL)
  .then(response => response.json())
  .then(events => {
    console.log(events);
  })
  .catch(error => {
    console.error("Event loading error:", error);
  });