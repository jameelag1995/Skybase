import { usersInfo, flights } from "./localstorage.js";
console.log(usersInfo[0]);
let currUser = usersInfo.filter((user) => user.currentUser === true)[0];
const username = document.getElementById("username");
const addFlight = document.getElementById("add-flight");

if (currUser.isAdmin === true) {
    addFlight.style.display = "block";
    username.innerText = `Admin ${currUser.email}`;
} else {
    addFlight.style.display = "none";
    username.innerText = `${currUser.email}`;
}

const flightsBoard = document.getElementById("flights-board");
showTickets(flights);

function showTickets(flightsArr) {
    flightsBoard.innerHTML = "";
    if (currUser.isAdmin === true) {
        flightsArr.forEach((flight) => {
            let ticket = document.createElement("div");
            ticket.innerHTML = `<div>${flight.id}</div><div id="from-to">${
                flight.from
            } &#8594; ${flight.to}</div>
            <div id="departure-return-dates">${flight.dates[0].depart.toDateString()} &#8594; ${flight.dates[1].return.toDateString()}</div>
            <div id="price"><b>${
                flight.price
            }$</b></div><div id="btns"> <button class="btn add-to-cart">Add to Cart</button><button class="btn edit-price">Edit Price</button></div>`;
            ticket.classList.add("ticket");
            flightsBoard.append(ticket);
        });
    } else {
        flightsArr.forEach((flight) => {
            let ticket = document.createElement("div");
            ticket.innerHTML = `<div id="from-to">${flight.from} &#8594; ${
                flight.to
            }</div>
            <div id="departure-return-dates">${flight.dates[0].depart.toDateString()} &#8594; ${flight.dates[1].return.toDateString()}</div>
            <div id="price">${
                flight.price
            }$ <button class="btn add-to-cart">Add to Cart</button></div>`;
            ticket.classList.add("ticket");
            flightsBoard.append(ticket);
        });
    }
}

addFlight.addEventListener("submit", (e) => {
    e.preventDefault();
    const from = document.getElementById("add-flight-from").value;
    const to = document.getElementById("add-flight-to").value;
    const price = document.getElementById("add-flight-price").value;
    const depart = new Date(
        document.getElementById("add-flight-departure-date").value
    );
    const returnDate = new Date(
        document.getElementById("add-flight-return-date").value
    );
    let currFlight = {
        id: flights.length,
        from,
        to,
        price,
        dates: [{ depart }, { return: returnDate }],
    };
    console.log(currFlight);
    flights.unshift(currFlight);
    showTickets(flights);
});

const sortBtn = document.getElementById("sort-by-price-btn");
sortBtn.addEventListener("click", (e) => {
    const sortedFlights = flights.sort((flightA, flightB) => {
        return flightA.price - flightB.price;
    });
    console.log("sorted flights: ", sortedFlights);
    showTickets(sortedFlights);
});

const searchFlight = document.getElementById("search-flight");
searchFlight.addEventListener("submit", (e) => {
    e.preventDefault();
    const from = document.getElementById("flight-from").value.toLowerCase();
    const to = document.getElementById("flight-to").value.toLowerCase();
    const price = document.getElementById("flight-price").value;
    const depart = new Date(document.getElementById("departure-date").value);
    const returnDate = new Date(document.getElementById("return-date").value);
    const filteredFlights = flights.filter((flight) => {
        return (
            (flight.from.includes(from) ||
                flight.to.includes(to) ||
                flight.return === returnDate ||
                flight.depart === depart) &&
            flight.price <= price
        );
    });
    // console.log("filtered flights: ", filteredFlights);
    showTickets(filteredFlights);
});

// const removeFlightBtns = document.querySelectorAll(".remove-flight");
// removeFlightBtns.forEach((removeFlightBtn) => {
//     removeFlightBtn.addEventListener("click", (e) => {
//         let ticket = removeFlightBtn.parentElement.parentElement;
//         console.log(ticket.firstChild.innerHTML);
//         const filtArr = flights.filter(flight => flight.id != ticket.firstChild.innerText)
//         showTickets(filtArr);
//         // ticket.style.display = "none";
//     });
// });

const editPriceBtns = document.querySelectorAll(".edit-price");
editPriceBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
        let id = editBtn.parentElement.parentElement.firstElementChild.innerText;
        console.log(id);
        let currTicket = flights[id]
        let newPrice = prompt("enter new price");
        currTicket.price = newPrice;
        showTickets(flights);
    });
});

