import { mockTours } from "@/data/mockTours";
import { Tour } from "@/types/tour";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default function TourDetailPage({ params }: Props) {
  const tour = mockTours.find((tour) => tour.id === params.id);

  if (!tour) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/tours" className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Quay lại danh sách tour
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Phần hình ảnh và thông tin chính */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 font-medium">{tour.rating}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">{tour.reviewCount} đánh giá</span>
            <span className="mx-2 text-gray-400">•</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="ml-1 text-gray-600">{tour.location.name}, {tour.location.province}</span>
            </div>
          </div>

          {/* Hình ảnh chính */}
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
            <Image 
              src={tour.images[0] || "/images/placeholder.jpg"}
              alt={tour.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Hình ảnh phụ */}
          {tour.images.length > 1 && (
            <div className="grid grid-cols-3 gap-2 mb-6">
              {tour.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                  <Image 
                    src={image}
                    alt={`${tour.title} - Hình ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Mô tả */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Mô tả</h2>
            <p className="text-gray-700 whitespace-pre-line">{tour.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Chủ đề</h2>
            <div className="flex flex-wrap gap-2">
              {tour.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Phần thông tin đặt tour */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-8">
            <div className="flex items-center mb-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={tour.provider.logo || "/images/placeholder-logo.png"}
                  alt={tour.provider.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{tour.provider.name}</h3>
                <p className="text-sm text-gray-600">Nhà cung cấp dịch vụ</p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4 my-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Thời gian:</span>
                <span className="font-medium">{tour.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Giá:</span>
                <div>
                  <span className="text-2xl font-bold text-indigo-600">{tour.price.toLocaleString()} {tour.priceUnit}</span>
                  <span className="text-gray-500">/người</span>
                </div>
              </div>
            </div>

            <a 
              href={tour.bookingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full block text-center py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Đặt tour trên trang nhà cung cấp
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Bạn sẽ được chuyển đến trang web của nhà cung cấp để hoàn tất việc đặt tour
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 