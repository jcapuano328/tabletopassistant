let defaultInfo = {
    version: '1.0.1',
    releasedate: new Date(2023,8,26,13,0,0)
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
