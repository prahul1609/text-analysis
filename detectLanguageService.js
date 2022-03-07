// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate({
  projectId: 'ipsos-ml-001-1537995698756',
  keyFilename: 'config/google-dev.json',
});

module.exports = {
  detectLanguage: async text => {
    let [detection] = await translate.detect(text);
    console.log(JSON.stringify(detection))
    // detections = Array.isArray(detections) ? detections : [detections];
    console.log('Detection:');
    console.log(`${detection.input} => ${detection.language}`);
    return detection.language;
    // detections.forEach(detection => {
    //   console.log(`${detection.input} => ${detection.language}`);
    // });

  }

}
