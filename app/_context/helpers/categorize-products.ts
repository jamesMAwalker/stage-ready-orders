export function createCategories(data: IProductItem[]) {
  const categories: {
    [key: string]: {
      id: string
      title: string
      image: string
      products: IProductItem[]
    }
  } = {
    lips: {
      id: 'lips',
      title: 'Lips',
      image: '/images/lips.png',
      products: []
    },
    lashes: {
      id: 'lashes',
      title: 'Lashes',
      image: '/images/lashes.jpg',
      products: []
    },
    eyeshadow: {
      id: 'eyeshadow',
      title: 'Eyeshadow',
      image: '/images/eyeshadow.jpg',
      products: []
    },
    kits: {
      id: 'kits',
      title: 'Kits',
      image: '/images/kits.jpg',
      products: []
    },
    lipDuo: {
      id: 'duo',
      title: 'Lip & Liner Duo',
      image: '/images/lipduo.webp',
      products: []
    },
    accessories: {
      id: 'accessories',
      title: 'Accessories',
      image: '/images/accessories.jpg',
      products: []
    }
  }

  data.forEach((product: IProductItem) => {
    if (product.title.toLowerCase().includes('duo')) {
      // Filter Lip Duo
      categories.lipDuo.products.push(product)
    } else if (
      // Filter Lips
      product.title.toLowerCase().includes('lip') &&
      !product.title.toLowerCase().includes('duo')
    ) {
      categories.lips.products.push(product)
    } else if (
      // Filter Lashes
      product.title.toLowerCase().includes('lash') ||
      product.title.toLowerCase().includes('mascara')
    ) {
      categories.lashes.products.push(product)
    } else if (
      // Filter Eyeshadow
      product.title.toLowerCase().includes('shadow') ||
      product.title.toLowerCase().includes('palette')
    ) {
      categories.eyeshadow.products.push(product)
    } else if (
      // Filter Kits
      product.title.toLowerCase().includes('kit') &&
      !product.title.toLowerCase().includes('lash')
    ) {
      categories.kits.products.push(product)
    } else {
      // Filter Accessories
      categories.accessories.products.push(product)
    }
  })

  return categories
}
