import express from 'express';
import Link from '../models/link';
import {ObjectId} from 'mongodb';
import {Links} from '../types';


const shorterRouter = express.Router();

shorterRouter.post('/', async (req, res, next) => {
  try {
    const {url} = req.body;

    if (!url) return res.status(400).send({error: "You should send url to make work this service."});

    let random = crypto.randomUUID();
    let splited = random.split('-');
    const links: Links[] = await Link.find();
    const filtered = links.filter(link => link.shortUrl === splited[0]);

    if (filtered.length > 0) {
      while (true) {
        const newRandom = crypto.randomUUID();
        const newSplitted = newRandom.split('-');
        const newFiltered = links.filter(link => link.shortUrl === newSplitted[0]);
        if (newFiltered.length < 1) {
          splited = newSplitted;
          break;
        }
      }
    }

    const linkData = {
      shortUrl: splited[0],
      originalUrl: url
    }
    const link = new Link(linkData);
    await link.save();

    return res.send(link);
  } catch (e) {
    next(e);
  }
});

shorterRouter.get('/', async (req, res, next) => {
  try {
    const links: Links[] = await Link.find();
    return res.send(links);
  } catch (e) {
    next(e);
  }
});

shorterRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: ObjectId;

    try {
      _id = new ObjectId(req.params.id);
    } catch (e) {
      return res.status(404).send({error: 'Wrong ObjectId.'});
    }

    const link: Links | null = await Link.findOne({_id});

    if (!link) return res.status(404).send({error: 'Not found'});

    res.send(link);

  } catch (e) {
    next(e);
  }
});
export default  shorterRouter;