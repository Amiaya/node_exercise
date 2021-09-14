const chalk = require('chalk')
const axios = require('axios').default;
const fs = require('fs')




const term = process.argv[2];
const instance = axios.create({
    baseURL: "https://icanhazdadjoke.com/",
    timeout: 10000,
    headers: { "Accept": "application/json", 'User-Agent': 'PostmanRuntime/7.26.8' }
})

// instance.get(`/search?term=${term}`)
// .then(response => fs.writeFileSync('./joke.txt', response.data.results[x].joke))
// .catch(error => console.log(`Error:\n${error}`))

async function getJoke(term) {
    if (!term) {
        return chalk.red.red("Error: missing one requied argument 'term'");
    }
    try {
        let response = await instance.get(`/search?term=${term}`);
        response = response.data;

        if (!response.total_jokes) {
            return chalk.red(`no jokes were found for ${term}. Try another word!`); 
        }

        const random = Math.floor(Math.random() * response.total_jokes + 1);
        fs.writeFileSync('./joke.txt', response.results[random].joke);
        return chalk.green(response.results[random].joke);
        

    } catch (error) {
        return chalk.red.bold(error);
    }

}


getJoke(term).then(result => console.log(result));