/** @format */

import React, { PropsWithChildren } from "react"
import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import type { PreloadedState } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import type { AppStore, RootState } from "./index"
import { setupStore } from "./index"
import { initialState } from "./slice/appslice"
import { ToastContainer } from "react-toastify"

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: PreloadedState<RootState>
	store?: AppStore
}
export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = { app: initialState },
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return (
			<Provider store={store}>
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
				{children}
			</Provider>
		)
	}
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
