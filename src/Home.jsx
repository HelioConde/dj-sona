import React, { useRef, useEffect, useState } from "react"; // Importe o useEffect aqui
import "./Home.css";
import Movie1 from "/movie/DJ-Sona-Concussive2.mp4";
import Movie2 from "/movie/DJ-Sona-Ethereal2.mp4";
import Movie3 from "/movie/DJ-Sona-Kinetic2.mp4";
import icon1 from "/icon1.jpg";
import icon2 from "/icon2.jpg";
import icon3 from "/icon3.jpg";

function Home() {
  const [backgroundVideo, setBackgroundVideo] = useState(Movie1);

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
    if (video.muted == true) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  }
  return (
    <>
      <div className="video-background">
        <video autoPlay muted loop id="myVideo" className="video-element">
          <source src={backgroundVideo} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
      </div>
      <main>
        <div className="select">
          <div
            className="dj-form kinetic"
            onMouseEnter={() => handleMouseEnter("kinetic")}
            onMouseLeave={() => handleMouseLeave("kinetic")}
          >
            <img src={icon3} className="iconDjSone iconDjSone1" alt="" />
          </div>
          <div
            className="dj-form concussive"
            onMouseEnter={() => handleMouseEnter("concussive")}
            onMouseLeave={() => handleMouseLeave("concussive")}
          >
            <img src={icon1} className="iconDjSone iconDjSone2" alt="" />
          </div>
          <div
            className="dj-form ethereal"
            onMouseEnter={() => handleMouseEnter("ethereal")}
            onMouseLeave={() => handleMouseLeave("ethereal")}
          >
            <img src={icon2} className="iconDjSone iconDjSone3" alt="" />
          </div>
        </div>
      </main>
      <button className="sound" onMouseUp={() => muted()}>
        ?
      </button>
    </>
  );
}

export default Home;
