// components/ResponsiveYouTube.tsx
import React from 'react';

interface ResponsiveYouTubeProps {
  videoId: string;
  title?: string;
}

const ResponsiveYouTube: React.FC<ResponsiveYouTubeProps> = ({
  videoId,
  title = 'Conheça mais sobre nossos aparelhos:',
}) => {
  return (
    <section className="px-4 py-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
    </section>
  );
};

export default ResponsiveYouTube;
