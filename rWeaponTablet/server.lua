RegisterCommand("weapons", function(source)
    local src = source

    if IsPlayerAceAllowed(src, "weapon.menu") then
        TriggerClientEvent("openWeaponMenu", src)
    else
        TriggerClientEvent('ox_lib:notify', src, {
            title = 'Permission',
            description = 'You don\'t have the permission to open this menu.',
            type = 'error'
        })
    end
end, false)


RegisterServerEvent("weapons:giveWeapon")
AddEventHandler("weapons:giveWeapon", function(weapon, label)
    local src = source

    local success = exports.ox_inventory:AddItem(src, weapon, 1)

    if success then
        TriggerClientEvent('ox_lib:notify', src, {
            title = 'Weapon Menu',
            description = 'You received : ' .. label,
            type = 'success'
        })
    else
        TriggerClientEvent('ox_lib:notify', src, {
            title = 'Weapon Menu',
            description = 'Impossible to receive the weapon ' .. weapon,
            type = 'error'
        })
    end
end)