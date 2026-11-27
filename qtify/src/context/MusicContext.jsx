import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import previewTrack from "../assets/music.mp3";

export const MusicContext = createContext({
  selectedSong: null,
  isPlaying: false,
  progress: 0,
  playSong: () => {},
  togglePlay: () => {},
});

export function MusicProvider({ children }) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const playSong = useCallback((song) => {
    setSelectedSong(song);
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setProgress(0);
    setIsPlaying(true);
    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.ended || progress >= 100) {
      audio.currentTime = 0;
      setProgress(0);
      setIsPlaying(true);
      audio.play().catch(() => setIsPlaying(false));
      return;
    }

    if (audio.paused) {
      setIsPlaying(true);
      audio.play().catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  }, [progress]);

  const value = useMemo(
    () => ({ selectedSong, isPlaying, progress, playSong, togglePlay }),
    [selectedSong, isPlaying, progress, playSong, togglePlay]
  );

  return (
    <MusicContext.Provider value={value}>
      <audio ref={audioRef} src={previewTrack} preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}