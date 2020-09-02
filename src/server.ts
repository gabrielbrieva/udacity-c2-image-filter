import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Gray Image Filter
  app.get("/filteredimage", async (req: express.Request, res: express.Response) => {
    const image_url: string = req.query.image_url;

    if (!image_url)
      return res.status(400).send({ message: '"image_url" is required' });

    let { width, height, greyscale } = req.query;

    if (greyscale)
      greyscale = parseInt(greyscale) > 0;

    if (width)
      width = parseInt(width);

    if (height)
      height = parseInt(height);

    res.set("Content-Type", "image/jpeg");
    res.send(await filterImageFromURL(image_url, greyscale, width, height));
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req: express.Request, res: express.Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();