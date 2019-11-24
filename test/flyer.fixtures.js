

function makeUsersArray(){
    return [
        {
            firstname: 'Jane', 
            lastname: 'Smith',
            email: 'jane.smith@test.com',
            username: 'jsmith',
            user_password: 'apassword'
        },
        {
            firstname: 'Anita', 
            lastname: 'Jones',
            email: 'anita.jones@test.com',
            username: 'ajones',
            user_password: 'apassword' 
        },
    ]
}


function makeChildrenArray(){
    return [
        {
            
            childname: "Dick",
            parentid: 2,
        },
        {
            
            childname: "Sally",
            parentid: 1
        },
        {
            
            childname: "Jane",
            parentid: 1
        },
    ]
}

function makeBuffers(filename){
    
    const buffer = require('buffer');
    const path = require('path');
    const fs = require('fs');
    
    let myPromise = new Promise((resolve, reject)=>{
        fs.readFile(path.join(__dirname,'/assets/',filename),function(error,data){
            //console.log(path.join(__dirname,'/assets/',filename))
            if(error){
            throw error;
            }else{
            var buf = Buffer.from(data);
            base64 = buf.toJSON('base64');
            //console.log('Base64 of ddr.jpg :' + base64.type);
            resolve(base64);
            }
        });
    });
        return myPromise

}

function makeFlyersArray(values){
    
    const cornMaze = makeBuffers('Corn-Maze-Flyer.jpg')
    //console.log(cornMaze)
    // const buffer = require('buffer');
    // const path = require('path');
    // const fs = require('fs');
    
    // let myPromise = new Promise()

  
    //     fs.readFile(path.join(__dirname,'/assets/',filename),function(error,data){
    //         console.log(path.join(__dirname,'/assets/',filename))
    //         if(error){
    //         throw error;
    //         }else{
    //         var buf = Buffer.from(data);
    //         base64 = buf.toJSON('base64');
    //         console.log('Base64 of ddr.jpg :' + base64.type);
    //         myPromise.resolve(base64);
    //         }
    //     });


    // Promise.all([
    //     (resolve),
    //     makeBuffers(resolve),
    //     makeBuffers(resolve)
    // ]).then(([cornmaze, camping, aftershool]) =>{
    //     console.log(cornmaze)
    // })
    //const cornMazeBuffer = Promise.makeBuffers(filename)
    // const prefix = 'data:image/jpeg;base64,'
    // const cornmaze = fs.readFile(cornMazeFlyer)
    // .toString('base64')
    // console.log(cornmaze)
    return [
        [
            {
                id: 1,
                title: "Corn Maze",
                eventlocation: "Best Corn Maze",
                flyerimage: cornMaze,
                eventstartdate: "10/15/19 15:30",
                eventenddate: "10/15/19 17:00",
                actiondate: "10/10/19",
                flyeraction: "RSVP",
                category: "school",
            },
            {
                id: 2,
                title: "Field Trip",
                eventlocation: "Washington D.C.",
                flyerimage: 'z',
                eventstartdate: "11/13/19 13:00",
                eventenddate: "11/13/19 15:00",
                actiondate: "9/5/19",
                flyeraction: "Send Permission Slip",
                category: "school",
            },
            {
                id: 3,
                title: "Camping",
                eventlocation: "Camp Lost In the Woods",
                flyerimage: '',
                eventstartdate: "9/3/19 9:30",
                eventenddate: "9/4/19 10:30",
                actiondate: "8/20/19",
                flyeraction: "Pay",
                category: "school",
            },
        ],
    ]
}


module.exports = {makeUsersArray,makeChildrenArray, makeBuffers, makeFlyersArray}