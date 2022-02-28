const controller = {}

controller.test = (req,res) => {
    console.log(req.body)
    res.json(req.body)
}

module.exports = controller;