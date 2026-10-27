import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

// Deliver only referenced artwork and 3 videos. Never publish the entire public/ archive.
const source='public',target='dist';
const imageNames=['icon-dj-sona.png','icon1.jpg','icon2.jpg','icon3.jpg'];
const movieNames=['DJ-Sona-Kinetic2.mp4','DJ-Sona-Concussive2.mp4','DJ-Sona-Ethereal2.mp4'];
const files=[...imageNames.map(name=>name), 'font/BebasNeue-Regular.woff2'];
fs.mkdirSync(path.join(target,'font'),{recursive:true});
fs.mkdirSync(path.join(target,'movie'),{recursive:true});
for(const name of files){
 const from=path.join(source,name),to=path.join(target,name);
 if(!fs.existsSync(from))throw new Error('Arquivo de mídia não encontrado: '+from);
 fs.copyFileSync(from,to);
}
const check=spawnSync('ffmpeg',['-version'],{stdio:'ignore'});
const available=check.status===0;
let copiedBytes=0,outputBytes=0;
for(const name of movieNames){
 const from=path.join(source,'movie',name),to=path.join(target,'movie',name);
 if(!fs.existsSync(from))throw new Error('Vídeo ausente: '+from);
 copiedBytes+=fs.statSync(from).size;
 if(available){
  const result=spawnSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',from,
  '-vf','scale=960:-2','-c:v','libx264','-preset','veryfast','-crf','30',
  '-maxrate','1100k','-bufsize','2200k','-pix_fmt','yuv420p',
  '-c:a','aac','-b:a','96k','-movflags','+faststart',to],{stdio:'inherit'});
  if(result.status!==0)throw new Error('FFmpeg falhou em '+name);
 }else{
  console.warn('FFmpeg indisponível; mantendo vídeo original:',name);
  fs.copyFileSync(from,to);
 }
 outputBytes+=fs.statSync(to).size;
}
console.log('DJ Sona: 3 clipes, '+(copiedBytes/1048576).toFixed(1)+' MiB de entrada → '+(outputBytes/1048576).toFixed(1)+' MiB publicados.');
