const express = require('express')
const app = express()
const {Server} = require('socket.io')
const http = require('http')
const cors = require('cors')



app.use(cors())

const server = http.createServer(app)

//pass the server that you created in express to the socket io


const io = new Server(server, {

    cors:{

        //the purpose of the origin is to tell cors that it is ok to accept communication from the react localhost 3000

        origin:'http://localhost:3000',
        methods:['GET', 'POST']

    }

})


io.on('connection', (socket)=>{

    // console.log(`User connected: ${socket.id}`)

    socket.on('join_room', (data)=>{

        socket.join(data)
        console.log(`userwith id: ${socket.id}, joined room: ${data}`)

    })

    socket.on('send_message', (data)=>{

        // console.log(data)

        // emiiting the data that has been sent to the backend, to the frontend to that specific room id that has been passed....

        socket.to(data.room).emit('received-message', data)
    })

    // disconnecting from the server

    socket.on('disconnect', ()=>{

        console.log('disconnected from the socket', socket.id)
    })


})







server.listen(3001, ()=>{

    console.log('server is up')
})