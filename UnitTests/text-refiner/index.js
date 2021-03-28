function refineText(source, options) {
    return [normalizeWhiteSpaces, compactWhiteSpaces, maskBannedWords].reduce(
        (value, filter) => filter(value, options),
        source
    );
}

function maskBannedWords(source, options) {
    if (options) {
        return options.bannedWords.reduce(maskBannedWord, source);
    }
    return source;
}

function maskBannedWord(source, bannedWord) {
    const mask = "*".repeat(bannedWord.length)
    return source.replace(bannedWord, mask);
}

function normalizeWhiteSpaces(source) {
    return source.replace("\t", " ");
}

function compactWhiteSpaces(source) {
    return source.indexOf("  ") < 0 ? source : compactWhiteSpaces(source.replace("  ", " "));
}

module.exports = refineText;