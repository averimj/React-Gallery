import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = (props) => {
  console.log(props);
  const results = props.data;
  console.log(results);
  let photos;
  if (results.length > 0) {
    photos = results.map(photo =>
      <Photo url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
  } else {
    photos = <NotFound />
  }

  return (
    <div>
      <ul className='photo-list'>
        {photos}
      </ul>
    </div>
  );
}

export default PhotoList;
