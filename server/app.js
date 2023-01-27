const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3001;
const hostname  = '127.0.0.1';
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()


const corsOptions = {
    optionsSuccessStatus: 200,
     methods: '*'
}

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    
    
    fs.readFile('data.json', function (err, data) {
        res.end(data)
    })
    
   
});          


app.post("/api", jsonParser, (req, res) => {
    fs.readFile('data.json', function (err, data) {
        const json = JSON.parse(data)
        
         const newPost = {
            "date" :req.body.date, 
            "from": req.body.from,
            "to": req.body.to,
            "name": req.body.name,
            "guests": req.body.guests,
            "bookingTime": new Date().toLocaleString('en-GB', { year: "numeric", month: "long", day: "numeric"})
            
         }
         const date = req.body.date
         const Booked =  [req.body.guests, req.body.from, req.body.to] 
        
        json.reservations.push(newPost)
        
        if(!json.booked[date]) json.booked[date] = [Booked]
            else json.booked[date].push(Booked)
            
        fs.writeFile('data.json', JSON.stringify(json, null, 2), (err) => {
          if (err)
            console.log(err);
          else {
             console.log(req.body)
            console.log("File written successfully\n");
          }
        })
    })
    /*fs.watchFile(require.resolve('./data.json'), function () {
        console.log("Module changed, reloading...");
        delete require.cache[require.resolve('./data.json')]
        my_module = require('./data.json');
    }); */           
                
                
    
})

/*app.put("/api", jsonParser, (req, res) => {
    console.log(req.body)
    fs.readFile('data.json', function (err, filedata) {
        const data = JSON.parse(filedata)
        
   
        const postData = data.posts.filter((e) => e.postId === req.body.postId)[0]
        let post
        let liked
        console.log(postData)
       if(!postData.likedBy.length || !postData.likedBy.includes(req.body.id)) {
           postData.likedBy.push(req.body.id)
            post = {
                "id": postData.id,
                "postId": postData.postId,
                "post": postData.post,
                "likes": postData.likes + 1,
                "likedBy": postData.likedBy,
                "timeStamp": postData.timeStamp
            }
            liked = {
                "liked": true
            }
        } else if(postData.likedBy.includes(req.body.id)){
            postData.likedBy = postData.likedBy.filter((e) => e !== req.body.id)
            post = {
                "id": postData.id,
                "postId": postData.postId,
                "post": postData.post,
                "likes": postData.likes - 1,
                "likedBy": postData.likedBy,
                "timeStamp": postData.timeStamp
            }
            liked = {
                "liked": false
            }            
        }
  


      
    data.posts = data.posts.map((e) => e.postId === req.body.postId ? post : e )

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
    res.send(liked)
})
})
app.put("/edit", jsonParser, (req, res) => {
    console.log(req.body)
    fs.readFile('data.json', function (err, filedata) {
        const data = JSON.parse(filedata)
        
   
        const postData = data.members.filter((e) => e.id === req.body.id)[0]
            let firstname, lastname, role
            if(!req.body.firstName) firstname = postData.firstName
            else firstname = req.body.firstName
            if(!req.body.lastName) lastname = postData.lastName
            else lastname = req.body.lastName
            if(!req.body.role) role = postData.role
            else role = req.body.role
            post = {
                "id": postData.id,
                "firstName": firstname,
                "lastName": lastname,
                "role": role,
                "avatar": req.body.avatar ? req.body.avatar : postData.avatar
            }

      
    data.members = data.members.map((e) => e.id === req.body.id ? post : e )

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
    res.end('')
})
})*/

app.get("/menu", (req, res) => {
    
    
    fs.readFile('menu.json', function (err, data) {
        res.end(data)
    })
    
   
});
app.listen(port, hostname);