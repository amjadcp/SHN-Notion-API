// const express = require('express')
// const app = express()
const Discord = require('discord.js')
const DiscordClient = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] })

DiscordClient.on('ready', ()=>{
    console.log(DiscordBot.user.tag);
})

DiscordClient.on('message', (msg)=>{
    if(msg.content==='hi'){
        msg.reply('hello')
    }
})

DiscordClient.login('OTcyNDkzMzEzNzQxNTYxODg2.YnZ2-g.0XABXv9u4XujL8OL0I_pP1GonqQ')
// app.listen(8000, ()=>console.log('server is running'))