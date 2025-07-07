import Image from 'next/image';
import { notFound } from 'next/navigation';
import { craftVillages } from '@/data/craft-villages';
import Link from 'next/link';
import ProductDetailClient from './ProductDetailClient';
import { FaChevronLeft, FaMapMarkerAlt } from 'react-icons/fa';

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
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={product.image} 
            alt={product.name} 
            layout="fill" 
            objectFit="cover"
            priority
            className="brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-16 z-10">
          <Link href="/marketplace" className="mb-6 inline-flex items-center text-white hover:text-blue-200 transition-colors">
            <FaChevronLeft className="mr-2" />
            <span>Quay lại Marketplace</span>
          </Link>
          <span className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600/80 backdrop-blur-sm rounded-full inline-block mb-4 w-fit">
            {village.name}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight drop-shadow-lg">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-white/90 mb-6">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-neutral-100">
              <div className="prose prose-lg max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-semibold prose-img:rounded-lg prose-p:text-neutral-700">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Mô tả sản phẩm</h2>
                <p>Sản phẩm thủ công mỹ nghệ độc đáo từ làng nghề truyền thống, được chế tác tỉ mỉ bởi những nghệ nhân lành nghề với bí quyết được truyền từ đời này sang đời khác.</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Đặc điểm nổi bật</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sản phẩm thủ công 100%</li>
                  <li>Chất liệu tự nhiên, an toàn</li>
                  <li>Thiết kế độc đáo, tinh xảo</li>
                  <li>Sản phẩm đặc trưng của làng nghề {village.name}</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 space-y-8">
              {/* Product Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <ProductDetailClient product={product} />
              </div>
              
              {/* Village Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <div className="flex items-center mb-4">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" size={18} />
                  <h3 className="text-lg font-semibold text-neutral-800">Thông tin làng nghề</h3>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-4">{village.summary}</p>
                <Link 
                  href={`/lang-nghe/${village.slug}`}
                  className="inline-block px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Xem chi tiết làng nghề
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 