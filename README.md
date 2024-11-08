> [!IMPORTANT]
> The current UI of this application is available only in Japanese.
> Since there are no complex operations at this time, we believe it can still be used even without understanding Japanese.
> We welcome PRs for localization support!

<h2 align="center">PlaylistManager</h2>
<div align="center">Youtube (music) playlist manager</div>

![PlaylistManagerDemo](./assets/PlaylistManagerDemo.gif)

## Features
- Manage youtube playlists from Web GUI
- Copy playlists
- Shuffle playlist items
- Merge playlists
- Delete playlists

## Roadmap
- [x] Copy playlists
- [x] Delete playlists
- [x] Shuffle playlist items
- [x] Merge playlists
- [ ] Extract specific artist's song from playlists
- [ ] Sort playlist items by artist name or song title
- [ ] Multi platforms support (Youtube, Spotify, Amazon music ...)

## How To Use
To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/), [pnpm](https://pnpm.io/) installed on your computer.  
From your command line:
```bash
# Clone this repository
$ git clone https://github.com/suzuki3jp/PlaylistManager.git

# Go into the repository
$ cd PlaylistManager

# Rename `app/sample.env` to `app/.env` and set the appropriate values

# Install dependencies
$ pnpm install

# Run the app
$ pnpm dev
```
## License

[MIT](./LICENSE)
