/* eslint-disable max-len */
const translate = require('@vitalets/google-translate-api');
const { langs } = require('./langs');
const slackEmojis = require('./slack-emojis.json');

const generateRandomNumber = (limit) => Math.floor(Math.random() * (limit - 0));

const valueOrRandom = (value, item) => (value && !!(value < item.length) && value) || generateRandomNumber(item.length);

const getRandom = (item, type, value) => {
  const types = {
    array: () => item[valueOrRandom(value, item)],
    object: () => {
      const objectArray = Object.keys(item);
      return objectArray[valueOrRandom(value, objectArray)];
    },
  };
  return types[type]();
};

const hasEmoji = (name) => !!slackEmojis[name];

const flagEmojiOrRandom = (flagEmojiName) => (hasEmoji(flagEmojiName) && flagEmojiName) || getRandom(slackEmojis, 'object');

const generateGoodMorning = () => {
  const randomLanguage = getRandom(langs, 'array');
  const flagEmojiName = `flag-${randomLanguage.code}`;
  const selectedEmoji = flagEmojiOrRandom(flagEmojiName);
  translate('Good Morning', { to: randomLanguage.code }).then((res) => {
    process.stdout.write(`*${res.text}* (${randomLanguage.lang}) :${selectedEmoji}:\n`);
  }).catch(() => {});
};

generateGoodMorning();
