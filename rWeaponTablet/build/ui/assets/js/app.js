let weapons = [];

document.body.style.display = "none";

function closeMenu() {
    document.body.style.display = "none";
    fetch(`https://${GetParentResourceName()}/closeMenu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    });
}

window.addEventListener('message', (event) => {
    const data = event.data;

    if (data.action === true) {
        document.body.style.display = "flex";
    } else if (data.action === false) {
        document.body.style.display = "none";
    }
});

addEventListener("keyup", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// const closeBtn = document.getElementById('closeBtn');

// closeBtn.addEventListener('click', function () {
//     closeMenu();
// });

fetch(`https://${GetParentResourceName()}/getWeapons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
        weapons = data;
        renderWeapons();
    });

const list = document.getElementById('weapon-list');
const search = document.getElementById('search');

function renderWeapons(filter = "") {
    list.innerHTML = "";

    let filterLower = filter.toLowerCase();
    let found = false;

    for (let i = 0; i < weapons.length; i++) {
        let w = weapons[i];
        let nameLower = w.name.toLowerCase();

        if (nameLower.includes(filterLower)) {
            found = true;
            list.innerHTML += `
                <div class="border border-[#27272a] bg-weapons rounded-lg px-4 py-3 mb-2">
                    <div class="flex justify-between items-center">
                        <div class="flex-row flex items-center">
                            <div>
                                <img src="assets/img/${w.code}.png" alt="image of ${w.name}" class="w-16 me-4">
                            </div>
                            <div>
                                <h4 class="text-xl font-bold tracking-tighter">${w.name}</h4>
                                <p class="text-muted text-sm">${w.code}</p>
                            </div>
                        </div>

                        <a href="#" onclick="giveWeapon('${w.code}', '${w.name}')" class="px-4 py-1.5 rounded-lg hover:bg-[#27272a] font-semibold">Give</a>
                    </div>
                </div>
            `;
        }
    }
    list.innerHTML += `${found === false ? `<h4 class="text-xl font-bold tracking-tighter">No weapons found</h4>` : ``}`;
}

search.addEventListener('input', (e) => {
    renderWeapons(e.target.value);
});

function giveWeapon(weaponCode, weaponLabel) {
    fetch(`https://${GetParentResourceName()}/giveWeapon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weapon: weaponCode, label: weaponLabel })
    }).then(() => {
        document.body.style.display = "none";
    });
}
