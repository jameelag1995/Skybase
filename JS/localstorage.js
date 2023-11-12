export const usersInfo = [{email:'test@gmail.com',password:'pasWor@d1',isAdmin:true,currentUser:true}];

const flights = [
    {
        id:0,
        from: "Tel aviv",
        to:'amsterdam',
        price: 40,
        dates:[
            {depart: new Date ('11.24.2023')},
            {return: new Date ('12.1.2023')}
        ]
    },
    {
        id:1,
        from: "Tel aviv",
        to:'london',
        price: 75,
        dates:[
            {depart: new Date ('11.28.2023')},
            {return: new Date ('12.12.2023')}
        ]
    },
    {
        id:2,
        from: "Athens",
        to:'Prague',
        price: 95,
        dates:[
            {depart: new Date ('11.28.2023')},
            {return: new Date ('12.12.2023')}
        ]
    },
    {
        id:3,
        from: "Berlin",
        to:'Prague',
        price: 22,
        dates:[
            {depart: new Date ('11.28.2023')},
            {return: new Date ('12.12.2023')}
        ]
    },
    {
        id:4,
        from: "London",
        to:'Berlin',
        price: 100,
        dates:[
            {depart: new Date ('11.28.2023')},
            {return: new Date ('12.12.2023')}
        ]
    },
];