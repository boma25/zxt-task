/** @format */

import React, { useState, useEffect } from "react"
import "./App.css"
import Layout from "./component/layout/index"
import { BsSearch } from "react-icons/bs"
import { listings } from "./utils/data"
import Listing from "./component/listing"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
	const [search, setSearch] = useState("")
	const [availableList, setAvailableList] = useState(listings)

	useEffect(() => {
		setAvailableList(
			listings.filter(
				(value) =>
					value.name.toLowerCase().includes(search.toLowerCase()) ||
					value.description.toLowerCase().includes(search.toLowerCase()) ||
					value.contact_name.toLowerCase().includes(search.toLowerCase())
			)
		)
	}, [search])
	return (
		<Layout>
			<div className="flex items-center bg-white drop-shadow rounded-lg py-2 px-2 w-11/12 space-x-4 text-gray-500">
				<BsSearch />
				<input
					type="search"
					className="focus:outline-none  w-10/12 bg-transparent"
					placeholder="Search listings"
					onChange={(e) => setSearch(e.target.value)}
					value={search}
				/>
			</div>
			<div className="w-11/12 mt-12">
				<p className="font-bold text-3xl">Listings</p>

				<div className="mt-8">
					{availableList.map((value, index) => (
						<Listing {...value} key={`listing-${index}`} />
					))}
					{availableList.length === 0 && search !== "" && (
						<p className="font-bold text-3xl text-center text-gray-500">
							Listing Not Found
						</p>
					)}
				</div>
			</div>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
			/>
		</Layout>
	)
}

export default App