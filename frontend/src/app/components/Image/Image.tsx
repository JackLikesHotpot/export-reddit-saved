// import styles from './Image.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// import Image from 'next/image'

interface ImageProps{
  url: string;
  subreddit: string;
  title: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

const getImageDimensions = (imageUrl: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };

    img.onerror = (err) => {
      reject('Error loading image: ' + err);
    };

    img.src = imageUrl;
  });
};

// make resize image for below logic


// danbo site images always height or width 180, whichever one is larger
// 135x180 image is actually 850x1129
// largest side divided by 180 and then divide shorter side by that


const Artist: React.FC<ImageProps> = ({ url, subreddit, title }) => {
const [dimensions, setDimensions] = useState<ImageDimensions>();


  useEffect(() => {
    const fetchDimensions = async () => {
      try {
        const { width, height }: ImageDimensions = await getImageDimensions(url); // Await the image loading
        setDimensions({ width, height }); // Set dimensions in state
      } catch (error) {
        console.error("Error loading image dimensions:", error);
      }
    };

    fetchDimensions();
  }, [url]); // Re-run when `url` changes

  if (!dimensions) {
    return <div>Loading...</div>;
  }

  const { width, height } = dimensions;
  return (
    // <div className={styles['imageName']}>
    <div>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
      {/* Display or use the resized dimensions here */}
    </div>
  );
};

export default Artist;