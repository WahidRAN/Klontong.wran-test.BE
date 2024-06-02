import pool from '../config/db.js'

const productsList = [
  {
    categoryId: 1,
    categoryName: 'Cemilan',
    sku: 'CML1001',
    name: 'Keripik Singkong',
    description: 'Keripik singkong gurih dan renyah.',
    image: 'https://example.com/images/keripik.jpg',
    harga: 2000
  },
  {
    categoryId: 2,
    categoryName: 'Minuman',
    sku: 'MNM1001',
    name: 'Teh Botol Sosro',
    description: 'Teh botol yang menyegarkan, cocok untuk segala suasana.',
    image: 'https://example.com/images/tehbotol.jpg',
    harga: 3000
  },
  {
    categoryId: 3,
    categoryName: 'Makanan',
    sku: 'MKN1001',
    name: 'Roti Gandum',
    description: 'Roti gandum sehat dengan serat tinggi.',
    image: 'https://example.com/images/rotigandum.jpg',
    harga: 5000
  },
  {
    categoryId: 4,
    categoryName: 'Perlengkapan',
    sku: 'PRL1001',
    name: 'Pensil HB',
    description: 'Pensil HB berkualitas untuk menulis dan menggambar.',
    image: 'https://example.com/images/pensil.jpg',
    harga: 3000
  },
  {
    categoryId: 5,
    categoryName: 'Elektronik',
    sku: 'SKU1001',
    name: 'Headphone Bluetooth',
    description: 'Headphone Bluetooth dengan kualitas suara terbaik.',
    image: 'https://example.com/images/headphone.jpg',
    harga: 28000
  }
];

const generateRandomProduct = (index) => {
  const product = productsList[index % productsList.length];
  return {
    ...product,
  };
};

const seedDatabase = async () => {
  try {
    await pool.connect();
    for (let i = 0; i < 100; i++) {
      const product = generateRandomProduct(i);
      await pool.query(
        'INSERT INTO public.products (category_id, category_name, sku, name, description, image, harga) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [product.categoryId, product.categoryName, product.sku, product.name, product.description, product.image, product.harga]
      );
    }
    console.log('Seeding complete');
  } catch (err) {
    console.error('Error seeding database', err);
  } finally {
    pool.end();
  }
};

seedDatabase();
