import express from 'express';
import cors from 'cors';


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
// app.use('/comments', commentRouter);

// const run = async () => {
//   await fileDB.initNews();
//   await fileDB.initComments();
//
//   app.listen(port, () => {
//     console.log(`Server running on ${port} port.`);
//   });
// };
//
// void run();