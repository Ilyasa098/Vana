import fetch from 'node-fetch';
import delay from 'delay';
import readlineSync from 'readline-sync';

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gasVanaBos = (point, query) => new Promise((resolve, reject) => {
    fetch(`https://www.vanadatahero.com/api/tasks/1`, {
        method: 'POST',
        headers: {
            'authority': 'www.vanadatahero.com',
            'Accept': `*/*`,
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-Length': '35',
            'Content-type': 'application/json',
            'Origin': 'https://www.vanadatahero.com',
            'Referer': 'https://www.vanadatahero.com/home',
            'Sec-Ch-Ua': `"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"`,
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'x-telegram-web-app-init-data': query,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0'
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
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-type': 'application/json',
            'Origin': 'https://www.vanadatahero.com',
            'Referer': 'https://www.vanadatahero.com/leaderboard',
            'Sec-Ch-Ua': `"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"`,
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'x-telegram-web-app-init-data': query,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0'
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});


(async () => {
    const query = readlineSync.question('Masukin query mu njing : ')
    console.clear()
    // const query = 'user=%7B%22id%22%3A6306901680%2C%22first_name%22%3A%22Mkfob%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22mkfob113%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-7542802925291615305&chat_type=private&start_param=360983370&auth_date=1727102381&hash=2292c2e04973bfbfa2024dce368ffd2bcf39605209d3f00e20656cd6a8a98cda'
    while(true){
        const cek_Point = await gasVanaPlayer(query)
        console.log(`Telegram Account: ${cek_Point.tgUsername} | Point: ${cek_Point.points} VANA`)
        for (let i = 0; i < 5; i++) {
            const randomNumber = getRandomNumber(100, 1000);
            const cek = await gasVanaBos(randomNumber, query)
            if (cek.status == 400) {
                console.log(`-- ${cek.message}`)
                console.log('-- Delay 10 menit')
                await delay(600000)
            } else {
                console.log(`-- get ${randomNumber} points VANA`)
                await delay(20000)
            }
        }
    }
})()