const concatArray = require('../utils.js').concatArray;
const _ = require('lodash');
const franc = require('franc');

// Public section

exports.getTranslators = function () {
    return translators;
}

exports.getDayConvertors = function () {
    return dayConvertors;
}

exports.getCommonTokens = function () {
    return concatArray(commonTokens);
}

exports.getEnglishTokens = function () {
    var englishArray = concatArray(englishTokens);
    return this.getCommonTokens().concat(englishArray);
}

exports.getChineseTokens = function () {
    var chineseArray = concatArray(chineseTokens);
    return this.getCommonTokens().concat(chineseArray);
}

exports.getRussianTokens = function () {
    var russianArray = concatArray(russianTokens);
    return this.getCommonTokens().concat(russianArray);
}

exports.getArabicTokens = function () {
    var arabicArray = concatArray(arabicTokens);
    return this.getCommonTokens().concat(arabicArray);
}

exports.getTurkishTokens = function () {
    var turkishArray = concatArray(turkishTokens);
    return this.getCommonTokens().concat(turkishArray);
}

exports.getSpanishTokens = function () {
    var spanishArray = concatArray(spanishTokens);
    return this.getCommonTokens().concat(spanishArray);
}

exports.getPortugueseTokens = function () {
    var portugueseArray = concatArray(portugueseTokens);
    return this.getCommonTokens().concat(portugueseArray);
}

exports.getGreekTokens = function () {
    var commonTokens = _.clone(this.getCommonTokens());

    // In Greek language we'd like to use its own file and not the common one
    for (var i = 0; i < commonTokens.length; i++) {
        var currentRegex = commonTokens[i].regex;
        var matchIndex = currentRegex.source.indexOf("am|pm");

        if (matchIndex && matchIndex != -1) {
            commonTokens.splice(i,1);
        }
    }

    var greekArray = concatArray(greekTokens);
    return commonTokens.concat(greekArray);
}

exports.getPersianTokens = function () {
    var persianArray = concatArray(persianTokens);
    return this.getCommonTokens().concat(persianArray);
}

exports.getFrenchTokens = function () {
    var frenchArray = concatArray(frenchTokens);
    return this.getCommonTokens().concat(frenchArray);
}

exports.getAllTokens = function () {
    var merged = [commonTokens, englishTokens, russianTokens, arabicTokens,
        turkishTokens, spanishTokens, greekTokens, persianTokens, frenchTokens];
    merged = concatArray(merged);
    merged = concatArray(merged);

    return merged;
}

// TODO: why not return a single array?
exports.getAllAgoAndSince = function () {
    return [
        require('./tokens/english/ago&since.js'),
        require('./tokens/russian/ago&since.js'),
        require('./tokens/arabic/ago&since.js'),
        require('./tokens/turkish/ago&since.js'),
        require('./tokens/spanish/ago&since.js'),
        require('./tokens/greek/ago&since.js'),
        require('./tokens/persian/ago&since.js'),
        require('./tokens/french/ago&since.js'),
        require('./tokens/portuguese/ago&since.js'),
    ];
}

// TODO: put flags in tokens and then select them dinamicly?
exports.allMonthTokens = concatArray([
    require('./tokens/english/months.js').tokens,
    require('./tokens/russian/months.js').tokens,
    require('./tokens/arabic/months.js').tokens,
    require('./tokens/turkish/months.js').tokens,
    require('./tokens/spanish/months.js').tokens,
    require('./tokens/greek/months.js').tokens,
    require('./tokens/persian/months.js').tokens,
    require('./tokens/french/months.js').tokens,
    require('./tokens/portuguese/months.js').tokens,
]);

exports.getSupportedLangCodes = function () {
    // English - eng, Arabic - urd, Russian - rus, Greek - ell, 
    // Persian - pes, Spanish - spa, Turkish - tur, French - fra,
    // Portuguese - por
    return ['eng', 'urd', 'rus', 'ell', 'pes', 'spa', 'tur', 'fra', 'por','cmn'];
}

exports.detect = function (dateString) {
    var whitelist = this.getSupportedLangCodes();
    var langs = franc.all(dateString, {
        'whitelist': whitelist,
        'minLength': 3
    });
    // When franc is 100% sure of the languege it detected, it ignores the whitelist we sent it, so we check again.
    if ((langs.length === 1) && whitelist.indexOf(langs[0][0]) == -1){
        langs[0] = ["und", 1];
    }
    return langs;
}

// Private section

// Translators Section
var translators = [
    require('./tokens_util/arabic/translator'),
    require('./tokens_util/russian/translator'),
    require('./tokens_util/turkish/translator'),
    require('./tokens_util/spanish/translator'),
    require('./tokens_util/greek/translator'),
    require('./tokens_util/persian/translator'),
    require('./tokens_util/french/translator'),
    require('./tokens_util/portuguese/translator'),
    require('./tokens_util/chinese/translator'),
];

var dayConvertors = [
    require('./tokens_util/russian/converter.js').dayOfWeekToNum,
    require('./tokens_util/english/converter.js').dayOfWeekToNum,
    require('./tokens_util/arabic/converter.js').dayOfWeekToNum,
    require('./tokens_util/turkish/converter.js').dayOfWeekToNum,
    require('./tokens_util/spanish/converter.js').dayOfWeekToNum,
    require('./tokens_util/greek/converter.js').dayOfWeekToNum,
    require('./tokens_util/persian/converter.js').dayOfWeekToNum,
    require('./tokens_util/french/converter.js').dayOfWeekToNum,
    require('./tokens_util/portuguese/converter.js').dayOfWeekToNum,
    
];

var commonTokens = [
    require('./tokens/common/date&year.js').tokens,
    require('./tokens/common/ddmmyyyy&hhmm.js').tokens,
    require('./tokens/common/h&m.js').tokens
];

var englishTokens = [
    require('./tokens/english/now.js').tokens,
    require('./tokens/english/months.js').tokens,
    require('./tokens/english/facebook.js').tokens,
    require('./tokens/english/last&next.js').tokens,
    require('./tokens/english/ago&since.js').tokens,
    require('./tokens/english/special_hours.js').tokens,
    require('./tokens/english/yesterday&tomorrow.js').tokens,
    require('./tokens/english/ddmmyyyy&hhmm.js').tokens 
];

var russianTokens = [
    require('./tokens/russian/months.js').tokens,
    require('./tokens/russian/last&next.js').tokens,
    require('./tokens/russian/ago&since.js').tokens,
    require('./tokens/russian/now.js').tokens,
    require('./tokens/russian/yesterday&tomorrow.js').tokens
];

var arabicTokens = [
    require('./tokens/arabic/months.js').tokens,
    require('./tokens/arabic/ago&since.js').tokens,
    require('./tokens/arabic/last&next.js').tokens,
];

var turkishTokens = [
    require('./tokens/turkish/months.js').tokens,
    require('./tokens/turkish/ago&since.js').tokens,
    require('./tokens/turkish/last&next.js').tokens,
    require('./tokens/turkish/yesterday&tomorrow.js').tokens,
];

var spanishTokens = [
    require('./tokens/spanish/months.js').tokens,
    require('./tokens/spanish/last&next.js').tokens,
    require('./tokens/spanish/ago&since.js').tokens,
    require('./tokens/spanish/yesterday&tomorrow.js').tokens
];

var greekTokens = [
    require('./tokens/greek/months.js').tokens,
    require('./tokens/greek/last&next.js').tokens,
    require('./tokens/greek/ago&since.js').tokens,
    require('./tokens/greek/ddmmyyyy&hhmm.js').tokens,
    require('./tokens/greek/yesterday&tomorrow.js').tokens
];

var persianTokens = [
    require('./tokens/persian/months.js').tokens,
    require('./tokens/persian/ago&since.js').tokens,
    require('./tokens/persian/last&next.js').tokens
];

var frenchTokens = [
    require('./tokens/french/months.js').tokens,
    require('./tokens/french/ago&since.js').tokens,
    require('./tokens/french/last&next.js').tokens,
    require('./tokens/french/ddmmyyyy&hhmm.js').tokens,
    require('./tokens/french/yesterday&tomorrow.js').tokens
];

var portugueseTokens = [
    require('./tokens/portuguese/months.js').tokens,
    require('./tokens/portuguese/last&next.js').tokens,
    require('./tokens/portuguese/ago&since.js').tokens,
    require('./tokens/portuguese/yesterday&tomorrow.js').tokens
];

var chineseTokens = [
    require('./tokens/chinese/ago&since.js').tokens,
    require('./tokens/chinese/now.js').tokens
];