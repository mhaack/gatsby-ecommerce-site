const products = require('./data/products.json')

const slugify = (str) => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  return `${slug}`.replace(/\/\/+/g, '/')
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
        type Product implements Node {
            name: String! 
            sku: String!
            slug: String
            id: String
            price: Int
            image: String
            currency: String
            description: String
            }
        `
  createTypes(typeDefs)
}

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId
}) => {
  // create a node for each product, createNodeId ensure it is unique to the GQL layer
  return products.map((product) => {
    const node = {
      ...product,
      slug: slugify(product.name),
      id: createNodeId(`Product-${product.name}`),
      internal: {
        type: 'Product',
        contentDigest: createContentDigest(product)
      }
    }
    createNode(node)
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allProduct {
        nodes {
          slug
        }
      }
    }
  `)
  result.data.allProduct.nodes.forEach(({ slug }) => {
    createPage({
      path: `/products/${slug}`,
      component: require.resolve(`./src/templates/product.js`),
      context: {
        slug: slug
      }
    })
  })
}
