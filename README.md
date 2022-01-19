# DiscordTimezoneRoles
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## Description
Show users timezones as a role within Discord. A handy bot for Discord servers with worldwide communities.

## Setup
Install required node modules
```sh
cd TimezoneRoles
npm install
```

Project uses [Slasher](https://github.com/Romejanic/slasher).

To update commands, run either `slasher` or `npx slasher` (`slasher` may not work on Windows machines) or [follow these setups](https://github.com/Romejanic/slasher/blob/master/docs/guides/getting-started.md#run-the-slasher-utility).

## Usage
DiscordTimezoneRoles currently has 3 inbuilt commands but more can be added via the `commands.json` file. <br>
`/settz <TIMEZONE>`: Sets user's own timezone <br>
`/removetz <TIMEZONE>`: Removes a timezone from user <br>
`/cleartz`: Clears all timezones from user. <br>

`<TIMEZONE>` is a timezone code. List of codes can be found in `timezones.json`

## License
This project is licensed under the [MIT] License - see the [LICENSE](https://github.com/ZeppelinGames/DiscordTimezoneRoles/blob/master/LICENSE) file for details

## Contributors
Thanks to [Bailey Gibbons](https://github.com/Bazzagibbs) for cleaning up my spaghetti code and [Jack Davenport](https://github.com/Romejanic) for cleaning up the project (and creating Slasher).

## Check out my other shit
<a href="http://www.twitter.com/Zeppelin_Games"><img src="https://image.flaticon.com/icons/png/512/124/124021.png" width="48"></a>
<a href="https://zeppelin-games.itch.io/"><img src="https://storage.webcatalog.app/catalog/itch-io/itch-io-icon-filled.png" width="48"></a>
<a href="http://www.github.com/ZeppelinGames"><img src="https://icon-library.com/images/github-icon-png/github-icon-png-29.jpg" width="48"></a>

[contributors-shield]: https://img.shields.io/github/contributors/ZeppelinGames/DiscordTimezoneRoles.svg?style=for-the-badge
[contributors-url]: https://github.com/ZeppelinGames/DiscordTimezoneRoles/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ZeppelinGames/DiscordTimezoneRoles.svg?style=for-the-badge
[forks-url]: https://github.com/ZeppelinGames/DiscordTimezoneRoles/network/members
[stars-shield]: https://img.shields.io/github/stars/ZeppelinGames/DiscordTimezoneRoles.svg?style=for-the-badge
[stars-url]: https://github.com/ZeppelinGames/DiscordTimezoneRoles/stargazers
[issues-shield]: https://img.shields.io/github/issues/ZeppelinGames/DiscordTimezoneRoles.svg?style=for-the-badge
[issues-url]: https://github.com/ZeppelinGames/DiscordTimezoneRoles/issues
[license-shield]: https://img.shields.io/github/license/ZeppelinGames/DiscordTimezoneRoles.svg?style=for-the-badge
[license-url]: https://github.com/ZeppelinGames/DiscordTimezoneRoles/blob/master/LICENSE
