# 🌌 BioStyle

A fully customizable **link-in-bio** page with music, animated backgrounds, and styled links.  
Perfect for showing your links, socials, and profile in a beautiful layout.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Customizable-111111?style=for-the-badge"/>
  <img src="https://img.shields.io/github/stars/yourusername/biostyle?style=social" alt="GitHub stars"/>
</p>

---

## 🎬 Preview

<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://i.imgur.com/kRVJ7bu.png" alt="Imagem 1" style="max-width: 100%; height: auto;" />
  <img src="https://i.imgur.com/Y3PIdRa.png" alt="Imagem 2" style="max-width: 100%; height: auto;" />
</div>

---

## ✨ Features

- 🎨 **Customizable Layout** – All profile data is in `bioConfig.js`.
- 🎵 **Built-in Music Player** – Play, pause, mute, and volume control with track info.
- 🖼️ **Music Cover Support** – Display album artwork for the current song.
- 🌌 **Animated Backgrounds** – Starfield or video backgrounds supported.
- ⌨️ **Typing Name Animation** – Animated typing effect for the profile name.
- 🔗 **Custom Link Cards** – Add unlimited links with title, subtitle, and thumbnail.
- 🌐 **Social Media Buttons** – Quick access buttons via `react-icons`.
- 📱 **Responsive Design** – Works on desktop and mobile seamlessly.
- ⚡ **Fast & Lightweight** – Built with React + Vite for optimal performance.
- 🧩 **Modular Components** – MusicPlayer, LinkCard, SocialBtn, and more.

---

## 📦 Installation

```bash
git clone https://github.com/Augustofabg/biostyle
cd biostyle
npm install
npm run dev
```

💡 Tip: Use VSCode for editing and live preview.

---

## ⚙️ Configuration

All user information is stored in:

```bash
config/bioConfig.js
```

You can customize the following:

### 1. Profile

Name & Bio – Change the displayed name and description.

Avatar Image – Update your profile picture.

### 2. Links

Link Cards – Add or edit links with title, subtitle, URL, and thumbnail.

### 3. Social Media Buttons

Configure which social icons appear and their respective links.

### 4. Music

Set background music with source, title, artist, and cover image.

### 5. Background Video

Use a custom video as the page background.

---

Edit in ``Home.jsx``:

```bash
<source src={backgroundVideo} type="video/mp4" />
```

Adding New Icons:

Import the new icon in ``Icons.jsx`` using react-icons:

```bash
import { YourIcon } from "react-icons/your-library";
```

Link the icon in ``bioConfig.js``:

```bash
export const SOCIAL_ICON = {
  newicon: Icons.YourIcon,
};
```

Add the icon to your socials array:

```bash
socials: [
  { id: "newicon", label: "New Icon", href: "https://example.com" },
];
```
---

## 🌐 Hosting on Vercel

To deploy BioStyle online:

Sign up at Vercel

Click New Project → Import Git Repository and select your repository.

Configure the project:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Click Deploy.
```

Vercel will generate a URL like:
```
https://biostyle.vercel.app
```

⚡ Every push to GitHub automatically triggers a redeploy.
