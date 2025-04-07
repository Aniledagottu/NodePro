import { Router } from 'express';
import bodyParser from 'body-parser';

const commonRoute = Router();
commonRoute.use(bodyParser.json());
commonRoute.use(bodyParser.urlencoded({ extended: true }));
commonRoute.get('/',(req, res) => {
  res
  .status(400)
  .send({data: "Common data"});
})

commonRoute.post('/', (req, res) =>{
  const {name, email, phoneNumber} = req.body;
  res
  .status(201)
  .send({data: `Dear ${name} your mail${email} and phone number: ${phoneNumber} got saved`});
})

export default commonRoute;