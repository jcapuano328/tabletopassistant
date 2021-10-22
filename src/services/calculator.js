const round2Fixed = (value, decPlaces) => {
    if (decPlaces == null)
        decPlaces = 2;

    var val = value * Math.pow(10, decPlaces);
    var fraction = (Math.round((val - parseInt(val)) * 10) / 10);
    val = Math.round(parseInt(val) + fraction) / Math.pow(10, decPlaces);
    return val;
}

module.exports = {
    round2Fixed: round2Fixed
};