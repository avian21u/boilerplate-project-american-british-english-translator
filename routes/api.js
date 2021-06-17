'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      var text = req.body.text;
      var locale = req.body.locale;
      
      // VALIDATE INPUT
      // If one or more of the required fields is missing, return { error: 'Required field(s) missing' }.
      if (text === undefined || !locale || locale.trim() === "") {
        return res.json({ error: 'Required field(s) missing' });
      }
      // If text is empty, return { error: 'No text to translate' }
      if (text === '' || text.length === 0 || text.trim() === '') {
        return res.json({ error: 'No text to translate' });        
      }
      // If locale does not match one of the two specified locales, return { error: 'Invalid value for locale field' }.
      var locale_options = ["american-to-british", "british-to-american"];
      if (locale_options.indexOf(locale) === -1) {
        return res.json({ error: 'Invalid value for locale field' });
      }
      else {
        var result = (locale === locale_options[0]) ? translator.toBritish(text) : translator.toAmerican(text);
        // If text requires no translation, return "Everything looks good to me!" for the translation value.
        var translation = (result.trim() === text) ? "Everything looks good to me!" : result;
        var output = {
          text: text,
          translation: translation
        }
        return res.json(output); 
      }
    });
};
