import avatarImg from "../assets/images/avatar.jpg";
import song from "../assets/audio/ManofWar.mp3";
import linkthumb001 from "../assets/images/link-thumb-001.jpg";
import linkthumb002 from "../assets/images/link-thumb-002.jpg";
import cover from "../assets/images/cover.jpg";

export const CONFIG = {
  name: "グッドマン",
  bio: "弱者に希望を与える",
  avatar: avatarImg,                    // ← Correto
  music: {
    src: song,
    title: "Man of War",
    artist: "Radiohead",
    cover: cover,
  },
  socials: [
    { id: "letterboxd", label: "Letterboxd", href: "https://boxd.it/4Y8vD" },
    { id: "serialized", label: "Serialized", href: "https://www.serializd.com/user/Augustbkw" },
    { id: "backloggd",  label: "Backloggd",  href: "https://bckl.gg/sPya" },
    { id: "github",     label: "GitHub",     href: "https://github.com/Augustofabg" },
    { id: "linkedin",   label: "LinkedIn",   href: "https://www.linkedin.com/in/augustofbg" },
  ],
  links: [
    {
      title: "私の混乱",
      sub: "プレイリスト",
      href: "https://open.spotify.com/playlist/0SNCgr7iteoCnEWyAqPvYk?si=18f7dea89e9c40da",
      img: linkthumb001,
    },
    {
      title: "このプロジェクト",
      sub: "バイオスタイル",
      href: "https://github.com/Augustofabg/BioStyle.git",
      img: linkthumb002,
    },
  ],
};