const fs = require("fs")

export function loadStringList(path) {
    let file = fs.readFileSync(`resources/${path}`, 'utf8')

    return file
        .trim()
        .split('\r\n')
        .filter(e => {
            // Filtering comment & empty strings
            if(e.trim().length === 0) return false;
            if(e.startsWith("#")) return false;

            return true;
        })
}
