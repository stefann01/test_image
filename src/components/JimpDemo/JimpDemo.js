import Jimp from "jimp";
import { useEffect, useState } from "react";
import "./JimpDemo.css";

export function JimpDemo({ imageUrl, x, y, width, height }) {
  const [jimpImage, setJimpImage] = useState(undefined);

  const [image, setImage] = useState(undefined);
  const [transformedImage, setTransformedImage] = useState(undefined);
  // loading an image every time imageUrl changes
  useEffect(() => {
    const loadImage = async () => {
      // generating the Jimp data structure
      // loading an image from an URL
      const jimpImage = await Jimp.read(imageUrl);
      setJimpImage(jimpImage);

      // transforming jimpImage into its Base64 representation
      // and storing it
      const image = await jimpImage.getBase64Async(Jimp.MIME_JPEG);
      setImage(image);
    };

    loadImage();
  }, [imageUrl, x, y, height, width]);

  // generating the transformed image
  // as soon as the Jimp data structure is ready
  useEffect(() => {
    if (jimpImage) {
      const transformImage = async () => {
        // cropping the image by using the x, y, width, and height
        // received from the props
        await jimpImage.resize(10, 10).grayscale();

        // storing the transformed image
        // in Base64 format
        const transformedImage = await jimpImage.getBase64Async(Jimp.MIME_JPEG);
        setTransformedImage(transformedImage);
        console.log(jimpImage.bitmap.data);
        console.log(jimpImage.bitmap.width);
        console.log(jimpImage.bitmap.height);
      };

      transformImage();
    }
  }, [jimpImage, x, y, height, width]);

  const getImageData = () => {
    let elements = [];
    for (let i = 0; i < jimpImage.bitmap.width; i++) {
      for (let j = 0; j < jimpImage.bitmap.height; j++) {
        const pixelIndex = (i + j * jimpImage.bitmap.width) * 4;
        const r = jimpImage.bitmap.data[pixelIndex + 0];
        const g = jimpImage.bitmap.data[pixelIndex + 1];
        const b = jimpImage.bitmap.data[pixelIndex + 2];
        elements.push(
          <div
            style={{
              width: "5px",
              height: "5px",
              background: `rgb(${r}, ${g}, ${b})`
            }}
          ></div>
        );
      }
    }
    return elements;
  };

  return image && jimpImage ? (
    <>
      {/* <h1>Original Image</h1> */}
      {/* <img className="originalImage" src={image} alt="Original" /> */}
      <h1>Transformed Image</h1>
      <img
        width={400}
        height={400}
        className="transformedImage"
        src={transformedImage}
        alt="Transformed"
      />
      <div
        style={{ display: "grid", "grid-template-columns": "auto auto auto" }}
      >
        {/* {getImageData()} */}
      </div>
    </>
  ) : (
    <>Loading...</>
  );
}
