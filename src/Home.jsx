import React, { useRef, useEffect, useState } from "react"; // Importe o useEffect aqui
import "./Home.css";
import Movie1 from "/movie/DJ-Sona-Concussive2.mp4";
import Movie2 from "/movie/DJ-Sona-Ethereal2.mp4";
import Movie3 from "/movie/DJ-Sona-Kinetic2.mp4";
import icon1 from "/icon1.jpg";
import icon2 from "/icon2.jpg";
import icon3 from "/icon3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp, // Ícone de som ligado
  faVolumeMute, // Ícone de som desligado
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [backgroundVideo, setBackgroundVideo] = useState(Movie1);
  const [volume, setVolume] = useState(0.2); // Defina o volume inicial
  const videoRef = useRef(null);

  function handleMouseEnter(form) {
    if (form === "kinetic") {
      setBackgroundVideo(Movie3);
    } else if (form === "concussive") {
      setBackgroundVideo(Movie1);
    } else if (form === "ethereal") {
      setBackgroundVideo(Movie2);
    }
  }
  function handleMouseLeave() {}

  useEffect(() => {
    const video = document.getElementById("myVideo");
    const timer = video.currentTime;
    console.log(timer);
    video.load();
    video.currentTime = timer;
    video.play();
    document.getElementById("myVideo").volume = 0.02;
    video.currentTime = timer;
  }, [backgroundVideo]);

  function muted() {
    const video = document.getElementById("myVideo");
    video.muted = !isSoundOn; // Inverter o estado do som
    setIsSoundOn(!isSoundOn); // Inverter o estado no estado do React
  }

  function handleVolumeChange(e) {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    const video = videoRef.current;
    video.volume = newVolume;
  }

  return (
    <>
      <div className="video-background">
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          className="video-element"
          ref={videoRef}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
      </div>
      <main>
        <div className="select">
          <div
            className="dj-form kinetic"
            onMouseUp={() => handleMouseEnter("kinetic")}
          >
            <img src={icon3} className="iconDjSone iconDjSone1" alt="" />
          </div>
          <div
            className="dj-form concussive"
            onMouseUp={() => handleMouseEnter("concussive")}
          >
            <img src={icon1} className="iconDjSone iconDjSone2" alt="" />
          </div>
          <div
            className="dj-form ethereal"
            onMouseUp={() => handleMouseEnter("ethereal")}
          >
            <img src={icon2} className="iconDjSone iconDjSone3" alt="" />
          </div>
        </div>
      </main>
      <div className="volumeStyle">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <button className="sound" onClick={() => muted()}>
        {!isSoundOn ? (
          <FontAwesomeIcon icon={faVolumeUp} className="icon" /> // Ícone de som ligado
        ) : (
          <FontAwesomeIcon icon={faVolumeMute} className="icon" /> // Ícone de som desligado
        )}
      </button>
      <div className="fluter">Em devenvolvimentro</div>
    </>
  );
}

export default Home;
