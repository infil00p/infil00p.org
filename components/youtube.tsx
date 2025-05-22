import React from 'react';

type Props = {
  videoId: string;
}

const YouTube = ({ videoId }: Props) => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full my-8">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      />
    </div>
  );
};

export default YouTube;