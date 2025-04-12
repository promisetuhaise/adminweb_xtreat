import React, { useState, useEffect, useMemo } from "react";
// Remove: import Slider from "rc-slider";
// Import Material UI Slider instead.
import Slider from "@mui/material/Slider"; 
import "../styles/index.css";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import ProductSection from "./product_section";

const API_URL = "https://api-xtreative.onrender.com/products/listing/";

const FilterAndCard = () => {
  // Toggle states for filter sections
  const [openCategory, setOpenCategory] = useState(true);
  const [openPrice, setOpenPrice] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openRating, setOpenRating] = useState(false);

  // Filter controls state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All Categories"]);
  const [selectedSizes, setSelectedSizes] = useState(["All Sizes"]);

  // Price range boundaries from fetched data
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1500]);
  const [selectedPriceOption, setSelectedPriceOption] = useState("all");

  const [selectedRating, setSelectedRating] = useState(null);

  // Static rating options
  const ratingOptions = [
    { stars: 1, count: 437 },
    { stars: 2, count: 657 },
    { stars: 3, count: 1897 },
    { stars: 4, count: 3571 },
  ];

  // Fetched products and state for error/loading.
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
    minPrice: 0,
    maxPrice: 1500,
    selectedCategories: ["All Categories"],
    selectedRating: null,
    selectedSizes: ["All Sizes"],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Sort products newest first (assume higher id is newer)
        data.sort((a, b) => b.id - a.id);
        setAllProducts(data);
        // Calculate the available price range from the fetched products.
        const prices = data.map((p) => Number(p.price));
        const computedMin = Math.min(...prices);
        const computedMax = Math.max(...prices);
        setMinPrice(computedMin);
        setMaxPrice(computedMax);
        // Initialize the selected price range to the entire boundary.
        setSelectedPriceRange([computedMin, computedMax]);
        setSelectedPriceOption("all");
        // Update the applied filters with the dynamic price range.
        setAppliedFilters((prev) => ({
          ...prev,
          minPrice: computedMin,
          maxPrice: computedMax,
        }));
      } catch (err) {
        console.error(err);
        setFetchError("Failed to load products.");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Build dynamic category list from fetched product data.
  const dynamicCategoryList = useMemo(() => {
    return [
      "All Categories",
      ...Array.from(
        new Set(allProducts.map((product) => product.category).filter(Boolean))
      ),
    ];
  }, [allProducts]);

  // Compute dynamic price range options.
  const dynamicPriceOptions = useMemo(() => {
    const numRanges = 4;
    if (maxPrice === minPrice) {
      return [
        {
          label: `UGX ${minPrice} - UGX ${maxPrice}`,
          value: `${minPrice}-${maxPrice}`,
          count: allProducts.length,
        },
      ];
    }
    const step = (maxPrice - minPrice) / numRanges;
    const options = Array.from({ length: numRanges }, (_, i) => {
      const lower = Math.round(minPrice + i * step);
      const upper =
        i === numRanges - 1 ? maxPrice : Math.round(minPrice + (i + 1) * step);
      const count = allProducts.filter(
        (p) =>
          Number(p.price) >= lower &&
          Number(p.price) < (i === numRanges - 1 ? upper + 1 : upper)
      ).length;
      return {
        label: `UGX ${lower} - UGX ${upper}`,
        value: `${lower}-${upper}`,
        count,
      };
    });
    return [
      { label: "All Price", value: "all", count: allProducts.length },
      ...options,
    ];
  }, [minPrice, maxPrice, allProducts]);

  // Build dynamic size options from the fetched products.
  const dynamicSizeOptions = useMemo(() => {
    const sizeCount = allProducts.reduce((acc, product) => {
      if (product.size) {
        acc[product.size] = (acc[product.size] || 0) + 1;
      }
      return acc;
    }, {});
    const order = ["S", "M", "L", "XL", "XXL", "Others"];
    const orderedOptions = order
      .filter((size) => sizeCount[size] !== undefined)
      .map((size) => `${size} (${sizeCount[size].toLocaleString()})`);
    const extraOptions = Object.keys(sizeCount)
      .filter((size) => !order.includes(size))
      .map((size) => `${size} (${sizeCount[size].toLocaleString()})`);
    return ["All Sizes", ...orderedOptions, ...extraOptions];
  }, [allProducts]);

  // Handler for toggling category selection
  const handleCategoryChange = (category, checked) => {
    if (category === "All Categories") {
      setSelectedCategories(checked ? ["All Categories"] : []);
    } else {
      let newSelection = selectedCategories.filter((cat) => cat !== "All Categories");
      if (checked) {
        newSelection.push(category);
      } else {
        newSelection = newSelection.filter((cat) => cat !== category);
      }
      if (newSelection.length === 0) newSelection = ["All Categories"];
      setSelectedCategories(newSelection);
    }
  };

  // Handler for toggling size selection
  const handleSizeChange = (sizeOption, checked) => {
    const size = sizeOption.split(" ")[0];
    if (size === "All") {
      setSelectedSizes(checked ? ["All Sizes"] : []);
    } else {
      let newSelection = selectedSizes.filter((s) => s !== "All Sizes");
      if (checked) {
        newSelection.push(size);
      } else {
        newSelection = newSelection.filter((s) => s !== size);
      }
      if (newSelection.length === 0) newSelection = ["All Sizes"];
      setSelectedSizes(newSelection);
    }
  };

  // Handler for toggling price options
  const handlePriceOptionChange = (optionValue) => {
    if (selectedPriceOption === optionValue) {
      setSelectedPriceOption("all");
      setSelectedPriceRange([minPrice, maxPrice]);
    } else {
      setSelectedPriceOption(optionValue);
      if (optionValue !== "all") {
        const [newMin, newMax] = optionValue.split("-").map(Number);
        setSelectedPriceRange([newMin, newMax]);
      } else {
        setSelectedPriceRange([minPrice, maxPrice]);
      }
    }
  };

  // Update slider changes
  const handleSliderChange = (event, newRange) => {
    setSelectedPriceRange(newRange);
    setSelectedPriceOption("custom");
  };

  // Button click to apply filters
  const handleApplyFilters = () => {
    setAppliedFilters({
      searchTerm,
      minPrice: selectedPriceRange[0],
      maxPrice: selectedPriceRange[1],
      selectedCategories,
      selectedRating,
      selectedSizes,
    });
  };

  // [NEW] Debounced search update: when the search term changes, update applied filters after 500ms.
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setAppliedFilters((prev) => ({
        ...prev,
        searchTerm: searchTerm,
      }));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // [Optional] Enter-key handler for the search input.
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleApplyFilters();
    }
  };

  if (loadingProducts) {
    return (
      <div className="p-4 text-center text-[13px]">
        Loading products...
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className="p-4 text-center text-red-600">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="flex w-full gap-1">
      {/* Left Filter Panel */}
      <div className="w-1/4 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="block w-full p-1 pl-8 pr-4 text-[11px] border border-gray-300 rounded focus:outline-none focus:border-black"
              placeholder="Search..."
            />
            <svg
              className="absolute left-2 top-2 w-2.5 h-2.5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.386a1 1 0 01-1.414 1.415l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Categories */}
          <div>
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="w-full flex items-center justify-between bg-blue-50 p-2 rounded text-[11px] text-gray-700"
            >
              Categories
              {openCategory ? (
                <IoIosArrowUp className="text-sm text-gray-500" />
              ) : (
                <IoIosArrowDown className="text-sm text-gray-500" />
              )}
            </button>
            {openCategory && (
              <div className="mt-2 space-y-2 text-[11px] text-gray-700">
                {dynamicCategoryList.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox accent-[#f9622c] w-2.5 h-2.5"
                      checked={selectedCategories.includes(cat)}
                      onChange={(e) =>
                        handleCategoryChange(cat, e.target.checked)
                      }
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Product Price */}
          <div>
            <button
              onClick={() => setOpenPrice(!openPrice)}
              className="w-full flex items-center justify-between bg-blue-50 p-2 rounded text-[11px] text-gray-600"
            >
              Product Price
              {openPrice ? (
                <IoIosArrowUp className="text-sm text-gray-500" />
              ) : (
                <IoIosArrowDown className="text-sm text-gray-500" />
              )}
            </button>
            {openPrice && (
              <div className="mt-2 space-y-2 text-[10px] text-gray-700">
                <div className="space-y-1">
                  {dynamicPriceOptions.map(({ label, value, count }) => (
                    <label key={value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-[#f9622c] w-2.5 h-2.5"
                        checked={selectedPriceOption === value}
                        onChange={() => handlePriceOptionChange(value)}
                      />
                      <span>
                        {label} {count !== null && `(${count.toLocaleString()})`}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <p className="text-[11px] font-medium text-gray-700 mb-1">
                    Custom Price Range:
                  </p>
                  {/* Material UI Slider replacing rc-slider */}
                  <Slider
                    value={selectedPriceRange}
                    onChange={handleSliderChange}
                    min={minPrice}
                    max={maxPrice}
                    step={50}
                    valueLabelDisplay="auto"
                    sx={{
                      color: "#f9622c",
                      height: 4,
                      "& .MuiSlider-thumb": {
                        width: 14,
                        height: 14,
                      },
                      "& .MuiSlider-track": {
                        height: 4,
                      },
                      "& .MuiSlider-rail": {
                        height: 4,
                        color: "#ccc",
                      },
                    }}
                  />
                  <div className="flex items-center text-[11px] text-gray-600 space-x-2 mt-2">
                    <div className="flex items-center flex-1 border rounded p-2">
                      <span className="mr-1">UGX</span>
                      <input
                        type="number"
                        value={selectedPriceRange[0]}
                        onChange={(e) => {
                          const newVal = Number(e.target.value);
                          if (newVal <= selectedPriceRange[1] && newVal >= minPrice) {
                            setSelectedPriceRange([newVal, selectedPriceRange[1]]);
                            setSelectedPriceOption("custom");
                          }
                        }}
                        className="w-full outline-none text-[11px]"
                      />
                    </div>
                    <span>to</span>
                    <div className="flex items-center flex-1 border rounded p-2">
                      <span className="mr-1">UGX</span>
                      <input
                        type="number"
                        value={selectedPriceRange[1]}
                        onChange={(e) => {
                          const newVal = Number(e.target.value);
                          if (newVal >= selectedPriceRange[0] && newVal <= maxPrice) {
                            setSelectedPriceRange([selectedPriceRange[0], newVal]);
                            setSelectedPriceOption("custom");
                          }
                        }}
                        className="w-full outline-none text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Size & Fit */}
          <div>
            <button
              onClick={() => setOpenSize(!openSize)}
              className="w-full flex items-center justify-between bg-blue-50 p-2 rounded text-[11px] text-gray-600"
            >
              Size &amp; Fit
              {openSize ? (
                <IoIosArrowUp className="text-sm text-gray-500" />
              ) : (
                <IoIosArrowDown className="text-sm text-gray-500" />
              )}
            </button>
            {openSize && (
              <div className="mt-2 ml-2 space-y-1 text-[10px] text-gray-600">
                {dynamicSizeOptions.map((sz) => (
                  <label key={sz} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox accent-[#f9622c] w-2.5 h-2.5"
                      checked={
                        sz.startsWith("All")
                          ? selectedSizes.includes("All Sizes")
                          : selectedSizes.includes(sz.split(" ")[0])
                      }
                      onChange={(e) => handleSizeChange(sz, e.target.checked)}
                    />
                    <span>{sz}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <button
              onClick={() => setOpenRating(!openRating)}
              className="w-full flex items-center justify-between bg-blue-50 p-2 rounded text-[11px] text-gray-600"
            >
              Rating
              {openRating ? (
                <IoIosArrowUp className="text-sm text-gray-500" />
              ) : (
                <IoIosArrowDown className="text-sm text-gray-500" />
              )}
            </button>
            {openRating && (
              <div className="mt-2 ml-2 space-y-2 text-[11px] text-gray-600">
                {ratingOptions.map(({ stars, count }) => (
                  <label key={stars} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="rating"
                      className="form-radio accent-[#f9622c] w-3 h-3"
                      checked={selectedRating === stars}
                      onChange={() => setSelectedRating(stars)}
                    />
                    <span className="flex items-center">
                      {Array.from({ length: stars }).map((_, i) => (
                        <FaStar key={i} color="#FFC107" size={11} />
                      ))}
                      <span className="ml-1">
                        &nbsp;&amp; Above ({count})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilters}
            className="w-full bg-[#f9622c] hover:bg-orange-600 text-white py-2 rounded text-[11px] font-semibold"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Right Side (Products display area) */}
      <div className="w-3/4 p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <ProductSection products={allProducts} filters={appliedFilters} />
        </div>
      </div>
    </div>
  );
};

export default FilterAndCard;
