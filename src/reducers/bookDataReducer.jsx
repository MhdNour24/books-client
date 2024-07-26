function BookReducer(state, action) {
  const payload = action.payload;
  switch (action.type) {
    case "title":
      return { ...state, title: payload.title };
    case "slug":
      return { ...state, slug: payload.slug };
    case "stars":
      return { ...state, stars: payload.stars };
    case "description":
      return { ...state, description: payload.description };
    case "categories": {
      const value = payload.categories;
      const categories = typeof value === "string" ? value.split(",") : value;
      return { ...state, categories };
    }
    case "thumbnail": 
      return {...state, thumbnail: payload.thumbnail}
    // case "all":{
    //   const value=payload.data
    //   return {...value}
    // }
    default:
      throw new Error("Unknown action.");
  }
}

export default BookReducer;
