const textAnalysisService = require('./textAnalysisService');
const detectLanguageService = require('./detectLanguageService');

async function analyzeText(text) {
  const language = await detectLanguageService.detectLanguage(text);
  console.log(`Language found: ${language}`);
  const analyzedData = await textAnalysisService.analyze(text, language);
  console.log(analyzedData, "Analyzed Data");
  console.log(JSON.stringify(analyzedData), "Analyzed Data");
}

const text = "<p>My over all experience was good; but the food quality and quantity was not to my expectations! For getting little more portion in food, I had requested few times but end of the day I was been not satisfied with the portion of the food during my entire stay.</p>↵<p>Second bad experience, when I had requested for just couple of parathas to replace with my regular breakfast items, I was been served only 3 Parathas which were also half cooked and without a single drop of ghee on the top (I can produce a picture of those so called parathas).</p>↵<p>Well, apart from food area, all the other experiences were good and overall I am happy!</p>";

analyzeText(text);
