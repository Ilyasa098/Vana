import fetch from 'node-fetch';
import delay from 'delay';
import readlineSync from 'readline-sync';

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gasVanaBos = (no, point, query) => new Promise((resolve, reject) => {
    fetch(`https://www.vanadatahero.com/api/tasks/${no}`, {
        method: 'POST',
        headers: {
            'authority': 'www.vanadatahero.com',
            'Accept': `*/*`,
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
            'Content-Length': '35',
            'Content-type': 'application/json',
            'Origin': 'https://www.vanadatahero.com',
            'Referer': 'https://www.vanadatahero.com/home',
            'Sec-Ch-Ua': `"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"`,
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'x-telegram-web-app-init-data': query,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
            "status":"completed",
            "points":point
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => resolve(err))
});

const gasVanaPlayer = (query) => new Promise((resolve, reject) => {
    fetch(`https://www.vanadatahero.com/api/player`, {
        method: 'GET',
        headers: {
            'authority': 'www.vanadatahero.com',
            'Accept': `*/*`,
            'x-telegram-web-app-init-data': query,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const gasVanaTask = (query) => new Promise((resolve, reject) => {
    fetch(`https://www.vanadatahero.com/api/tasks`, {
        method: 'GET',
        headers: {
            'authority': 'www.vanadatahero.com',
            'Accept': `*/*`,
            'x-telegram-web-app-init-data': query,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});


(async () => {
    const query = readlineSync.question('Masukin query mu njing : ')
    console.clear()
    //const query = 'user=%7B%22id%22%3A6908101660%2C%22first_name%22%3A%22Abdillah%22%2C%22last_name%22%3A%22suudzon%22%2C%22username%22%3A%22abdljago%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2046482441617019699&chat_type=private&start_param=360983370&auth_date=1727105481&hash=748ad077635c2929957840b46bba1c5b6d3ac3bc69f19aacc7b98013a187b604'
    const cek_Point = await gasVanaPlayer(query)
    console.log(cek_Point)
    console.log(`Telegram Account: ${cek_Point.tgUsername} | Point: ${cek_Point.points} VANA`)
    const cek_task = await gasVanaTask(query)
    console.log(cek_task.tasks)
    cek_task.tasks.map(async (data) => {
        const lognya = await gasVanaBos(data.id, data.points, query)
        console.log(lognya)
    })

    // for (let i = 0; i < 106; i++) {
    //     const gas = await gasVanaBos(i, query)
    //     console.log(gas)
    // }
})()
