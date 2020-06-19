"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Home = function () {
    console.log('WebSocket client script will run here.');
    // List items
    // Every item id should be dependent on the others
    // Socket should only have to update the updated item & not enitre list
    var _a = react_1.useState([
        { location: 1, title: 'card1', updatedAt: new Date().getDate() },
        { location: 2, title: 'card2', updatedAt: new Date().getDate() },
        { location: 3, title: 'card3', updatedAt: new Date().getDate() },
    ]), cards = _a[0], setCards = _a[1];
    var _b = react_1.useState(false), wsConnected = _b[0], setWsConnected = _b[1];
    react_1.useEffect(function () {
        console.log(ws.readyState);
        if (ws.readyState === WebSocket.OPEN) {
            console.log('HELLO THIS IS OPEN');
            ws.send(JSON.stringify({
                payload: cards,
            }));
        }
    }, [cards]);
    var ws = new WebSocket('ws://localhost:8000');
    var moveUp = function (card) {
        var oldLocation = card.location;
        var newLocation = oldLocation - 1;
        var currentCardAtLocation = cards.find(function (c) { return c.location === newLocation; });
        if (currentCardAtLocation) {
            currentCardAtLocation.location = oldLocation;
            currentCardAtLocation.updatedAt = new Date().getDate();
        }
        card.location = newLocation;
        card.updatedAt = new Date().getDate();
        console.log('card post', cards);
        setCards(__spreadArrays(cards));
    };
    var moveDown = function (card) {
        var oldLocation = card.location;
        var newLocation = oldLocation + 1;
        var currentCardAtLocation = cards.find(function (c) { return c.location === newLocation; });
        if (currentCardAtLocation) {
            currentCardAtLocation.location = oldLocation;
            currentCardAtLocation.updatedAt = new Date().getDate();
        }
        card.location = newLocation;
        card.updatedAt = new Date().getDate();
        console.log('card post', cards);
        setCards(__spreadArrays(cards));
    };
    var connectToWS = function () {
        var rand = Math.random() * 100;
        ws.addEventListener('open', function () {
            // Send a message to the WebSocket server
            ws.send('Hello! from ' + rand);
            setInterval(function () {
                ws.send('__PING__');
            }, 3000);
        });
        ws.addEventListener('message', function (event) {
            // The `event` object is a typical DOM event object, and the message data sent
            // by the server is stored in the `data` property
            console.log('Received:', event.data);
            var p = document.createElement('p');
            p.innerHTML = event.data;
        });
        ws.addEventListener('close', function () {
            console.error('WS disconnected.');
        });
        ws.addEventListener('error', function (err) {
            console.error('Ongelma on tää ', err);
        });
        setWsConnected(true);
    };
    if (!wsConnected) {
        connectToWS();
    }
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
      {cards
        .sort(function (a, b) {
        return a.location <= b.location ? -1 : 1;
    })
        .map(function (card, index) {
        return (<div style={{
            background: "grey",
            marginBottom: '6px',
            width: '336px',
            height: '336px',
            display: 'block',
        }}>
              {card.title}
              <div>
                {index > 0 && <button onClick={function () { return moveUp(card); }}>Move Up</button>}
                {index < cards.length - 1 && (<button onClick={function () { return moveDown(card); }}>Move Down</button>)}
              </div>
            </div>);
    })}
    </div>);
};
exports.default = Home;
