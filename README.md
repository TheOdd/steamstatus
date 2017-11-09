# steamstatus
----
`steamstatus` is a command-line tool that checks [Steam][1]'s various servers for being online and what their response time is. It uses the [Steam Gauges][2] API to get this data.

## Usage

    steamstatus

That's it!

## Example output

    Steam Community
        Online:    ✔
        Ping time: 19 ms
    Steam Store
        Online:    ✔
        Ping time: 38 ms
    Steam User API
        Online:    ✔
        Ping time: 24 ms


## Installation

    npm install --global steamstatus
    
[1]:https://steampowered.com
[2]:https://steamgaug.es