import { HttpLink } from "apollo-link-http";
import { withData } from "next-apollo";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337"

const config = {
  link: new HttpLink({
    uri: `${API_URL}/graphql`, // Server URL (must be absolute)
  })
};
export default withData(config);


// Ref https://strapi.io/blog/nextjs-react-hooks-strapi-food-app-1

// back-end:
// https://strapi.io/blog/build-a-blog-with-react-strapi-and-apollo
// yarn create strapi-app backend --quickstart --no-run
// yarn strapi install graphql
// yarn strapi dev

// front-end https://strapi.io/blog/nextjs-react-hooks-strapi-food-app-1
// npm install apollo-boost @apollo/react-hooks graphql react-apollo
// npm install next-apollo@3.1.10
