interface InfoBoxData {
  [key: string]: string | undefined;
}

interface InfoBoxProps {
  title: string;
  image?: string;
  imageCaption?: string;
  data: InfoBoxData;
  category?: string;
}

export default function InfoBox({ title, image, imageCaption, data, category }: InfoBoxProps) {
  return (
    <div className="float-right w-72 ml-4 mb-4 border border-gray-200 bg-[#f8f9fa]">
      {/* 카테고리 */}
      {category && (
        <div className="bg-[#87ceab] px-3 py-2 text-center text-sm">
          {category}
        </div>
      )}

      {/* 제목 */}
      <div className="bg-[#87ceab] px-3 py-2 text-center font-bold border-t border-white">
        {title}
      </div>

      {/* 이미지 */}
      {image && (
        <div className="p-3 text-center border-b border-gray-200">
          <img
            src={image}
            alt={title}
            className="max-w-full h-auto mx-auto"
          />
          {imageCaption && (
            <p className="text-xs text-gray-500 mt-2">{imageCaption}</p>
          )}
        </div>
      )}

      {/* 데이터 테이블 */}
      <table className="w-full border-collapse text-sm">
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            value && (
              <tr key={key} className="border-b border-gray-200">
                <th className="bg-[#eaecf0] px-3 py-2 text-left w-24 font-normal">
                  {key}
                </th>
                <td className="px-3 py-2">
                  {value}
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}
