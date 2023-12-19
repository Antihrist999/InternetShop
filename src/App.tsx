import ThemeProvider from '@mui/material/styles/ThemeProvider'
import appCss from './App.module.css'
import Theme from './Theme'
import Cart from './page/сart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Menu } from './components/menu'
import { useState } from 'react'
import { OutputSearchCard } from './components/outputSearchCard'
import { Catalog } from './components/catalog'
import { CarouselCatalogCard } from './components/carouselCatalogCard'
import DetailCard from './page/detailCard'
import { Favorite } from './components/favorite'
import Delivery from './page/delivery'
import Main from './page/main'
import Footer from './page/footer'

function App() {
	const [searchValue, setSearchValue] = useState('')
	const [category, setCategory] = useState<string>('')

	return (
		<BrowserRouter>
			<ThemeProvider theme={Theme}>
				<div style={appCss} className="App bg-background  h-screen flex flex-col">
					<Menu setSearchValue={setSearchValue}></Menu>
					<div className="flex-1 bg-background">
						<Routes>
							<Route path="/shopping_cart" Component={Cart} />
							<Route path="/search" element={<OutputSearchCard value={searchValue} />} />
							<Route path="/" Component={Main} />
							<Route path="/favorite" Component={Favorite} />
							<Route path="/catalog" element={<Catalog setCategory={setCategory} />} />
							<Route
								path="/catalogProducts"
								element={<CarouselCatalogCard category={category} />}
							/>
							<Route path="/DetailCard/:id" element={<DetailCard />} />
							<Route path="/Delivery" element={<Delivery />} />
							{/* <Route path="/Filter" Component={Filter} /> */}
						</Routes>
					</div>
					<div className="flex h-36 w-full">
						<Footer />
					</div>
				</div>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
