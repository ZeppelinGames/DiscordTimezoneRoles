require('dotenv').config();
const { SlasherClient } = require("discord.js-slasher");
const fs = require('fs');

let timezoneJsonData = fs.readFileSync("timezones.json");
let timezones = JSON.parse(timezoneJsonData);

const client = new SlasherClient({ useAuth: true });

const d = new Date();

var lastHour = 0;

setInterval(UpdateRoles, 60000);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("command", async (ctx) => {
    if (ctx.name === 'settz') {
        var tryTZ = ctx.options.getString('timezone');
        var isTZ = isTimezone(tryTZ);
        if (isTZ !== undefined) {

            var role = ctx.server.guild.roles.cache.find(r => r.name.endsWith(`(${isTZ.code.toLowerCase()})`));

            if (role !== undefined) {
                ctx.server.member.roles.add(role);
            } else {
                let newRole = await ctx.server.member.guild.roles.create({
                    name: `00:00 (${isTZ.code})`,
                    color: 'BLUE'
                });
                ctx.server.member.roles.add(newRole);
            }

            ctx.reply(`Setting timezone for ${ctx.user} to ${isTZ.name} (${isTZ.UTC_offset})`);
        } else {
            ctx.reply("Invalid timezone");
        }

        UpdateRoles();
    }
});

function isTimezone(tz) {
    for (let i in timezones) {
        if (timezones[i].code.toLowerCase() === tz.toLowerCase()) {
            return timezones[i];
        }
    }
    return undefined;
}

function UpdateRoles() {
    //Get UTC time
    let utcTime = new Date().getTime();;

    let hour = utcTime / (3600000);
    console.log(hour);

    //  if (hour != lastHour) {
    lastHour = hour;

    for (let i in timezones) {
        client.guilds.cache.forEach((guild) => {
            guild.roles.cache.forEach((role) => {
                if(role.name.toLowerCase().endsWith(`(${timezones[i].code.toLowerCase()})`)) {
                  
                    let offsetTime = (utcTime + (timezones[i].offset_seconds/100));
                    let currMin = Math.round(offsetTime / 60000);
                    let currHour = Math.round(offsetTime / (3600000));
                    role.edit({
                        name: `${currHour}:${currMin} (${timezones[i].code})`,
                        color: 'BLUE'
                    });
    
                    console.log(`UPDATED ROLE: ${currHour}:${currMin} (${timezones[i].code})`)
                }
            })
        });
    }
}
//  }

client.login();