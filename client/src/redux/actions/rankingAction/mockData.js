


const makePayload = (num) => {
    const payload = []
    for(let i=0; i<num; i++){
        payload.push({
            userid: parseInt(Math.random()*100000, 10),
            score: i + 1,
            winAmount: parseInt(Math.random()*10000, 10),
            odds: parseInt(Math.random()*1000, 10),
            game: `游戏` + parseInt(Math.random()*100, 10)
        })
    }
    return payload
}

const mockData = {
    payload: makePayload(100)
}



module.exports = mockData

