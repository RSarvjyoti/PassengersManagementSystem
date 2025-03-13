import React from 'react'

const MyTable = () => {
  return (
    <div className="p-4 overflow-x-auto">
      <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 text-sm">
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Age</th>
              <th className="px-6 py-4 font-semibold">Gender</th>
              <th className="px-6 py-4 font-semibold">Contact No.</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Photo</th>
              <th className="px-6 py-4 font-semibold">ID Card</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">Abc</td>
              <td className="px-6 py-4 whitespace-nowrap">Abc</td>
              <td className="px-6 py-4 whitespace-nowrap">Abc</td>
              <td className="px-6 py-4 whitespace-nowrap">Abc</td>
              <td className="px-6 py-4 whitespace-nowrap">Abc</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                  <img 
                    src="path-to-photo" 
                    alt="User"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239CA3AF"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/></svg>';
                    }}
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View ID
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyTable