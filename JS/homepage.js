const flights = [
    {
        id: 0,
        from: "Tel aviv",
        to: "amsterdam",
        price: 40,
        dates: [
            { depart: new Date("11.24.2023") },
            { return: new Date("12.1.2023") },
        ],
    },
    {
        id: 1,
        from: "Tel aviv",
        to: "london",
        price: 75,
        dates: [
            { depart: new Date("11.28.2023") },
            { return: new Date("12.12.2023") },
        ],
    },
    {
        id: 2,
        from: "Athens",
        to: "Prague",
        price: 95,
        dates: [
            { depart: new Date("11.28.2023") },
            { return: new Date("12.12.2023") },
        ],
    },
    {
        id: 3,
        from: "Berlin",
        to: "Prague",
        price: 22,
        dates: [
            { depart: new Date("11.28.2023") },
            { return: new Date("12.12.2023") },
        ],
    },
    {
        id: 4,
        from: "London",
        to: "Berlin",
        price: 100,
        dates: [
            { depart: new Date("11.28.2023") },
            { return: new Date("12.12.2023") },
        ],
    },
];

const username = document.getElementById("username");
const addFlight = document.getElementById("add-flight");
if (localStorage.getItem("isAdmin") == "true") {
    addFlight.style.display = "block";
    username.innerText = `Admin ${localStorage.getItem("email")}`;
} else {
    addFlight.style.display = "none";
    username.innerText = `${localStorage.getItem("email")}`;
}

const flightsBoard = document.getElementById("flights-board");
showTickets(flights);

function showTickets(flightsArr) {
    flightsBoard.innerHTML = "";
    if (localStorage.getItem("isAdmin") == "true") {
        flightsArr.forEach((flight) => {
            let ticket = document.createElement("div");
            ticket.innerHTML = `<div>${flight.id}</div><div id="from-to">${
                flight.from
            } &#8594; ${flight.to}</div>
            <div id="departure-return-dates">${flight.dates[0].depart.toDateString()} &#8594; ${flight.dates[1].return.toDateString()}</div>
            <div id="price"><label for="priceinput">Price:</label>
            <input type="number" id="priceinput" name="priceinput" value="${
                flight.price
            }" required>$</div><div id="btns"> <button class="btn add-to-cart">Add to Cart</button><button class="btn edit-price">Edit Price</button></div>`;
            ticket.classList.add("ticket");
            flightsBoard.append(ticket);
        });
    } else {
        flightsArr.forEach((flight) => {
            let ticket = document.createElement("div");
            ticket.innerHTML = `<div>${flight.id}</div><div id="from-to">${
                flight.from
            } &#8594; ${flight.to}</div>
            <div id="departure-return-dates">${flight.dates[0].depart.toDateString()} &#8594; ${flight.dates[1].return.toDateString()}</div>
            <div id="price"><b>${
                flight.price
            }$</b></div><div id="btns"><button class="btn add-to-cart">Add to Cart</button></div>`;
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
            flight.from.includes(from) &&
            flight.to.includes(to) &&
            flight.return === returnDate &&
            flight.depart === depart &&
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
console.log(editPriceBtns);
editPriceBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
        let ticket = editBtn.parentElement.parentElement;
        console.log("ticket", ticket.innerHTML);
        let id = ticket.firstElementChild.innerText;
        console.log(id);
        let currTicket = flights[id];
        let newPrice = document.getElementById("priceinput").value;
        currTicket.price = newPrice;
        showTickets(flights);
        console.log("ticket & ticket price:", currTicket, currTicket.price);
    });
});
const cartArr = [];
const cartBoard = document.getElementById("cart-board");
const addToCartBtns = document.querySelectorAll(".add-to-cart");
addToCartBtns.forEach((CartBtn) => {
    CartBtn.addEventListener("click", (e) => {
        let ticket = CartBtn.parentElement.parentElement;
        console.log("ticket", ticket.innerHTML);
        let id = ticket.firstElementChild.innerText;

        if (cartArr.includes(flights[id])) {
        } else {
            cartArr.push(flights[id]);
        }
        console.log("CartArr", cartArr);
        showCart(cartArr);
    });
});
function showCart(cartlist) {
    cartBoard.innerHTML = "";
    cartlist.forEach((cartItem) => {
        let item = document.createElement("div");
        item.innerHTML = `<div id="from-to">${cartItem.from} &#8594; ${
            cartItem.to
        }</div>
        <div id="departure-return-dates">${cartItem.dates[0].depart.toDateString()} &#8594; ${cartItem.dates[1].return.toDateString()}</div>
        <div id="price"><b>${
            cartItem.price
        }$</b></div><div id=num-of-tickets><label for="ticketnum">Number of Tickets:</label>
        <input type="number" id="ticketnum" name="ticketnum" value="1" required></div>`;
        item.classList.add("ticket");
        cartBoard.append(item);
    });
}

const calcBtn = document.getElementById("calculate-total-btn");
const totalEl = document.getElementById("total");
let total = 0;
calcBtn.addEventListener("click", (e) => {
    const numOfTicketsInputs = document.querySelectorAll("#ticketnum");
    cartArr.forEach((cartItem, index) => {
        total += cartItem.price * numOfTicketsInputs[index].value;
    });
    totalEl.innerText = `${total}$`;
    total = 0;
});

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", (e) => {
    window.location.href = "../HTML/Login.html";
});
