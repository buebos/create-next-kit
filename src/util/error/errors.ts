const errors = {
    "tool.setup.sources_length": [
        "This tool: {0} does not have any sources available",
        "with any of the requested package managers: {1}",
    ],
    "tool.setup.no_type": [
        "There is no procedure to handle download type: {0}.",
    ],

    "source.manager.download.type": [
        "Attempted to download tool: {0} as a package with",
        "a source that does not have a tool manager attached.",
    ],
    "source.manager.download": [
        "Downloading this tool: {0} with manager: {1} failed.",
    ],

    "source.manager.getInstallFlags.source": [
        "Attempted to getFlags of an https source.",
    ],
    "source.manager.getInstallFlags.match": [
        "This tool manager ID: {0} does not match with any",
        "manager registered.",
    ],

    "source.getByTool.no_available": [
        "There are no available sources on the current",
        "platform ({0}) for tool: {1}",
    ],

    "source.https.download.wrong_type": [
        "This tool: {0} was attempted to be downloaded",
        "from a URL but it does not have any registered.",
    ],
};

export default errors;
