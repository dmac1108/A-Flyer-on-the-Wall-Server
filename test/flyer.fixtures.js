




function makeChildrenArray(){
    return [
        {
            id: 1,
            childname: "Dick",
        },
        {
            id: 2,
            childname: "Sally",
        },
        {
            id: 3,
            childname: "Jane",
        },
    ]
}

function makeBuffers(filename){
    const buffer = require('buffer');
    const path = require('path');
    const fs = require('fs');
    
    let myPromise = new Promise()

  
        fs.readFile(path.join(__dirname,'/assets/',filename),function(error,data){
            if(error){
            throw error;
            }else{
            var buf = Buffer.from(data);
            base64 = buf.toJSON('base64');
            console.log('Base64 of ddr.jpg :' + base64.type);
            myPromise.resolve(base64);
            }
        });
        
    
        //const cornMazeBuffer = encode_base64('Corn-Maze-Flyer.jpg')
        
        
        
        // const afterSchoolBuffer = Promise.resolve(encode_base64('after-school-flyer.jpg'));

        // const campingBuffer = Promise.resolve(encode_base64('scoutcamping.jpg'));
        // Promise.all([cornMazeBuffer, afterSchoolBuffer, campingBuffer]).then(function(values){
        //     console.log(values);
        // });

        return myPromise

}


function makeFlyersArray(values){
    
    Promise.all([
        makeBuffers(),
        makeBuffers(),
        makeBuffers()
    ]).then(([cornmaze, camping, aftershool]) =>{

    })
    const cornMazeBuffer = Promise.makeBuffers(filename)
    

    return [
        [
            {
                id: 1,
                title: "Corn Maze",
                eventlocation: "Best Corn Maze",
                flyerimage: cornMazeBuffer,
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


module.exports = {makeChildrenArray, makeBuffers, makeFlyersArray}