export const forms = [
  { id: 'kinetic', name: 'Kinetic', label: 'Batidas cinéticas', accent: '#43d8ff', video: 'movie/DJ-Sona-Kinetic2.mp4', image: 'icon3.jpg', description: 'Uma energia pulsante, com tons azuis e ritmo acelerado.' },
  { id: 'concussive', name: 'Concussive', label: 'Impacto e intensidade', accent: '#ff748d', video: 'movie/DJ-Sona-Concussive2.mp4', image: 'icon1.jpg', description: 'Luzes vermelhas, graves fortes e uma presença marcante.' },
  { id: 'ethereal', name: 'Ethereal', label: 'Atmosfera etérea', accent: '#7af3c9', video: 'movie/DJ-Sona-Ethereal2.mp4', image: 'icon2.jpg', description: 'Tons verdes, melodia suave e uma ambientação envolvente.' }
];
export const asset = (path) => import.meta.env.BASE_URL + path;
