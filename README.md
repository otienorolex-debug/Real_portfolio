# Personal Portfolio

A personal portfolio website with a 3D look. It combines CSS 3D effects (raised buttons, extruded headline, tilting cards) with a live Three.js scene running behind the page.

## Features

- **Live 3D background**: a metallic torus knot and a particle field built with Three.js. They follow the mouse and react to scrolling.
- **CSS 3D interface**: raised nav keys, extruded headline lettering, layered slabs, and cards that tilt toward the cursor.
- **Project showcase**: projects are rendered from a JavaScript array, so adding one is a single object.
- **Live demo window**: each project opens inside the portfolio in an iframe. Close it with the button, by clicking outside it, or with `Esc`.
- **Smooth navigation**: nav links scroll to Home, About Me, My Work and Contacts.
- **Responsive**: the layout adapts to phones and tablets.
- **Accessible**: visible keyboard focus, image `alt` text, and reduced-motion support.

## Projects Shown

| Project | Description |
| --- | --- |
| Jambo Mall & Shopping Centre | Localized e-commerce and delivery dashboard with order flows and delivery tracking |
| LedgerCo | Multi-currency expense and budget tracker with live exchange rates |
| Sentinel Link | Ad-route integrity engine that tracks click-through cost leaks |
| Scamfix | Viral claim and misinformation verification prototype |

## Tech Stack

- HTML5
- CSS3 (custom properties, 3D transforms, grid, flexbox)
- Vanilla JavaScript (ES6+)
- [Three.js](https://threejs.org/) (loaded from a CDN, no install needed)

## Project Structure

```
portfolio/
├── index.html      # Page structure and script loading
├── styles.css      # All styling, including the 3D effects
├── index.js        # Content, project cards, modal, tilt effect, navigation
├── scene.js        # Three.js 3D background scene
├── image.jpeg      # Hero photo
├── images (1).jpeg # About me photo
└── README.md

## Contact

- **Email:** rolexkelly254@gmail.com
- **GitHub:** [otienorolex-debug](https://github.com/otienorolex-debug)
- **Phone:** 0745183180
