import Image from 'next/image';
import { notFound } from 'next/navigation';
import { craftVillages } from '@/data/craft-villages';
import Link from 'next/link';
import ProductDetailClient from './ProductDetailClient';

// Hàm tìm sản phẩm từ tất cả làng nghề
const findProductById = (id: string) => {
  for (const village of craftVillages) {
    const product = village.products.find(p => p.id === id);
    if (product) {
      return { product, village };
    }
  }
  return null;
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = findProductById(id);

  if (!result) {
    notFound();
  }

  const { product, village } = result;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <Link href="/marketplace" className="text-purple-600 hover:text-purple-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Quay lại Marketplace
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cột trái: Hình ảnh sản phẩm */}
            <div className="p-6 flex items-center justify-center">
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  layout="fill" 
                  objectFit="contain" 
                  className="bg-gray-50"
                />
              </div>
            </div>

            {/* Cột phải: Thông tin sản phẩm */}
            <div className="p-8 flex flex-col">
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-6">
                  <span className="text-sm text-gray-500">Làng nghề:</span>
                  <Link href={`/lang-nghe/${village.slug}`} className="ml-2 text-purple-600 hover:text-purple-800">
                    {village.name}
                  </Link>
                </div>

                <div className="text-2xl font-bold text-purple-600 mb-6">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </div>

                <div className="prose prose-purple max-w-none mb-8">
                  <h3 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h3>
                  <p>Sản phẩm thủ công mỹ nghệ độc đáo từ làng nghề truyền thống, được chế tác tỉ mỉ bởi những nghệ nhân lành nghề với bí quyết được truyền từ đời này sang đời khác.</p>
                  
                  <h3 className="text-lg font-semibold mt-4 mb-2">Đặc điểm nổi bật</h3>
                  <ul>
                    <li>Sản phẩm thủ công 100%</li>
                    <li>Chất liệu tự nhiên, an toàn</li>
                    <li>Thiết kế độc đáo, tinh xảo</li>
                    <li>Sản phẩm đặc trưng của làng nghề {village.name}</li>
                  </ul>
                </div>
              </div>

              {/* Client component để xử lý thêm vào giỏ hàng */}
              <ProductDetailClient product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 