local menuOpen = false

RegisterNetEvent("openWeaponMenu")
AddEventHandler("openWeaponMenu", function()
    menuOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = menuOpen
    })
end)

RegisterNUICallback("closeMenu", function(data, cb)
    menuOpen = false
    SetNuiFocus(false, false)
    cb({})
end)

RegisterNUICallback('getWeapons', function(data, cb)
    cb(Config.Weapons)
end)

RegisterNUICallback("giveWeapon", function(data, cb)
    local weapon = data.weapon
    local label = data.label

    TriggerServerEvent("weapons:giveWeapon", weapon, label)

    menuOpen = false
    SetNuiFocus(false, false)
    cb({})
end)