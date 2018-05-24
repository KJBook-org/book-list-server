'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const pg = require( 'pg' );

const app = express();
const PORT = process.env.PORT;

const client = new pg.Client( process.env.DATABASE_URL );
client.connect();
client.on( 'error', err => console.error( err ) );

app.use( cors() );

app.use(express.json());
app.use(express.urlencoded({extend:true}));
app.get( '/', ( req, res ) => res.send( 'Testing 1, 2, 3' ));


app.get('/api/v1/books', (request, response) => {
  console.log(request.body);
  client.query(`SELECT * FROM books;`)
  .then(result => response.send(result.rows))
  .catch(console.error);
})

app.get('/api/v1/books/:id', (request, response) => {
  client.query(`SELECT * FROM books WHERE book_id = ${request.params.id}`)
  .then(result => response.send(result.rows))
  .catch(console.error)
})

app.get( '*', ( req, res ) => res.status( 403 ).send( 'This route does not exist.' ));

app.listen( PORT, () => console.log( `Listening on port: ${PORT}` ));


