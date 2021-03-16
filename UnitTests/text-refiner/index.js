function refineText(s) {
    return s
        .replace("     ", " ")
        .replace("    ", " ")
        .replace("   ", " ")
        .replace("  ", " ");
}

module.exports = refineText;