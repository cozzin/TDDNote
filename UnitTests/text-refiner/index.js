function refineText(s) {
    return s
        .replace("     ", " ")
        .replace("    ", " ")
        .replace("   ", " ")
        .replace("  ", " ")
        .replace("\t ", " ");
}

module.exports = refineText;