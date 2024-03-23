const dummy = () => {
    return 1;
};

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce(
        (totalLikes, currentLikes) => totalLikes + currentLikes,
        0
    );
    return totalLikes;
};

module.exports = { dummy, totalLikes };
