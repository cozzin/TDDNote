function refineText(s) {
    return s
        .replace("     ", " ")
        .replace("\t", " ")
        .replace("    ", " ")
        .replace("   ", " ")
        .replace("  ", " ");
}

module.exports = refineText;