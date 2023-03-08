# Eevee-Animation-Project

This project is a part of Prototyping UX class lectured by Prof. Katie Seaborn from Tokyo Institute of Technology. The team include Natprawee Pattayawij (me), Nipun Mangkaja and Takuya Takahashi. The project was set up by Prof. Katie Seaborn. My contribution part is creating the shape of Eevee character by HTML/CSS, animating the character by Javascript and connecting to server side by Node.JS and socket.io.

The part after this is provided by Prof. Katie Seaborn.

## Project

Let's create socket monsters, aka sokémon. Now that we have the **visuals**, **movement**, **attributes and abilities**, and **voice** of our sokémon done, let's apply our knowledge of Node.js and Socket.IO so that our sokémon can **communicate** with other sokémon and **network** with other computers ... as well as participate in the **Battle Arena**.

## About our work - Team Eevee

Our work is a bit different from sensei. In our work, there are 3 parts from 3 files with ports.
- index.html port: 3001 (Wizard of Oz control part)
- index.js port: 3002 (socket.io)
- sokemon.html port: 9999 (Wizard of Oz showing part)

To access our prototype, run

<code>node index.js</code>

Then open Wizard of Oz control part with the link

<code>http://localhost:3001/</code>

and Wizard of Oz showing part with the link

<code>http://localhost:9999/</code>

After that, you could click on button Attack, Dodge and Cry in the control part to see interactions in both control part and showing part.

You may show showing part (port:9999) with other device by editing localhost to IP address after connecting with the same internet.


## Requirements

- :computer: Portable computer aka a laptop with speakers and wifi capabilities
- [Git](https://git-scm.com), our version control system
- [GitHub](https://github.com), our Git code repository :black_heart: (psst ... [get started here](https://docs.github.com/en/get-started) :eyes:)
- [Node.js®](https://nodejs.org) (and npm) for installing the server and peripherals
- [Socket.IO](https://socket.io), for communicating over a network with the [WebSocket](https://en.wikipedia.org/wiki/WebSocket) protocol
- [Express](https://expressjs.com), a basic web app framework
- [IP](https://github.com/indutny/node-ip), to easily get IP address information
- Terminal or Command Prompt to install and run everything

## Tips

- Make sure you install Express, Socket.IO, and IP:

```
npm install express@4
npm install socket.io
npm install ip
```

- Run the Node.js server via ``node index.js``
- Make sure your sokémon html file is ``index.html``
- Assuming port 3001, access via http://localhost:3001
- Use ``control-c`` to stop a Node.js process on the command line
- FYI:
 - Mac users: In Terminal, use ``ipconfig getifaddr en0`` to get your IP address on the network
 - Windows users: In Command Prompt, use ``ipconfig /all`` and look at the IPv4 Address
 - Consider using [nodemon](https://www.npmjs.com/packageodemon) to automatically refresh your server when you save a change
   - To use it, run the server via ``nodemon index.js``

## Recommendations

- [nodemon](https://www.npmjs.com/package/nodemon), which refreshes the server for you whenever you make changes to the code
- [Mozilla Firefox](https://www.mozilla.org/firefox), possibly [Developer Version](https://www.mozilla.org/firefox/developer), or [Google Chrome](https://www.google.com/chrome)
- [GitHub Desktop](https://desktop.github.com), our client for accessing the Git code repository hosted on GitHub
- [GitHub emoji cheat sheet](https://github.com/ikatyang/emoji-cheat-sheet), for the love of iconography :heart_eyes_cat:
- [Atom](https://atom.io), where the magic happens :magic_wand:
- [Markdown Live Preview](https://markdownlivepreview.com), to check how the README file looks
- [nodemon](https://www.npmjs.com/package/nodemon)

## Resources

- [Mozilla Developer](https://developer.mozilla.org)
- [HTML Validator](https://validator.w3.org)
- [CSS Validator](https://jigsaw.w3.org/css-validator)
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox), with illustrations
- [JavaScript Validator (Unofficial)](https://codebeautify.org/jsvalidate)
- [JSHint (Unofficial)](https://jshint.com), a more advanced tool
- [Introduction to web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
- [JSON](https://www.json.org), the official website
- [The WebSocket API (WebSockets)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Material UI Colors](https://materialui.co/colors)
- [CSS Gradient](https://cssgradient.io)
