import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const PLAYLIST_ID = 'PL3YtK8tDoOLzg7lHZ9SNtH60xDqqGvkTV';

export function MusicPlayer() {
  const { t } = useLanguage();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const [showInitialInfo, setShowInitialInfo] = useState(true);

  const updateCurrentSong = () => {
    if (playerRef.current?.getVideoData) {
      const videoData = playerRef.current.getVideoData();
      if (videoData?.title) {
        setCurrentSong(videoData.title);
      }
    }
  };

  // Hide initial info box after 3 seconds
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setShowInitialInfo(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

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
            // Get playlist length and start at random position
            const playlist = event.target.getPlaylist();
            if (playlist && playlist.length > 0) {
              const randomIndex = Math.floor(Math.random() * playlist.length);
              event.target.playVideoAt(randomIndex);
            } else {
              event.target.playVideo();
            }
          },
          onStateChange: (event: any) => {
            // Update playing state and song title
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              updateCurrentSong();
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
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

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.unMute();
      playerRef.current.setVolume(50);
      playerRef.current.playVideo();
    }
  };

  const skipToNext = () => {
    if (!playerRef.current) return;
    playerRef.current.nextVideo();
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div className="hidden">
        <div ref={containerRef} />
      </div>

      {/* Floating Music Controls */}
      {isReady && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 animate-fade-in"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Initial Info Box - shows on page load, fades after 3s */}
          {showInitialInfo && !isHovered && (
            <div className="bg-card/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-border max-w-xs animate-fade-in transition-opacity duration-500">
              <p className="font-medium text-sm text-foreground">{t('home.music.title')}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('music.clickToPlay')}</p>
            </div>
          )}

          {/* Current Song Name - shows on hover */}
          {currentSong && !showInitialInfo && (
            <div className={`bg-card/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border max-w-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <p className="text-xs text-foreground font-medium whitespace-nowrap">{currentSong}</p>
            </div>
          )}

          {/* Skip Button - only visible on hover */}
          <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={skipToNext}
                  className="p-3 rounded-full bg-memorial-earth/80 text-white shadow-lg hover:bg-memorial-earth transition-all duration-300 hover:scale-110"
                  aria-label={t('music.skip')}
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{t('music.skip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Play/Pause Button with Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={togglePlayPause}
                className="p-4 rounded-full bg-memorial-gold text-white shadow-lg hover:bg-memorial-gold/90 transition-all duration-300 hover:scale-110"
                aria-label={isPlaying ? t('music.pause') : t('music.play')}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="font-medium">{t('home.music.title')}</p>
              <p className="text-xs text-muted-foreground mt-1">{t('home.music.description')}</p>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open('https://music.youtube.com/playlist?list=PL3YtK8tDoOLzg7lHZ9SNtH60xDqqGvkTV', '_blank', 'noopener,noreferrer');
                }}
                className="inline-flex items-center gap-1 text-xs text-memorial-gold hover:underline mt-2 cursor-pointer"
              >
                {t('music.openPlaylist')}
                <ExternalLink className="w-3 h-3" />
              </button>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
}
