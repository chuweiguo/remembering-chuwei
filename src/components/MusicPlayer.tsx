import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const PLAYLIST_ID = 'PL3YtK8tDoOLzg7lHZ9SNtH60xDqqGvkTV';

export function MusicPlayer() {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = initPlayer;

    if (window.YT && window.YT.Player) {
      initPlayer();
    }

    function initPlayer() {
      if (playerRef.current) return;
      
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '0',
        width: '0',
        playerVars: {
          listType: 'playlist',
          list: PLAYLIST_ID,
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            // Shuffle the playlist
            event.target.setShuffle(true);
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            // When playlist ends, restart it
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(50);
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div className="hidden">
        <div ref={containerRef} />
      </div>

      {/* Floating Mute/Unmute Button */}
      {isReady && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-memorial-gold text-white shadow-lg hover:bg-memorial-gold/90 transition-all duration-300 hover:scale-110 animate-fade-in"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
      )}
    </>
  );
}
