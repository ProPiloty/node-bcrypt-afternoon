module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db');
        const dragonTreasure = await db.get_dragon_treasure('1')
        res.status(200).send(dragonTreasure);
    },
    getUserTreasure: async (req, res) => {
        const db = req.app.get('db');
        const userTreasure = await db.get_user_treasure(req.session.user.id);
        res.status(200).send(userTreasure);
    },
    addUserTreasure: async (req, res) => {
        const {treasureURL} = req.body;
        const {id} = req.session.user;
        const db = req.app.get('db');
        const userTreasure = await db.add_user_treasure({treasureURL, id});
        res.status(200).send(userTreasure);
    }
}