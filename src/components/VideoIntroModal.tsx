import { useEffect, useRef, useState } from 'react';

interface VideoIntroModalProps {
  videoId: string;
}

const VideoIntroModal = ({ videoId }: VideoIntroModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showUnmute, setShowUnmute] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const hasSeenVideo = localStorage.getItem('hasSeenIntroVideo');

    setTimeout(() => {
      if (!hasSeenVideo) {
        setShowModal(true);
      }
    }, 300);
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenIntroVideo', 'true');
    setShowModal(false);
  };

  const handleUnmute = () => {
    setShowUnmute(false);

    // Envia comando postMessage para o iframe do YouTube
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'unMute',
        args: [],
      }),
      '*'
    );
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl aspect-video sm:rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Fechar
        </button>

        {/* Botão "Ativar som" */}
        {showUnmute && (
          <button
            onClick={handleUnmute}
            className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200"
          >
            Ativar som
          </button>
        )}

        {/* Player com autoplay e mute */}
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&rel=0&playsinline=1`}
          title="Vídeo de apresentação"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};

export default VideoIntroModal;
