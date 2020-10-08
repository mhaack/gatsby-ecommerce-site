import React from 'react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { Box, Grid, Image, Button } from 'theme-ui'
import SEO from './seo'

function Product({ product }) {
  const { name, image, currency, description, price } = product
  const { addItem } = useShoppingCart()

  return (
    <Box sx={{ maxWidth: '768px', margin: '0 auto' }}>
      <SEO title={name} />
      <Grid sx={{ color: 'primary', fontWeight: 'heading' }} columns={[1, 2]}>
        <Box>
          <Image alt={`${name}`} src={image} />
        </Box>
        <Box as="section" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box as="h1">{name}</Box>
          <Box as="p">
            {formatCurrencyString({
              value: price,
              currency: currency
            })}
          </Box>
          <Box as="p">{description}</Box>
        </Box>
        <Button
          aria-label={`Add ${name} to cart`}
          onClick={() => addItem(product)}
          sx={{ backgroundColor: 'teal' }}
        >
          Add to Cart
        </Button>
      </Grid>
    </Box>
  )
}

export default Product
