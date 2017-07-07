function webView(status, msg) {
  var content = document.getElementById("content")
  var icon = '👊';

  if (status === 'die') {
    icon = '💀'
  } else if(status === 'win') {
    icon = '😎'
  }

  var displayMessage = icon + ' - ' + msg;
  var p = document.createElement("p");
  p.appendChild(document.createTextNode(displayMessage));
  content.appendChild(p);
}

function terminalView(status, msg) {
  var icon = '👊';

  if (status === 'die') {
    icon = '💀'
  } else if(status === 'win') {
    icon = '😎'
  }

  var displayMessage = icon + ' - ' + msg;
  console.log(displayMessage);
}

exports.webView = webView;
exports.terminalView = terminalView;
