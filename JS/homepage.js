import {usersInfo,flights} from "./localstorage.js";
console.log(usersInfo[0]);
let currUser = usersInfo.filter(user => user.currentUser === true)[0];
const username = document.getElementById('username');
const addFlight = document.getElementById('add-flight');


if(currUser.isAdmin === true){
    addFlight.style.display = 'block';
    username.innerText = `Admin ${currUser.email}`;
} else{
    addFlight.style.display = 'none';
    username.innerText = `${currUser.email}`;
}

const flightsBoard = document.getElementById('flights-board');
showTickets(flights);

function showTickets(flightsArr){
    flightsBoard.innerHTML = '';
    flightsArr.forEach(flight =>{
        let ticket = document.createElement('div');
        ticket.innerHTML = `<div id="from-to">${flight.from} &#8594; ${flight.to}</div>
        <div id="departure-return-dates">${flight.dates[0].depart.toDateString()} &#8594; ${flight.dates[1].return.toDateString()}</div>
        <div id="price">${flight.price}$ <button class="btn add-to-cart">Add to Cart</button><button class="btn edit-price">Edit Price</button></div>`;
        ticket.classList.add('ticket');
        flightsBoard.append(ticket);
    });
    
}


addFlight.addEventListener('submit', e =>{
    e.preventDefault();
    const from = document.getElementById('add-flight-from').value;
    const to = document.getElementById('add-flight-to').value;
    const price = document.getElementById('add-flight-price').value;
    const depart = new Date (document.getElementById('add-flight-departure-date').value);
    const returnDate = new Date (document.getElementById('add-flight-return-date').value);
    let currFlight = {from,to,price,dates:[{depart},{return:returnDate}]};
    console.log(currFlight);
    flights.unshift(currFlight);
    showTickets(flights);
});

const sortBtn = document.getElementById('sort-by-price-btn');
sortBtn.addEventListener('click', e =>{
    const sortedFlights = flights.sort((flightA,flightB) =>{
        return flightA.price - flightB.price;
    });
    showTickets(sortedFlights);
});

const searchFlight = document.getElementById('search-flight');
searchFlight.addEventListener('submit', e =>{
    const filteredFlights = flights.filter(flight => {
        
    })
})


