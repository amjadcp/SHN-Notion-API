const express = require('express')
const app = express()
const Discord = require('discord.js')
const DiscordClient = new Discord.Client()


process.env.DISCORD_TOKEN

app.listen(8000, ()=>console.log('server is running'))