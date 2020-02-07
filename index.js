const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const fetch = require('node-fetch');

const {getMessage} = require('./PokemonMessage');

const PORT = process.env.PORT || 5000;
const USER = "ApiSoldai";

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) =>{
    console.log('We have a new connection');

    socket.on('join', () =>{
        const message = {
            user: USER,
            text: "Bienvenido a la api en donde podras saber sonbre tus pokemons, preguntame algo :)"
        };
        socket.emit('join', message);
    })

    socket.on('sendMessage', (question, callback) =>{
        const urlapibot = `http://beta.soldai.com/bill-cipher/askquestion?session_id=987654321&key=fd030428c4c74926c32b0cf1229aea1dfbbe775f&log=1&question=${question}`;
        fetch(urlapibot)
        .then(res => res.json())
        .then(json => {
            //console.log(json);
            const data = json.current_response.message.split(' ');
            const pokemon = data[0];
            const askabout = data[2].trim();
            const urlapipokemon = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
            fetch(urlapipokemon)
            .then(res => res.json())
            .then(pokejson =>{
                //console.log(pokejson);
                const pokeresponse = getMessage(askabout,pokejson);
                const newmsg = {
                    user: USER,
                    text: pokeresponse
                }
                socket.emit('message', newmsg);
            }).catch(error =>{
                console.log(error);
                const errormessage = {
                    user: USER,
                    text: "Hubo un error con la api de pokemon pregunte más tarde"
                }
                socket.emit('message', errormessage);
            });
        }).catch(err =>{
            console.log(err);
            const errmessage = {
                user: USER,
                text: "Hubo un error con el bot vuelva a preguntar en un rato"
            }
            socket.emit('message', errmessage);
        });
        callback();
    });

    socket.on('disconnect', () =>{
        console.log('User had left!!!');
    })
})

app.use(router);
app.use(cors());

server.listen(PORT, () =>{
    console.log(`server run on port: ${PORT}`);
})