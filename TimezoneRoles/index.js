require('dotenv').config();
const { SlasherClient } = require("discord.js-slasher");
const fs = require('fs');

let timezoneJsonData = fs.readFileSync("timezones.json");
let timezones = JSON.parse(timezoneJsonData);

const timezoneUtc = new Map();
timezones.forEach(element => {
    timezoneUtc.set(element.code, element.offset_seconds)
});

const roleRe = /[0-9]{2}:[0-9]{2} \([a-zA-Z]\)+/;
const timezoneRe = /[a-zA-Z]+/;

const client = new SlasherClient({ useAuth: true });

const d = new Date();

var lastHour = 0;

setInterval(UpdateRoles, 60000);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("command", async (ctx) => {
    if (ctx.name === 'settz') {
        var tzInputName = ctx.options.getString('timezone').toUpperCase();
        if (timezoneUtc.has(tzInputName)) {

            var role = ctx.server.guild.roles.cache.find(r => r.name.endsWith(`(${tzInputName})`));

            if (role !== undefined) {
                ctx.server.member.roles.add(role);
            } else {
                let utcTime = new Date().getTime();
                let localTimeStr = GetLocalTimeStr(utcTime, timezoneUtc.get(tzInputName));

                let newRole = await ctx.server.guild.roles.create({
                    name: `${localTimeStr} (${tzInputName})`,
                    color: 'BLUE'
                });

                ctx.server.member.roles.add(newRole);
            }

            let tzObj = GetTimezoneObj(tzInputName);
            ctx.reply(`Setting timezone for ${ctx.user} to ${tzObj.name} (${tzObj.UTC_offset})`);
        } else {
            ctx.reply("Invalid timezone");
        }

        UpdateRoles();
    }
});

function GetTimezoneObj(timezoneAbbr) {
    for (let i in timezones) {
        if (timezones[i].code === timezoneAbbr.toUpperCase()) {
            return timezones[i];
        }
    }
    return undefined;
}

function UpdateRoles() {
    let utcTime = new Date().getTime();
    let hour = utcTime / (3600000);

    //  if (hour != lastHour) {
    lastHour = hour;

    client.guilds.cache.forEach((guild) => {
        guild.roles.cache.forEach((role) => {
            if (roleRe.test(role.name)) {
                let roleTz = timezoneRe.exec(role.name)[0].toUpperCase; // gets the timezone part of the role name in uppercase, e.g. "12:00 aest" -> "AEST"
                let roleTzOffset = timezoneUtc.get(roleTz);
                let localTimeStr = GetLocalTimeStr(utcTime, roleTzOffset);

                role.edit({
                    name: `${localTimeStr} (${roleTz})`,
                    color: 'BLUE'
                });

                console.log(`UPDATED ROLE: ${localTimeStr} (${roleTz})`)
            }
        })
    });
    //  }
}

function GetLocalTimeStr(utcTime, utcOffsetSeconds) {

    let offsetTime = Math.round((utcTime / 100) + utcOffsetSeconds);
    let currMin = Math.round(offsetTime / 60000);
    let currHour = Math.round(offsetTime / (3600000));

    return `${currHour}:${currMin}`;
}


client.login();