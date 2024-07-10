// Word dictionary
const wordDictionary = {
    humdrum: {
        meaning: "dull; monotonous",
        usage: "The humdrum routine of office life was starting to wear on her.",
        root: "From 'hum' + 'drum', imitating a monotonous sound",
        synonyms: ["boring", "tedious", "mundane"]
    },
    deified: {
        meaning: "treated as a god",
        usage: "The ancient pharaohs were deified by their subjects.",
        root: "From Latin 'deus' meaning 'god'",
        synonyms: ["idolized", "exalted", "venerated"]
    },
    abound: {
        meaning: "exist in large numbers or amounts",
        usage: "Opportunities abound for those willing to take risks.",
        root: "From Latin 'abundare' meaning 'to overflow'",
        synonyms: ["teem", "flourish", "proliferate"]
    },
    benign: {
        meaning: "gentle and kind; not harmful",
        usage: "The benign tumor was not a cause for major concern.",
        root: "From Latin 'benignus' meaning 'kind, generous'",
        synonyms: ["harmless", "mild", "favorable"]
    },
    avaricious: {
        meaning: "greedy for wealth or material gain",
        usage: "The avaricious tycoon always sought to increase his fortune.",
        root: "From Latin 'avarus' meaning 'greedy'",
        synonyms: ["covetous", "grasping", "mercenary"]
    },
    proclivity: {
        meaning: "a tendency to choose or do something regularly",
        usage: "He had a proclivity for telling tall tales.",
        root: "From Latin 'proclivitas' meaning 'a tendency'",
        synonyms: ["inclination", "predisposition", "propensity"]
    },
    congenial: {
        meaning: "pleasant or agreeable because suited to one's taste",
        usage: "The congenial atmosphere made everyone feel at ease.",
        root: "From Latin 'congenialis' meaning 'of the same kind'",
        synonyms: ["friendly", "harmonious", "compatible"]
    },
    caustic: {
        meaning: "sarcastic in a scathing and bitter way",
        usage: "His caustic remarks often offended his colleagues.",
        root: "From Greek 'kaustikos' meaning 'burning'",
        synonyms: ["acerbic", "scathing", "mordant"]
    },
    loquacious: {
        meaning: "tending to talk a great deal",
        usage: "The loquacious guest dominated the dinner conversation.",
        root: "From Latin 'loquax' meaning 'talkative'",
        synonyms: ["talkative", "garrulous", "voluble"]
    },
    misanthropic: {
        meaning: "disliking humankind and avoiding human society",
        usage: "His misanthropic tendencies made it difficult for him to work in a team.",
        root: "From Greek 'misanthropos' meaning 'hating mankind'",
        synonyms: ["cynical", "antisocial", "reclusive"]
    }
};

// Text content for each series
const seriesContent = {
    'the-boys': [
        "\"The Boys\" is anything but a humdrum superhero show. It's a wild ride that'll make you question every deified cape-wearer you've ever admired.",
        "Picture this: In a world where superheroes abound, they're not the benign saviors we expect. Nope, they're more likely to be avaricious celebs with a proclivity for bad behavior. The show's tone? Far from congenial - it's a caustic take on power and fame.",
        "Enter Billy Butcher, the show's loquacious anti-hero with a misanthropic streak a mile wide. He's got a bone to pick with supes, especially Homelander, the poster boy for everything wrong with superhero culture."
    ],
    'breaking-bad': [
        "\"Breaking Bad\" is anything but a humdrum crime drama. It's a wild ride that'll make you question every deified anti-hero you've ever admired.",
        "Picture this: In a world where drug lords abound, they're not the benign businessmen we expect. Nope, they're more likely to be avaricious chemists with a proclivity for bad behavior. The show's tone? Far from congenial - it's a caustic take on power and morality.",
        "Enter Walter White, the show's loquacious protagonist with a misanthropic streak a mile wide. He's got a bone to pick with society, especially his former colleagues, the poster boys for everything wrong with the American dream."
    ],
    'wolf-of-wall-street': [
        "\"The Wolf of Wall Street\" is anything but a humdrum financial drama. It's a wild ride that'll make you question every deified stockbroker you've ever admired.",
        "Picture this: In a world where Wall Street tycoons abound, they're not the benign businessmen we expect. Nope, they're more likely to be avaricious brokers with a proclivity for bad behavior. The movie's tone? Far from congenial - it's a caustic take on greed and excess.",
        "Enter Jordan Belfort, the film's loquacious protagonist with a misanthropic streak a mile wide. He's got a bone to pick with regulations, especially the SEC, the poster boy for everything wrong with financial oversight."
    ]
}; 