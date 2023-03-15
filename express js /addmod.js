exports.add = function (req,res,vals) {
    var sum = parseInt(vals.first) + parseInt(vals.second);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<!DOCTYPE html>
    <html>
    <head><meta charset=\"utf-8\"/>
    <title>Calculator Web Site</title>
    <link rel="stylesheet" href="./style.css" type="text/css">
    </head>
    <body>
    <header>
    <h1>Simple Adder</h1>
    </header>
    <p class="result">The result is: ${String(sum)}</p>
    </body>
    </html> ` );
    return res.end();
    };