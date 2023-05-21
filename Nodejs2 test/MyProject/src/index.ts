import { AppDataSource } from "./data-source"
import { Active } from "./entity/Active"
import { Adatok } from "./entity/Adatok"
import { Hiba } from "./entity/Hiba"
import express from 'express';
import { configureSocketServer } from "./socketServer";
import cors from 'cors';

AppDataSource.initialize().then(async () => {

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
  }));

app.get('/hibak', async (req, res) => {
    try {
      const hibaRepository = AppDataSource.getRepository(Hiba);
      const hibak = await hibaRepository.find();
      res.status(200).json(hibak);
    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Error retrieving data from database');
    }
  });

  app.post('/active', async (req, res) => {
    const bool = req.body.bool;
    const name = req.body.name;

    try {
      const activeRepository = AppDataSource.getRepository(Active);
      if (bool === 1) {
        await activeRepository.delete({ Komp: name });
      } else {
        const activeData = activeRepository.create({ Komp: name });
        await activeRepository.save(activeData);
      }
      res.status(200).send('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Error updating data');
    }
  });
  app.post('/timediagram', async (req, res) => {
    const korabb = req.body.korabb;
    const kesobb = req.body.kesobb;
    const komponens = req.body.komponens;

    try {
      const adatokRepository = AppDataSource.getRepository(Adatok);
      const adatok = await adatokRepository.createQueryBuilder("adatok")
        .where("adatok.Felvet BETWEEN :korabb AND :kesobb", { korabb, kesobb })
        .andWhere("adatok.Komponens = :komponens", { komponens })
        .getMany();
      res.status(200).json(adatok);
    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Error retrieving data from database');
    }
  });

  app.get('/active', async (req, res) => {
    try {
      const activeRepository = AppDataSource.getRepository(Active);
      const activeData = await activeRepository.find();
      res.status(200).json(activeData);
    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Error retrieving data from database');
    }
  });

app.post('/generat', async (req, res) => {
    const name = req.body.name;
    const ertek = req.body.ertek;
    const bool = req.body.bool;

    try {
      if (bool === 1) {
        const adatokRepository = AppDataSource.getRepository(Adatok);
        const adatok = adatokRepository.create({ Komponens: name, Adat: ertek });
        await adatokRepository.save(adatok);
        res.status(200).send('Data added to adatok');
      } else if (bool === 0) {
        const hibaRepository = AppDataSource.getRepository(Hiba);
        const hiba = hibaRepository.create({ Komponens: name, Adat: ertek });
        await hibaRepository.save(hiba);
        res.status(200).send('Data added to hiba');
      } else {
        res.status(400).send('Invalid bool value');
      }
    } catch (error) {
      console.error('Error adding data to database:', error);
      res.status(500).send('Error adding data to database');
    }
  });

  console.log('Initializing database...');
const server = app.listen(4444, () => {
    console.log('Listening on port 4444...');
  });

  configureSocketServer(server);

}).catch(error => console.log(error))
