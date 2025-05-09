import React from 'react';

const ImageShow: React.FC = (props: any) => {
  console.log(props);

  const baseUrl = 'http://localhost:5000/static/';
  const imageUrl = props.record.params.url;

  return (
    <div>
      {imageUrl ? (
        <img
          src={`${baseUrl}${imageUrl}`}
          alt="Image"
          style={{ height: '200px' }}
        />
      ) : (
        <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
          Изображение отсутствует
        </p>
      )}
    </div>
  );
};

export default ImageShow;
