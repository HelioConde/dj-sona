import React, { useEffect, useRef, useState } from "react";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import "./Global.css";
const base = import.meta.env.BASE_URL;
const forms = [
  { id:"kinetic", title:"Kinetic", subtitle:"A energia do ritmo", image:"icon3.jpg", video:"DJ-Sona-Kinetic2.mp4", color:"#4fdaf3" },
  { id:"concussive", title:"Concussive", subtitle:"Sinta o impacto", image:"icon1.jpg", video:"DJ-Sona-Concussive2.mp4", color:"#f577b4" },
  { id:"ethereal", title:"Ethereal", subtitle:"Entre em outra dimensão", image:"icon2.jpg", video:"DJ-Sona-Ethereal2.mp4", color:"#8df2c1" }
];
function Header(){
 return <header className="site-header"><NavLink to="/" className="brand" aria-label="DJ Sona, início"><img src={base+"icon-dj-sona.png"} alt="" width="46" height="46"/><span>DJ <strong>SONA</strong></span></NavLink><nav aria-label="Navegação principal">{[["/","Início"],["/historia","História"],["/wallpapers","Wallpapers"],["/videos","Vídeos"]].map(([to,label])=><NavLink key={to} end={to==="/"} to={to}>{label}</NavLink>)}</nav><a className="github-link" href="https://github.com/HelioConde/dj-sona" target="_blank" rel="noopener noreferrer">GitHub ↗</a></header>
}
function Home(){
 const [current,setCurrent]=useState(forms[1]);
 const [muted,setMuted]=useState(true);
 const [volume,setVolume]=useState(.2);
 const [paused,setPaused]=useState(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
 const [mediaError,setMediaError]=useState(false);
 const player=useRef(null);
 useEffect(()=>{const video=player.current;if(!video)return;video.volume=volume;video.muted=muted;setMediaError(false);if(!paused)video.play().catch(()=>setPaused(true));},[current,paused,muted,volume]);
 const select=form=>{setCurrent(form);};
 const togglePlayback=()=>{setPaused(p=>!p);};
 return <main id="conteudo" className="home">
   <video ref={player} key={current.video} className="ambient-video" autoPlay={!paused} muted={muted} loop playsInline preload="metadata" poster={base+current.image} aria-hidden="true" onError={()=>setMediaError(true)}><source src={base+"movie/"+current.video} type="video/mp4"/></video>
   <div className="video-shade" aria-hidden="true"></div>
   <section className="hero-copy"><p className="eyebrow">EXPERIÊNCIA INTERATIVA • PROJETO DE FÃ</p><h1>Três formas.<br/><span>Uma só energia.</span></h1><p>Explore as atmosferas de DJ Sona. Escolha uma forma para transformar o cenário e controlar a trilha do vídeo.</p></section>
   <section className="form-picker" aria-label="Selecionar forma de DJ Sona">{forms.map(form=><button key={form.id} type="button" className={"form-card"+(current.id===form.id?" selected":"")} style={{"--form-accent":form.color}} onClick={()=>select(form)} aria-pressed={current.id===form.id}><img src={base+form.image} width="100" height="100" alt=""/><strong>{form.title}</strong><span>{form.subtitle}</span></button>)}</section>
   <section className="player-controls" aria-label="Controles de reprodução"><div className="track-label"><span className="status-dot" aria-hidden="true"></span><span>{current.title} <small>{mediaError?"Vídeo indisponível":paused?"Pausado":"Ambiente visual"}</small></span></div><button type="button" onClick={togglePlayback} aria-label={paused?"Reproduzir vídeo":"Pausar vídeo"}>{paused?"▶ Reproduzir":"Ⅱ Pausar"}</button><button type="button" onClick={()=>setMuted(v=>!v)} aria-pressed={!muted} aria-label={muted?"Ativar áudio":"Silenciar áudio"}>{muted?"♪ Ativar som":"♫ Silenciar"}</button><label className="volume-control">Volume <input aria-label="Volume do vídeo" type="range" min="0" max="1" step=".05" value={volume} onChange={e=>setVolume(Number(e.target.value))}/></label></section>
 </main>;
}
function History(){return <main id="conteudo" className="inner-page"><p className="eyebrow">UNIVERSO DJ SONA</p><h1>Uma experiência em três frequências.</h1><p>Este projeto independente celebra a identidade visual de DJ Sona e a transformação entre Kinetic, Concussive e Ethereal. A experiência foi criada para estudar React, interação e animação multimídia.</p><div className="feature-grid">{forms.map(f=><article className="info-card" key={f.id}><img src={base+f.image} width="100" height="100" alt=""/><h2>{f.title}</h2><p>{f.subtitle}</p></article>)}</div><p className="disclaimer">Projeto de fã, sem vínculo com a Riot Games. As personagens e artes originais pertencem a seus titulares.</p></main>}
function Wallpapers(){return <main id="conteudo" className="inner-page"><p className="eyebrow">GALERIA</p><h1>Wallpapers e atmosferas</h1><p>Uma seleção das artes usadas na experiência. Escolha uma forma para observar seus detalhes.</p><div className="feature-grid">{forms.map(f=><article key={f.id} className="info-card"><img src={base+f.image} alt={"Arte da forma "+f.title} className="gallery-art"/><h2>{f.title}</h2></article>)}</div></main>}
function Movies(){return <main id="conteudo" className="inner-page"><p className="eyebrow">VÍDEOS</p><h1>Três paisagens sonoras</h1><p>Assista aos vídeos originais disponíveis no projeto. Os controles de reprodução e áudio são ativados por você.</p><div className="movie-grid">{forms.map(f=><article className="info-card" key={f.id}><h2>{f.title}</h2><video controls preload="none" playsInline poster={base+f.image} aria-label={"Vídeo "+f.title}><source src={base+"movie/"+f.video} type="video/mp4"/>Seu navegador não suporta vídeo HTML5.</video></article>)}</div></main>}
export default function App(){return <HashRouter><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/historia" element={<History/>}/><Route path="/wallpapers" element={<Wallpapers/>}/><Route path="/videos" element={<Movies/>}/><Route path="*" element={<main id="conteudo" className="inner-page"><h1>Página não encontrada</h1><NavLink to="/">Voltar ao início</NavLink></main>}/></Routes><footer className="footer"><span>DJ Sona • Uma homenagem não oficial</span><span>Feito por Hélio Conde</span></footer></HashRouter>}