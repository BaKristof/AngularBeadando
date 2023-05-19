

const app = require('express')();
const mysql = require('mysql');
const http = require('http').Server(app);
io = require('socket.io')(http, {
  cors: {origin : '*'}
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'beadando'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});



io.on('connection', (socket) => {
  console.log('a user connected');

  const inteID=setInterval(() => {

    connection.query('SELECT * FROM adatok WHERE `Felvet` IN (SELECT max(`Felvet`)FROM `adatok` GROUP by `Komponens`); ', (error, results) => {
      if (error) {
        console.error('Error getting data from database:', error);
        return;
      }
      else{
        io.emit('message', results);
      }

    });
  }, 1000);

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    clearInterval(inteID);
  });

});



http.listen(4444, () => {
  console.log('Listening on port 4444');
});


const express = require('express');
//const port = process.env.port || 5000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());


//aktiv legkésöbbi pontos adattal
//SELECT `Adat`,`Felvet` FROM `adatok` WHERE `Felvet` in (SELECT max(`Felvet`) FROM `adatok` WHERE `Komponens` in (SELECT `Name` FROM `active`) )


app.get('/generate', (req, res) => {

  connection.query('SELECT * FROM `hibak` ' , (error, results) => {
    if (error) {
      console.error('Error retrieving users from database:', error);
      res.status(500).send('Error retrieving users from database');
    } else {
      res.status(200).json(results);
    }
  });
});



app.get('/generatef', (req, res) => {

  connection.query('SELECT * FROM `active` ' , (error, results) => {
    if (error) {
      console.error('Error retrieving users from database:', error);
      res.status(500).send('Error retrieving users from database');
    } else {
      res.status(200).json(results);
    }

  });
});



app.post('/timediagram', (req, res) => {
  const korabb = req.body.korabban ;    //"2023-05-01 00:00:00"
  const kesobb = req.body.kesobb;       //"2023-05-15 00:00:00"
  connection.query('SELECT * FROM `adatok` WHERE `Felvet` BETWEEN ?  and ? AND `Komponens`= ?;' ,[korabb,kesobb,'valami'], (error, results) => {
    if (error) {
      console.error('Error retrieving users from database:', error);
      res.status(500).send('Error retrieving users from database');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/generat', (req, res) => {
  const name = req.body.name;
  const ertek = req.body.ertek;
  const bool = req.body.bool;
  if(bool === 3){
    connection.query('DELETE FROM `active` WHERE `Komp`= ?',name,  (error, result) )
  }
  else{
    connection.query('INSERT INTO active(Komp) VALUES (?)',name,  (error, result) => {
      
      if (error) {
        console.error('Error adding user to database:', error);
        res.status(500).send('Error adding user to database');
      } else {
        
        if(bool ===1){
          connection.query('INSERT INTO adatok(Komponens, Adat) VALUES (?, ?)',[name ,ertek],  (error, result) => {
            
            if (error) {
              console.error('Error adding user to database:', error);
              res.status(500).send('Error adding user to database');
            } else {
              res.status(200).send('User added to adatok');
            }
        });
      }
      else if (bool === 0){
        connection.query('INSERT INTO `hiba`(`Komponens`, `Adat`) VALUES (?, ?)', [ name,ertek]  , (error, result) => {
          
          if (error) {
            console.error('Error adding user to database:', error);
            res.status(500).send('Error adding user to database');
          } else {
            res.status(200).send('User added to hiba');
          }
        });
      };
    }
  });
}
  

});




