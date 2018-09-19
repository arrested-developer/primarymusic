//this is the object we build for an ajax call to get the content of the manifest
//it's a JSON, so we can parse it like a man-child
//verion 0.7
let manUpObject;

//data objects
let tagArray = [],
  linkArray = [];
const validMetaValues = [
  { name: "mobile-web-app-capable", manifestName: "display" },
  { name: "apple-mobile-web-app-capable", manifestName: "display" },
  { name: "apple-mobile-web-app-title", manifestName: "short_name" },
  { name: "application-name", manifestName: "short_name" },
  { name: "msapplication-TileColor", manifestName: "ms_TileColor" },
  {
    name: "msapplication-square70x70logo",
    manifestName: "icons",
    imageSize: "70x70"
  },
  {
    name: "msapplication-square150x150logo",
    manifestName: "icons",
    imageSize: "150x150"
  },
  {
    name: "msapplication-wide310x150logo",
    manifestName: "icons",
    imageSize: "310x150"
  },
  {
    name: "msapplication-square310x310logo",
    manifestName: "icons",
    imageSize: "310x310"
  }
];
const validLinkValues = [
  { name: "apple-touch-icon", manifestName: "icons", imageSize: "152x152" },
  { name: "apple-touch-icon", manifestName: "icons", imageSize: "120x120" },
  { name: "apple-touch-icon", manifestName: "icons", imageSize: "76x76" },
  { name: "apple-touch-icon", manifestName: "icons", imageSize: "60x60" },
  { name: "apple-touch-icon", manifestName: "icons", imageSize: "57x57" },
  { name: "apple-touch-icon", manifestName: "icons", imageSize: "72x72" },
  { name: "apple-touch-icon", manifestName: "icons", imageSize: "114x114" },
  { name: "icon", manifestName: "icons", imageSize: "128x128" },
  { name: "icon", manifestName: "icons", imageSize: "192x192" }
];

//these next two classes are building the mixed data, pulling out the values we need based on the valid values array
const generateFullMetaData = function() {
  for (let i = 0; i < validMetaValues.length; i++) {
    if (manUpObject[validMetaValues[i].manifestName]) {
      if (validMetaValues[i].manifestName == "icons") {
        //here we need to loop through each of the images to see if they match
        const imageArray = manUpObject.icons;
        for (let j = 0; j < imageArray.length; j++) {
          if (imageArray[j].sizes == validMetaValues[i].imageSize) {
            //problem is in here, need to asign proper value
            validMetaValues[i].content = imageArray[j].src;
          }
        }
      } else {
        validMetaValues[i].content =
          manUpObject[validMetaValues[i].manifestName];
        if (
          validMetaValues[i].manifestName == "display" &&
          manUpObject.display == "standalone"
        )
          validMetaValues[i].content = "yes";
        // console.log('stop')
      }
    }
  }

  //console.log(validMetaValues)
  return validMetaValues;
};

const generateFullLinkData = function() {
  for (let i = 0; i < validLinkValues.length; i++) {
    if (manUpObject[validLinkValues[i].manifestName]) {
      if (validLinkValues[i].manifestName == "icons") {
        //here we need to loop through each of the images to see if they match
        const imageArray = manUpObject.icons;
        for (let j = 0; j < imageArray.length; j++) {
          if (imageArray[j].sizes == validLinkValues[i].imageSize) {
            //problem is in here, need to asign proper value
            validLinkValues[i].content = imageArray[j].src;
          }
        }
      } else {
        validLinkValues[i].content =
          manUpObject[validLinkValues[i].manifestName];
      }
    }
  }

  //console.log(validMetaValues)
  return validLinkValues;
};

//These are the 2 functions that build out the tags
//TODO: make it loop once instead of tx
const generateMetaArray = function() {
  const tempMetaArray = generateFullMetaData();
  const headTarget = document.getElementsByTagName("head")[0];
  for (let i = 0; i < tempMetaArray.length; i++) {
    const metaTag = document.createElement("meta");
    metaTag.name = tempMetaArray[i].name;
    metaTag.content = tempMetaArray[i].content;
    headTarget.appendChild(metaTag);
  }
};

const generateLinkArray = function() {
  const tempLinkArray = generateFullLinkData();
  const headTarget = document.getElementsByTagName("head")[0];
  for (let i = 0; i < tempLinkArray.length; i++) {
    const linkTag = document.createElement("link");
    linkTag.setAttribute("rel", tempLinkArray[i].name);
    linkTag.setAttribute("sizes", tempLinkArray[i].imageSize);
    linkTag.setAttribute("href", tempLinkArray[i].content);
    headTarget.appendChild(linkTag);
    //console.log(linkTag);
  }
};
//these functions makes the ajax calls and assigns to manUp object
const generateObj = function(ajaxString) {
  //for testing
  //document.getElementById("output").innerHTML = ajaxString;
  //gen object
  manUpObject = JSON.parse(ajaxString);
  generateLinkArray();
  generateMetaArray();
};

const makeAjax = function(url) {
  if (!window.XMLHttpRequest) return;
  let fullURL;
  const pat = /^https?:\/\//i;
  pat.test(url) ? (fulURL = url) : (fullURL = window.location.hostname + url);
  const ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200)
      generateObj(ajax.responseText);
  };
  ajax.open("GET", url, true);
  ajax.send();
};

const collectManifestObj = function() {
  const links = document.getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    if (links[i].rel && links[i].rel == "manifest") makeAjax(links[i].href);
  }
};

const testForManifest = (function() {
  //i'm not sure what to do here.  I am starchly against browser sniffing and there is no test (yet)
  //I think I'm jsut going to build out the tags on every page until there is a way to test it, so far
  //it looks like the manifest will override the tags
  //browser: we need context here
  collectManifestObj();
})();
