function placeInfoInDocument() {
  document.getElementById('target').innerHTML = '';
  const ul = document.createElement('ul');

  // browser and browser version
  const liBrowser = createListElement();
  liBrowser.innerText = `Browser: ${navigator.userAgent})`;

  // operating system name
  const liOperatingSystem = createListElement();
  liOperatingSystem.innerText = `Operating system: ${navigator.platform}`;

  // screen width and height
  const liScreenWidthHeight = createListElement();
  liScreenWidthHeight.innerText = `Screen width and height: ${screen.width} x ${screen.height}`;

  // available screen space for browser
  const liBrowserScreenSpace = createListElement();
  liBrowserScreenSpace.innerText = `Browser Screen Space: ${screen.availWidth} x ${screen.availHeight}`;

  // available screen space for browser
  const liCurrentBrowserScreenSpace = createListElement();
  liCurrentBrowserScreenSpace.innerText = `Browser Screen Space: ${window.innerWidth} x ${window.innerHeight}`;

  // current date and time
  const liDateTime = createListElement();

  const date = new Date();
  const dateLocalized = date.toLocaleDateString('fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeLocalized = date.toLocaleTimeString('fi-FI', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Helsinki',
  });

  liDateTime.innerText = `Date and Time: ${dateLocalized} ${timeLocalized}`;

  // add list elements to parent list
  ul.appendChild(liBrowser);
  ul.appendChild(liOperatingSystem);
  ul.appendChild(liScreenWidthHeight);
  ul.appendChild(liBrowserScreenSpace);
  ul.appendChild(liCurrentBrowserScreenSpace);
  ul.appendChild(liDateTime);

  // add list to document element
  document.getElementById('target').appendChild(ul);

  function createListElement() {
    return document.createElement('li');
  }
}

placeInfoInDocument();

// call function every time window is resized
window.addEventListener('resize', placeInfoInDocument);
