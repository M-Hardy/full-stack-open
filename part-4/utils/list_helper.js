const dummy = () => {
    return 1;
};

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce(
        (totalLikes, currentBlog) => totalLikes + currentBlog.likes,
        0
    );
    return totalLikes;
};

module.exports = { dummy, totalLikes };
