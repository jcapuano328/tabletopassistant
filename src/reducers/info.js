let defaultInfo = {
    version: '1.0.0',
    releasedate: new Date(2021,9,20,16,14,0)
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
