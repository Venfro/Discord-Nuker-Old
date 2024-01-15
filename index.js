const axios = require('axios');
require('dotenv').config();

const token = process.env.ACCOUNT_TOKEN;
const guildID = process.env.GUILD_ID;
const categoryName = "lol"
const channelName = "lol"
const channelsAPI = `https://discord.com/api/v9/guilds/${guildID}/channels`
let categories = [];
let channels = [];
let webhooks = [];

for (let i = 0; i < 5; i++) {
    axios({
        method: 'post',
        url: channelsAPI,
        headers: {
            'Authorization': token
        },
        data: {
            name: categoryName,
            type: 4
        },
    })
    .then(function (response) {
        categories.push(response.data.id);
    })
    .catch(function (error) {
        console.log(error);
    });
}

setTimeout(() => {
    for (let i = 0; i < categories.length; i++) {
        axios({
            method: 'post',
            url: channelsAPI,
            headers: {
                'Authorization': token
            },
            data: {
                name: channelName,
                type: 0,
                parent_id: categories[i]
            },
        })
        .then(function (response) {
            channels.push(response.data.id);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}, 5000)

setTimeout(() => {
    for (let i = 0; i < channels.length; i++) {
        axios({
            method: 'post',
            url: channelsAPI,
            headers: {
                'Authorization': token
            },
            data: {
                name: categoryName,
                type: 0,
                parent_id: categories[i]
            },
        })
        .then(function (response) {
            channels.push(response.data.url);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}, 12500)
    for (let i = 0; i < webhooks.length; i++) {
        let count = 0;
        setInterval(() => {
            axios({
                method: 'post',
                url: webhooks[i],
                data: {
                    content: `@everyone ${count}`
                },
            })
            .then(function (response) {
                count++
            })
            .catch(function (error) {
                console.log(error);
            });
        }, 2000);
    }
