# Snakes And Ladders

A desktop implementation of the classic Snakes And Ladders board game built with Electron, HTML, CSS, and JavaScript.

## Features

* Classic Snakes And Ladders gameplay
* Two-player local mode
* Dice rolling system
* Snake and ladder board mechanics
* Windows desktop application
* Open source

## Installation

### Windows

Download the latest MSI installer from the project's releases page and run it.

### Portable Version

Download the EXE release and run it directly.

## Building from Source

### Requirements

* Node.js
* pnpm (recommended)

### Install Dependencies

```bash
pnpm install
```

### Run the Application

```bash
pnpm start
```

### Build the Windows Installer

```bash
pnpm run dist
```

The generated files will be placed in the `dist` directory.

## Project Structure

```text
.
├── assets/
├── game.js
├── index.html
├── LICENSE
├── main.js
├── package.json
├── README.md
└── style.css
```

## Releases

Release packages may include:

* Windows MSI installer
* Portable EXE build
* Source code ZIP archive
* Source code TAR.XZ archive
* SHA256 checksums

## Roadmap

### Version 1.1

* Improved board graphics
* Visual snakes and ladders on the board
* Better game presentation
* Additional polish and bug fixes

### Future Versions

* Sound effects
* Animated movement
* Additional themes
* Enhanced game options
* Save and load support

## License

Copyright (C) 2026 Jacob Yee

This project is licensed under the GNU General Public License v3.0 or later (GPL-3.0-or-later).

See the LICENSE file for details.
