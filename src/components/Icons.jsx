import { MdGames } from "react-icons/md";
import { TbDeviceTv } from "react-icons/tb";
import { SiLetterboxd } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  MdPlayArrow,
  MdPause,
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeUp,
  MdVisibility,
} from "react-icons/md";

export const Icons = {
  Letterboxd: () => (
    <SiLetterboxd size={30} />
  ),

  Serialized: () => (
    <TbDeviceTv size={22} />
  ),

  Backloggd: () => (
    <MdGames size={22} />
  ),

  GitHub: () => (
    <FaGithub size={22} />
  ),

  LinkedIn: () => (
    <FaLinkedin size={22} />
  ),

  Play: () => (
    <MdPlayArrow size={18} />
  ),

  Pause: () => (
    <MdPause size={18} />
  ),

  Prev: () => (
    <MdSkipPrevious size={16} />
  ),

  Next: () => (
    <MdSkipNext size={16} />
  ),

  Volume: () => (
    <MdVolumeUp size={13} />
  ),

  Eye: () => (
    <MdVisibility size={14} />
  ),
};

export const SOCIAL_ICON = {
  letterboxd: Icons.Letterboxd,
  serialized: Icons.Serialized,
  backloggd: Icons.Backloggd,
  github: Icons.GitHub,
  linkedin: Icons.LinkedIn,
};