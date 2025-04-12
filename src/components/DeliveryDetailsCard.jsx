import React from 'react'
import PropTypes from 'prop-types'
import orderIcon from '../assets/deliverydetails.png' // ← your orange “order” icon here

export default function DeliveryDetailsCard({ delivery }) {
  // Check if delivery is not provided or is an empty array.
  if (!delivery || delivery.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-[13px] font-semibold mb-2 text-[#280300]">Delivery Details</h2>
        <p className="text-[12px] text-gray-700">No delivery details to show.</p>
      </div>
    )
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-3">
      {delivery.map(({ id, date }) => (
        <div
          key={id}
          className="flex items-center bg-white p-4 rounded shadow"
        >
          {/* Order icon */}
          <div className="w-10 h-10 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
            <img src={orderIcon} alt="Order Icon" className="w-6 h-6" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-sm font-medium">Order id #{id}</p>
            <p className="text-xs text-gray-500">{formatDate(date)}</p>
          </div>

          {/* Menu dots */}
          <button className="p-2 rounded hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

DeliveryDetailsCard.propTypes = {
  delivery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
}

DeliveryDetailsCard.defaultProps = {
  delivery: [
    { id: 'INV2540', date: '2024-05-16' },
    { id: 'INV0914', date: '2024-01-17' },
    { id: 'INV3801', date: '2023-11-09' },
    { id: 'INV4782', date: '2023-08-21' },
  ],
}
