unmap('u'); // u is used for undo;
/*
https://raw.githubusercontent.com/metasong/settings/master/surfingkeys.js
 ** iteration in collection or tree
 **
 ** {: fist or root
 ** }: last or last leaf
 ** ]: next
 ** [: previous
 ** t: to
 ** |: time based last used(active)
 ** >: first child of the parent, next sibling is no children
 ** <: parent, previous sibling if no parent
 ** note:
 ** all command could be prefix with numbers to repeat.
 ** the prefix number for 'to' command is the object index in collection
 */
keyMaps = [
    ['<Alt-t>', '<Alt-s>', true], // toggle surfingKey
    ['<Alt-s>', 'd', true], // down
    ['<Alt-w>', 'e', true], // up
    ['<Alt-a>', 'f'],
    ['{i', 'gi', true],

    ['<F1>', '?', false],
    [']t', 'R', true],
    ['[t', 'E', true],
    ['{t', 'g0', true],
    ['|t', '<Ctrl-6>', true], // last used tab
    ['}t', 'g$', true],
    [']s', 'cs', true],
    [']h', 'D', true],
    ['[h', 'S', true],
    ['|{', 'gT', true], // first actived tab
    ['|}', 'gt', true], // last actived tab
    ['|[', 'B', true], //  one tab history back
    ['|]', 'F', true], //  one tab history forward
    ['[u', 'gu', true],
    ['{u', 'gU', true],

    // display hints
    ['dh', '<Ctrl-h>', true],
    ['dH', '<Ctrl-j>', true],
    ['ds', ';fs', true],
    ['dmt', 'cf', true],
    ['dt', 'gf', true],
    ['dT', 'af', true],
    ['di', 'q', true], // click image or button
    ['dvs', 'zv', true], // visual element select
    ['dq', 'cq', true],// query word

    // add
    ['aj', ';i', true], // add jquery

    // remove
    ['-h', ';dh', true], // delete history older than 30 days
    ['-b', ';db', true], // remove bookmark of this page

    // search and show
    ['sb', 'ob', true],
    ['sg', 'og', true],
    ['sd', 'od', true],
    ['sw', 'ow', true],
    ['sy', 'oy', true],
    ['sla', ';ql', true], // show last action
    // open
    ['oh', 'H', true], // open one tab history in new tab
    ['os', ';e', true],
    ['oba', 'ga', true], // browser about
    ['obb', 'gb', true], // browser bookmark
    ['obc', 'gc', true], // browser cache
    ['obd', 'gd', true], // browser download
    ['obh', 'gh', true], // browser history
    ['obk', 'gk', true], // browser cookies
    ['obe', 'ge', true], // browser extensions
    ['obn', 'gn', true], // browser net-internals
    ['obs', 'gs', true], // browser page source
    ['obi', 'aj', true], // browser inspect
    ['om', 'sm', true], // markdown preview
    ['oo', 'go', true], // open url in current tab

    // close
    ['cd', ';j', true], // close download shelf
    ['c}', 'gx$', true],
    ['c{', 'gx0', true],
    ['c[', 'gxt', true],
    ['c]', 'gxT', true],
    ["c'", 'gxx', true],
    ['ct', 'x', true], // close tab

    // move
    ['\\l', '<<', true],
    ['\\r', '>>', true],
    ['\\o', 'W', true],

    // copy(yank)
    ['ypf', 'yp', true], // yank form data for post
    ['ypi', ';cp', true], // yank proxy info

    // past
    ['pp', ';ap', true], // apply proxy info from clipboard
    ['pf', ';pf', true], // fill form with data from yf

    // edit
    ['eur', ';U', true],
    ['eut', ';u', true],


    // undo, unset, clear
    ['uh', ';m', true], // hover
    ['uc', 'X', true], // undo tab close

    //reload, refresh, reset
    ['rr', 'r', true], // ctrl-r and F5
    ['rs', 'cS', true], // refresh scrollables
    ['r#', 'g#', true], // reload without hash
    ['r?', 'g?', true], // reload without query string

    // set
    ['=pa', ';pa', true], // set proxy mode `always`
    ['=pb', ';pb', true],
    ['=pd', ';pd', true],
    ['=ps', ';ps', true],
    ['=pc', ';pc', true],

    // toggle
    ['`pi', '<Alt-p>', true], // pin
    ['`pr', 'cp', true], // proxy
    ['`m', '<Alt-m>', true], // mute
    ['`pd', ';s', true], // toggle surfkey pdf viewer

    // mis
    ['z0', 'zr']
];

function rmap(newKey, oldKey, ummapOldKey, domain, annotation) { // replacing map
    map(newKey, oldKey, domain, annotation);
    !!ummapOldKey && unmap(oldKey);
}

keyMaps.forEach(map => {
    rmap(map[0], map[1], map[2], undefined, map[3]);
});

imapkey("<Ctrl-Alt-a>", '#1Open a link', function () {
    Hints.create("", Hints.dispatchMouseClick, { tabbed: false, active: false });
})

Front.registerInlineQuery({
    url: "https://api.shanbay.com/bdc/search/?word=",
    parseResult: function (res) {
        try {
            res = JSON.parse(res.text);
            var exp = res.msg;
            if (res.data.definition) {
                var pronunciations = [];
                for (var reg in res.data.pronunciations) {
                    pronunciations.push(`<div>[${reg}] ${res.data.pronunciations[reg]}</div>`);
                    // pronunciations.push(`<div><audio src="${res.data[reg+'_audio']}" controls></audio></div>`);
                }
                var definition = res.data.definition.split("\n").map(function (d) {
                    return `<li>${d}</li>`;
                }).join("");
                exp = `${pronunciations.join("")}<ul>${definition}</ul>`;
            }
            if (res.data.en_definitions) {
                exp += "<hr/>";
                for (var lex in res.data.en_definitions) {
                    var sense = res.data.en_definitions[lex].map(function (s) {
                        return `<li>${s}</li>`;
                    }).join("");
                    exp += `<div>${lex}</div><ul>${sense}</ul>`;
                }
            }
            return exp;
        } catch (e) {
            return "";
        }
    }
});


// set theme
settings.theme = `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 12pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 20pt;
}`;
// click `Save` button to make above settings to take effect.
