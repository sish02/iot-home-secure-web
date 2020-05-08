exports.get_all_readings = async (req, res, next) => {
    try {
        let result = {
            atmosphere : 76,
            smoke: 0.1,
            motion: "No"
        }
        res.data = result;
        res.status(200).json({
            message: "Samples fetched.",
            data: result
        });
        next();
    }
    catch (e) {
        console.error(e)
        res.status(500).json({
            message: "Error Occurred",
            error: e
        });
    }
}