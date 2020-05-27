const translate = require('@vitalets/google-translate-api');
const { langs } = require('./langs');
const slackEmojis = require('./slack-emojis.json');

const getRandom = (item, type) => {
  const types = {
    array: () => item[Math.floor(Math.random() * (langs.length - 0))],
    object: () => Object.keys(item)[Math.floor(Math.random() * (langs.length - 0))],
  };
  return types[type]();
};

const generateGoodMorning = () => {
  const randomLanguage = getRandom(langs, 'array');
  const flag = slackEmojis[`flag-${randomLanguage.code}`];
  const emoji = (flag && Object.keys(slackEmojis).find((key) => slackEmojis[key] === flag)) || getRandom(slackEmojis, 'object');
  translate('Good Morning', { to: randomLanguage.code }).then((res) => {
    process.stdout.write(`${res.text} (${randomLanguage.lang}) :${emoji}:\n`);
  }).catch(() => {});
};

generateGoodMorning();
