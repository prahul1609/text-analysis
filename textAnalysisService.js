'use strict';


const language = require('@google-cloud/language');
const _ = require("lodash");

const client = new language.LanguageServiceClient({
  projectId: 'ipsos-ml-001-1537995698756',
  keyFilename: 'config/google-dev.json',
});

// Based on https://cloud.google.com/natural-language/docs/languages
const LANGUAGE_CATEGORY = {
  CLASSIFY_TEXT_SUPPORT: ['en'],
  ENTITY_ANALYSIS_SUPPORT: ['zh', 'zh-Hant', 'en', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'ru', 'es'],
  SENTIMENT_ANALYSIS_SUPPORT: ['ar', 'zh', 'zh-Hant', 'en', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'ru', 'es', 'nl', 'id', 'pl', 'pt', 'th', 'tr', 'vi'],
  ENTITY_SENTIMENT_ANALYSIS_SUPPORT: ['en', 'ja', 'es']
}

const textType = {
  HTML: 'HTML',
  PLAIN_TEXT: 'PLAIN_TEXT'
}
const options = {
  "extractSyntax": false,
  "classifyText": true,
};
module.exports = {

  analyze: function (text, language) {
    options.classifyText = LANGUAGE_CATEGORY.CLASSIFY_TEXT_SUPPORT.indexOf(language) > -1;
    options.extractEntities = LANGUAGE_CATEGORY.ENTITY_ANALYSIS_SUPPORT.indexOf(language) > -1;
    options.extractDocumentSentiment = LANGUAGE_CATEGORY.SENTIMENT_ANALYSIS_SUPPORT.indexOf(language) > -1;
    options.extractEntitySentiment = LANGUAGE_CATEGORY.ENTITY_SENTIMENT_ANALYSIS_SUPPORT.indexOf(language) > -1;
    console.info(" text " + text)
    const document = {
      content: text,
      type: textType.HTML
    };
    let features = options;
    let actualText = this.extractContent(text);
    let words = _.words(actualText);
    if (words.length < 25) {
      // classifyText needs minimum 25 words to process
      features.classifyText = false
    }
    const request = {
      document,
      features,
      encodingType: "UTF16"
    };
    return client
      .annotateText(request)
      .then(results => {
        const sentiment = results[0];
        return sentiment;
      })
      .catch(err => {
        console.log('ERROR from Google:', err);
        throw err;
      });
  },

  extractContent: function (html) {
    return _.replace(_.replace(_.replace(html, /<(?:.|\n)*?>/gm, ''), "&nbsp", ' '), /\n/g, " ");
  }


};