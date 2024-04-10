import express from 'express';
import Link from '../models/link';
import {ObjectId} from 'mongodb';


const shorterRouter = express.Router();

shorterRouter.post('/', async (req, res, next) => {
  try {
    const {url} = req.body;

    if (!url) return res.status(400).send({error: "You should send url to make work this service."});

    const  random = crypto.randomUUID();
    const splitted = random.split('-');

    const linkData = {
      shortUrl: splitted[0],
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
    const links = await Link.find();
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

    const link = await Link.findOne({_id});

    if (!link) return res.status(404).send({error: 'Not found'});

    res.send(link);

  } catch (e) {
    next(e);
  }
});
export default  shorterRouter;