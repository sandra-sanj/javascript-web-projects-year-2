import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// cat example
const cats = [
  {
    cat_id: 1,
    name: 'Sulo',
    birthdate: '2018-01-01',
    weight: 10,
    owner: 'Jussi',
    image: 'https://loremflickr.com/320/240/cat',
  },
  {
    cat_id: 2,
    name: 'Söpö',
    birthdate: '2024-01-01',
    weight: 8,
    owner: 'Henni',
    image: 'https://loremflickr.com/320/240/cat',
  },
];

app.get('/api/v1/cat', (req, res) => {
  res.json(cats);
});

app.get('/api/v1/cat/:id', (req, res) => {
  const cat = cats.find((cat) => Number(cat.cat_id) === Number(req.params.id));
  console.log(cat);

  // send 404 code when cat is undefined
  if (cat) {
    res.json(cat);
  } else {
    //res.sendStatus(404);
    res.status(404).json({message: `No cat with id ${req.params.id}`});
  }
});

// load all files in "public" folder to root in folder "public"
app.use('/public', express.static('public')); // example address: "http://127.0.0.1:3000/public/index.html"

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*app.get('/', (req, res) => {
  res.send('Hello World!');
});*/

/*app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});*/
