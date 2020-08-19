


const total_likes = ( blogs ) => {
  var sum_likes = 0
  if  (blogs.length === 0) {
    return 0
  }
  else {
    blogs.map(blog => sum_likes += blog.likes)
    return sum_likes
  }
}

const favoriteBlog = ( blogs ) => {
  var most_liked = blogs.reduce(function (most_liked, blog) {
    return (most_liked.likes || 0) > blog.likes ? most_liked : blog}, {})
  return { title: most_liked.title, author: most_liked.author, likes: most_liked.likes }
}

//https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
//used this as help
const mostBlogs = ( blogs ) => {
  if (blogs.length === 0) {
    return null
  }
  let theAuthor
  let mostBlog = 1
  let holder = 0
  blogs.forEach( blog => {
    blogs.forEach( blogToCompare => {
      if ( blog.author === blogToCompare.author) {
        holder++
        if ( mostBlog <= holder ) {
          mostBlog = holder
          theAuthor = blog.author
        }
      }
    })
    holder = 0
  })
  return { author: theAuthor, blogs: mostBlog }
}

const mostLikes = ( blogs ) => {
  if (blogs.length === 0) {
    return null
  }
  let theAuthor
  let mostLike = 1
  let holder = 0
  blogs.forEach( blog => {
    blogs.forEach( blogToCompare => {
      if ( blog.author === blogToCompare.author) {
        holder = holder + blogToCompare.likes
        if ( mostLike <= holder ) {
          mostLike = holder
          theAuthor = blog.author
        }
      }
    })
    holder = 0
  })
  return { author: theAuthor, likes: mostLike }
}
module.exports = { total_likes, favoriteBlog, mostBlogs, mostLikes }