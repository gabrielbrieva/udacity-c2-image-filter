import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and return the filtered image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    a filtered JPEG image as buffer
export async function filterImageFromURL(inputURL: string, greyscale: boolean = true,
    w: number = 256, h: number = Jimp.AUTO): Promise<Buffer> {

    try {
        let photo: Jimp = await Jimp.read(inputURL);

        // resize
        if (w > Jimp.AUTO || h > Jimp.AUTO)
            photo = photo.resize(w, h);

        if (greyscale)
            photo = photo.grayscale();

        return await photo
            .quality(75) // set JPEG quality
            .getBufferAsync(Jimp.MIME_JPEG);

    } catch {
        return null;
    }
}