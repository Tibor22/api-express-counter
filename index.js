//Include the express library
const express = require("express")
//Include the morgan middleware
const morgan = require("morgan")
//Include the cors middleware
const cors = require("cors")

let {counter,counters} = require('./data/counter.js')

//Create a new express application
const app = express()

//Tell express we want to use the morgan library
app.use(morgan("dev"))
//Tell express we want to use the cors library
app.use(cors())

// turn incoming json into javascript
app.use(express.json())

//Start up our server
const port = 3030
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}/`)
})


app.get('/counter', (req, res) => {

    res.json(counter)
})
app.post('/counter/increment', (req, res) => {
    counter.counter++
    res.json(counter)
})

app.post('/counter/decrement', (req, res) => {
    counter.counter--
    res.json(counter)
})
app.post('/counter/double', (req, res) => {
    counter.counter *= 2
    res.json(counter)
})

app.delete('/counter', (req, res) => {
    const current = {...counter}
    counter.counter  = 0;
    res.json(current)
})
app.put('/counter', (req, res) => {
    const isEmpty = Object.keys(req.query).length === 0;
 
    if(!isEmpty) {
    counter.counter = +req.query.value
    return  res.json(counter)
    }
    res.json(counter)

})
app.post('/counter/:id/increment', (req, res) => {
    const id = req.params.id;
    if(counters.some(counter => {
      return counter[id] !== undefined
    })) {
    } else {
        counters.push({[id]: {counter :0}})
    }
    let changedCounter;
    counters= counters.map(counter1=> {
        if(counter1[id]) {
            changedCounter = counter1[id]
            counter1[id].counter++
           return counter1
        }else return counter1
     })
    res.json(changedCounter)

})
app.post('/counter/:id/decrement', (req, res) => {
    const id = req.params.id;
    if(counters.some(counter => {
        return counter[id] !== undefined
      })) {
      } else {
          counters.push({[id]: {counter :0}})
      }
    let changedCounter;
    counters= counters.map(counter1=> {
        if(counter1[id]) {
            changedCounter = counter1[id]
            counter1[id].counter--
           return counter1
        }else return counter1
     })
    res.json(changedCounter)

})
app.post('/counter/:id/double', (req, res) => {
    const id = req.params.id;
    if(counters.some(counter => {
        return counter[id] !== undefined
      })) {
      } else {
          counters.push({[id]: {counter :0}})
      }

    let changedCounter;
    counters= counters.map(counter1=> {
        if(counter1[id]) {
            changedCounter = counter1[id]
            counter1[id].counter *= 2
           return counter1
        }else return counter1
     })
    res.json(changedCounter)

})



app.get('/counter/:id', (req, res) => {
    const id = req.params.id;
    const findCounter = counters.find(counter=> {
       if(counter[id]) return counter[id]
    })

    console.log(findCounter);
    res.json(findCounter[id])
})

app.delete('/counter/:id', (req, res) => {
    const id = req.params.id;
    const findCounter = counters.find(counter=> {
       if(counter[id]) return counter[id]
    })

    if(!findCounter) return  res.json('No counter found')

  counters =   counters.filter(counter=> findCounter !== counter)

    console.log(counters);

    console.log(findCounter);
    res.json(findCounter[id])
})