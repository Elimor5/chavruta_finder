const fs = require('fs');

const content = fs.readFileSync("sefaria_index.json");
const json = JSON.parse(content);
const categories = findCategories(json);


function findCategories(obj) {
    let categories = [];

    if (obj && (typeof obj === "object")) {
        const keys = Object.keys(obj)

        keys.forEach(key => {
            if (key === "category") {
                categories.push(obj[key])
            } else if (key === "categories" || key == "base_text_titles") {
                categories = categories.concat(obj[key]);
            } else {
                categories = categories.concat(findCategories(obj[key]));
            }
        });
    }

    if (Array.isArray(obj)) {
        obj.forEach(el => {
            return findCategories(el);
        })
    }

    return categories;
}

function uniqueCategories(categories) {
    const uniques = {};

    categories.forEach(category => {
        if (uniques[category])
            return;

        uniques[category] = category;
    });

    return JSON.stringify(Object.keys(uniques));
}

fs.writeFile("sefaria_categories.json", uniqueCategories(categories), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
