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

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;

    let favorite = blogs[0];
    blogs.forEach((blog) => {
        if (favorite && blog.likes > favorite.likes) {
            favorite = blog;
        }
    });

    return favorite;
};

module.exports = { dummy, totalLikes, favoriteBlog };
