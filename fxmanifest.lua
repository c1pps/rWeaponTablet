fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'real! (c1pps.web)'
discord 'https://discord.gg/Z6MgxcWH97'
description 'Weapon Tablet for Staffs'

dependency 'ox_inventory'

ui_page 'build/ui/index.html'

files {
    'build/ui/**/*'
}

shared_scripts {
    'config.lua',
    '@ox_lib/init.lua',
}

client_scripts {
    'client.lua'
}

server_scripts {
    'server.lua'
}