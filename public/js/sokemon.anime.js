// We need to wait for the HTML to load before applying JS

/* Motion list
Space key: jump
Enter key: attack
KeyK: move leg(front-left)
KeyL: move leg(back-right)
head rotate
tail rotate
eyes blink
*/

window.addEventListener("DOMContentLoaded", function () {
    // Utils
    // vw customized from https://css-tricks.com/viewport-sized-typography/
    function vw(percent, containerw = 0) {
        // Assumes relative to entire window
        var w = Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
        );

        // But we can make it relative to the container
        // e.g., document.getElementById('frill').width
        var temp = (percent * w) / 100;

        if (containerw !== 0) temp = temp * (containerw / window.innerWidth);

        return temp;
    }

    const sokemon = {
        name: ["Eevee", "イブイ"],
        level: 1,
        body: {
            elementId: "all",
            element: document.getElementById("eevee"),

            head: {
                elementId: "head",
                element: document.getElementById("head"),
                rotate: function () {
                    anime({
                        targets: this.element,
                        loop: true,
                        direction: "alternate",
                        duration: 1000, //ms
                        easing: "easeInOutCirc",
                        rotate: "+=5", //deg
                        delay: 1000,
                    });
                },
            },
            eyes: {
                left: {
                    elementId: "fulleye",
                    element: document.getElementsByClassName("fulleye"),
                    blink: function () {
                        anime({
                            targets: this.element,
                            autoplay: true,
                            loop: true,
                            scaleY: [
                                { value: 1, duration: 3000, delay: 0 },
                                { value: 0.1, duration: 100, delay: 0 },
                                { value: 1, duration: 800, delay: 0 },
                                { value: 0.1, duration: 100, delay: 0 },
                                { value: 1, duration: 100, delay: 0 },
                                { value: 0.1, duration: 100, delay: 0 },
                            ],
                        });
                    },
                },
            },

            leg: {
                frontLeft: {
                    elementId: "frontleft",
                    element: document.getElementById("leg-front-left"),
                    move: function () {
                        anime({
                            targets: this.element,
                            autoplay: true,
                            loop: false,
                            direction: "alternate",
                            easing: "easeInOutCubic",
                            rotate: [
                                { value: 30, duration: 0, delay: 0 },
                                { value: 60, duration: 500, delay: 0 },
                                { value: 30, duration: 500, delay: 0 },
                            ],
                        });
                    },
                },

                backRight: {
                    elementId: "backright",
                    element: this.document.getElementById("leg-back-right"),
                    move: function () {
                        anime({
                            targets: this.element,
                            autoplay: true,
                            loop: false,
                            direction: "alternate",
                            easing: "easeInOutCubic",
                            rotate: [
                                { value: 30, duration: 0, delay: 0 },
                                { value: 0, duration: 500, delay: 0 },
                                { value: 30, duration: 500, delay: 0 },
                            ],
                        });
                    },
                },
            },

            tail: {
                elementId: "tail",
                element: document.getElementById("tail"),
                rotate: function () {
                    anime({
                        targets: this.element,
                        autoplay: true,
                        loop: true,
                        direction: "alternate",
                        duration: 2000,
                        delay: 4000,
                        rotate: "500",
                        easing: "easeInOutCubic",
                    });
                },
            },
        },
        behavior: {
            attack: function () {
                anime({
                    targets: sokemon.body.element,
                    loop: false,
                    easing: "easeInOutBack",
                    scaleX: [
                        { value: 1.5, duration: 300, delay: 0 },
                        { value: 1, duration: 300, delay: 100 },
                    ],
                    scaleY: [
                        { value: 1.5, duration: 300, delay: 0 },
                        { value: 1, duration: 300, delay: 100 },
                    ],
                    translateX: [
                        { value: -50, duration: 300, delay: 0 },
                        { value: 0, duration: 300, delay: 100 },
                    ],
                    translateY: [
                        { value: 50, duration: 300, delay: 0 },
                        { value: 0, duration: 300, delay: 100 },
                    ],
                });
            },
            dodge: function () {
                anime({
                    targets: sokemon.body.element,
                    loop: false,
                    easing: "easeInOutBack",
                    translateX: [
                        { value: -400, duration: 300, delay: 0 },
                        { value: 0, duration: 300, delay: 100 },
                    ],
                });
            },
            cry: function () {
                anime({
                    targets: sokemon.body.eyes.left.element,
                    autoplay: true,
                    loop: false,
                    scaleY: [
                        { value: 0.1, duration: 3000, delay: 0 },
                        { value: 1, duration: 100, delay: 0 },
                    ],
                });
                
                sokemon.speak(sokemon.voice.cry, sokemon.voice);
            },
            jump: function () {
                anime({
                    targets: sokemon.body.element,
                    loop: false,
                    easing: "easeInOutBack",
                    translateY: [
                        { value: 50, duration: 700, delay: 0 },
                        { value: -120, duration: 300, delay: 0 },
                        { value: 20, duration: 320, delay: 0 },
                        { value: 0, duration: 300, delay: 0 },
                    ],
                });
            },
        },
        voice: {
            name: [],
            lang: "ja-JP",
            cry: "Pika Pika Pika Pika",
            rate: 1,
            pitch: 2,
        },
        speak: function (speech, voice) {
            const synth = window.speechSynthesis;
            // voices = synth.getVoices();
            // console.log(voices);
            // console.log(speech);
            const utterThis = new SpeechSynthesisUtterance();

            utterThis.onend = function (event) {
                console.log("SpeechSynthesisUtterance.onend");
            };

            utterThis.onerror = function (event) {
                console.error("SpeechSynthesisUtterance.onerror");
            };

            utterThis.text = speech;
            utterThis.lang = voice.lang;
            utterThis.pitch = voice.pitch;
            utterThis.rate = voice.rate;
            console.log(utterThis);
            synth.speak(utterThis);
        },
    };

    function setProperty(obj1, obj2, obj3, abilities) {
        for (var key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                if (key == "base") {
                    obj1["attributes"] = obj2[key];
                } else {
                    obj1[key] = obj2[key];
                }
            }
        }
        obj1["currentHP"] = obj1.attributes.HP;
        obj1["level"] = 1;
        obj1["abilities"] = {};
        for (var move in obj3) {
            if (Object.keys(abilities).includes(obj3[move].ename)) {
                obj1.abilities[abilities[obj3[move].ename]] = obj3[move];
            }
        }
    }

    // const sp = document.getElementById("button1");
    // sp.addEventListener("click", function () {
    //     sokemon.speak(sokemon.voice.cry, sokemon.voice);
    // });

    // const sp2 = document.getElementById("button2");
    // sp2.addEventListener("click", function () {
    //     sokemon.speak(document.querySelector(".txt").value, sokemon.voice);
    // });

    // execution
    sokemon.body.head.rotate();
    sokemon.body.eyes.left.blink();
    sokemon.body.tail.rotate();
    // sokemon.speak();
    abilities = {
        "Double-Edge": "doubleEdge",
        Bite: "bite",
        Tackle: "tackle",
        "Take Down": "takeDown",
    };
    setProperty(sokemon, pokedex[132], moves, abilities);
    console.log(sokemon);
    console.log(sokemon.type);
    console.log(sokemon.attributes);
    console.log(sokemon.currentHP);
    console.log(sokemon.abilities);
    console.log(sokemon.level);

    // Let's inititalize our sokémon
    console.log("Declaring Sokemon");
    window.MySokemon = sokemon;

    // Let's set up the voice
    const synth = window.speechSynthesis;

    // And get all the possible voices
    voices = synth.getVoices();

    // Let's set up the controls
    if (document.getElementById("trigger-dodge")) {
        document.getElementById("trigger-dodge").onclick = function () {
            ////////////////////////////////////////////////////////////////////////////
            // NOTE: Your task
            ////////////////////////////////////////////////////////////////////////////
        };
    }


    document.addEventListener("keypress", input_event);

    const attack = document.getElementById("attackButton");
    attack.addEventListener("click", function () {
        sokemon.behavior.attack();
        console.log("Attack");
        socket.emit("battle action: attack", {
            ip: my_ip,
            port: my_port,
            name: window.MySokemon.name['english'],
            sokemon: window.MySokemon,
        });
        console.log("battle action: attack", my_ip);
    });

    const dodge = document.getElementById("dodgeButton");
    dodge.addEventListener("click", function () {
        sokemon.behavior.dodge();
        console.log("Dodge");
        socket.emit("battle action: dodge", {
            ip: my_ip,
            port: my_port,
            name: window.MySokemon.name['english'],
            sokemon: window.MySokemon,
        });
        console.log("battle action: dodge", my_ip);
    });

    const cry = document.getElementById("cryButton");
    cry.addEventListener("click", function () {
        sokemon.behavior.cry();
        // sokemon.speak(sokemon.voice.cry, sokemon.voice);
        console.log("Cry");
        // sokemon.speak(sokemon.voice.cry, sokemon.voice);
        console.log("Cry sound test");
        socket.emit("battle action: cry", {
            ip: my_ip,
            port: my_port,
            name: window.MySokemon.name['english'],
            sokemon: window.MySokemon,
        });
        console.log("battle action: cry", my_ip);
    });

    const join = document.getElementById("joinButton");
    join.addEventListener("click", function () {
        // sokemon.behavior.join();
        console.log("Join");
        socket.emit("join battle", {
            ip: my_ip,
            port: my_port,
            name: window.MySokemon.name['english'],
            sokemon: window.MySokemon,
        });
        console.log("Join Battle", my_ip);
    });

    function input_event(e) {
        if (e.code === "Space") {
            sokemon.behavior.jump();
            console.log("Jump");
        } else if (e.code === "Enter") {
            sokemon.behavior.attack();
            // console.log(window.MySokemon.name['english']);
            console.log("Attack");
            socket.emit("battle action: attack", {
                ip: my_ip,
                port: my_port,
                name: window.MySokemon.name['english'],
                sokemon: window.MySokemon,
            });
            console.log("battle action: attack", my_ip);
        } else if (e.code === "KeyD") {
            sokemon.behavior.dodge();
        } else if (e.code === "KeyC") {
            sokemon.behavior.cry();
        } else if (e.code === "KeyK") {
            sokemon.body.leg.frontLeft.move();
        } else if (e.code === "KeyL") {
            sokemon.body.leg.backRight.move();
        }
    }
});
